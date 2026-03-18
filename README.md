# 📄 AI Interview Simulator (AI 面试模拟器)

This project is an AI-powered interview simulator. Users can upload their **resume (CV)** and **job description (JD)** to generate a mock interview experience.
这个项目是一个人工智能驱动的面试模拟器。用户可以上传自己的简历（CV）和职位描述（JD）来生成模拟面试体验。

---

## 🚀 Getting Started (快速开始)

### 1. Download Project Files (下载项目文件)

* Download all project files to your **Desktop** or a dedicated folder (recommended)
  将所有项目文件下载到您的**桌面**或一个专用文件夹中（推荐）。

---

### 2. Install Dependencies (安装依赖)

1. Locate the file: `node_modules.zip`
   找到文件：`node_modules.zip`
2. Extract it
   解压该文件
3. Make sure the extracted `node_modules` folder is in the **same directory** as your project
   确保解压后的 `node_modules` 文件夹与您的项目位于**同一目录**下。

---

### 3. Open Terminal (打开终端)

Navigate to your project folder:
导航到您的项目文件夹：

```bash
cd Desktop/your-project-folder
```

---

### 4. Install Required Package (安装所需包)

Run:
运行：

```bash
npm install node-fetch
```

---

### 5. Start the Server (启动服务器)

Run:
运行：

```bash
node server.js
```

If successful, you should see:
如果成功，您应该看到：

```
Server running at http://localhost:3000
服务器运行于 http://localhost:3000
```

---

### 6. Open the Frontend (打开前端页面)

You can:
您可以：

* Open the HTML file directly
  直接打开 HTML 文件
  OR
  或者
* Visit in browser: `http://localhost:3000`
  在浏览器中访问：`http://localhost:3000`

---

## 📂 Usage (使用方法)

1. Upload your files:
   上传您的文件：
   * Resume (**.docx / .txt**)
     简历 (**.docx / .txt**)
   * Job Description (**.docx / .txt**)
     职位描述 (**.docx / .txt**)

2. Start the interview simulation
   开始面试模拟

3. The AI will act as an interviewer and generate questions based on your input
   AI 将扮演面试官，并根据您的输入生成问题

---

## ⚠️ Notes (注意事项)

* Make sure your API key is correctly configured in `.env`
  确保您的 API 密钥已在 `.env` 文件中正确配置
* Supported file formats:
  支持的文件格式：
  * `.docx`
  * `.txt`
* If server fails to start, check:
  如果服务器启动失败，请检查：
  * Node.js installation
    Node.js 安装情况
  * Dependency installation
    依赖项安装情况

---

## 💡 Tips (提示)

* Use real resumes for better results
  使用真实的简历以获得更好的效果
* Provide detailed JD for more targeted questions
  提供详细的职位描述以获取更有针对性的问题
* Ensure all files are in the same directory
  确保所有文件都在同一目录下
