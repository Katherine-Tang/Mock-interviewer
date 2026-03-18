//require("dotenv").config();

//console.log("KEY:", process.env.OPENAI_API_KEY);
const express = require("express");
const cors = require("cors");
const mammoth = require("mammoth");
//const pdfParse = require("pdf-parse");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

// ===== 你可以替换成你自己的模型服务 =====
// 这里示例使用 OpenAI 兼容接口
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || "https://api.deepseek.com/v1";
const MODEL_NAME = process.env.MODEL_NAME || "deepseek-chat";

// Node 18+ 原生有 fetch；如果没有，请 npm install node-fetch
const fetchFn = global.fetch || require("node-fetch");

async function extractTextFromFile(fileObj) {
  if (!fileObj || !fileObj.contentBase64) return "";

  const buffer = Buffer.from(fileObj.contentBase64, "base64");
  const filename = (fileObj.filename || "").toLowerCase();

  if (filename.endsWith(".txt")) {
    return buffer.toString("utf-8");
  }

  if (filename.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  }

  // if (filename.endsWith(".pdf")) {
  //   const result = await pdfParse(buffer);
  //   return result.text || "";
  // }

  if (filename.endsWith(".pdf")) {
    return "[PDF解析暂未开启]";
  }

  // doc 老格式较麻烦，这里先提示
  if (filename.endsWith(".doc")) {
    return "[暂未完整支持 .doc 老格式解析，建议转成 .docx 或 PDF]";
  }

  return "[无法识别的文件类型]";
}

function buildSystemPrompt({ mode, positionName, resumeText, jdText }) {
  let modeInstruction = "";

  if (mode === "resume") {
    modeInstruction = `
你现在是一个严格、专业、步步紧逼的中文面试官。
你的任务是围绕候选人的简历深度追问。
重点包括：
1. 项目真实性核验
2. 技术细节深挖
3. 候选人是否真的做过
4. 方案选择原因
5. 难点与优化
6. 如果项目写得浮夸，要适当施压追问
`;
  } else if (mode === "jd") {
    modeInstruction = `
你现在是一个严格、专业的中文面试官。
你的任务是围绕岗位要求进行拷打式提问。
重点包括：
1. 岗位核心技能是否匹配
2. 场景题 / 实战题
3. 技术原理
4. 为什么适合这个岗位
5. 如果能力不足，要指出短板并继续追问
`;
  } else {
    modeInstruction = `
你现在是一个严格、专业、连续追问的中文面试官。
你的任务是综合候选人简历和岗位要求，对候选人进行真实模拟面试。
面试风格：
1. 问题具体，不空泛
2. 一次问 1~2 个重点问题
3. 根据候选人的回答继续追问
4. 对模糊回答进行质疑
5. 更像真实技术面试，而不是聊天
`;
  }

  return `
${modeInstruction}

输出要求：
- 用中文回答
- 每次只输出下一轮面试官的话
- 语气专业、自然、有压迫感但不要侮辱
- 问题尽量贴近真实校招/实习面试
- 优先根据用户上一轮回答进行追问
- 如果是第一轮，请先做简短开场，然后直接进入问题
- 不要输出“分析过程”
- 不要输出 markdown 标题

岗位名称：
${positionName || "未提供"}

候选人简历内容：
${resumeText || "未提供简历"}

岗位 JD 内容：
${jdText || "未提供 JD"}
`;
}

async function callLLM(messages) {
  const res = await fetchFn(`${OPENAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages,
      temperature: 0.7
    })
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(data);
    throw new Error(data.error?.message || "模型调用失败");
  }

  return data.choices?.[0]?.message?.content || "抱歉，我暂时无法继续提问。";
}

app.post("/api/interview", async (req, res) => {
  try {
    const {
      type,
      positionName,
      mode,
      jdText,
      history = [],
      resumeFile,
      jdFile
    } = req.body;

    let resumeText = "";
    let jdFileText = "";

    if (type === "start") {
      resumeText = await extractTextFromFile(resumeFile);
      jdFileText = await extractTextFromFile(jdFile);
    }

    const mergedJD = [jdText || "", jdFileText || ""].filter(Boolean).join("\n\n");

    const systemPrompt = buildSystemPrompt({
      mode,
      positionName,
      resumeText,
      jdText: mergedJD
    });

    const messages = [
      { role: "system", content: systemPrompt }
    ];

    if (type === "start") {
      messages.push({
        role: "user",
        content: "请开始第一轮模拟面试。"
      });
    } else {
      for (const item of history) {
        messages.push({
          role: item.role === "ai" ? "assistant" : "user",
          content: item.content
        });
      }
      messages.push({
        role: "user",
        content: "请根据我刚才的回答继续追问，并给出下一轮面试问题。"
      });
    }

    const reply = await callLLM(messages);

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "服务器错误" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});