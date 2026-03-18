# 📄 AI Interview Simulator

This project is an AI-powered interview simulator. Users can upload their **resume (CV)** and **job description (JD)** to generate a mock interview experience.

---

## 🚀 Getting Started

### 1. Download Project Files

* Download all project files to your **Desktop**
  or a dedicated folder (recommended)

---

### 2. Install Dependencies

1. Locate the file:

```
node_modules.zip
```

2. Extract it
3. Make sure the extracted `node_modules` folder is in the **same directory** as your project

---

### 3. Open Terminal

Navigate to your project folder:

```bash
cd Desktop/your-project-folder
```

---

### 4. Install Required Package

Run:

```bash
npm install node-fetch
```

---

### 5. Start the Server

Run:

```bash
node server.js
```

If successful, you should see:

```
Server running at http://localhost:3000
```

---

### 6. Open the Frontend

You can:

* Open the HTML file directly
  OR
* Visit in browser:

```
http://localhost:3000
```

---

## 📂 Usage

1. Upload your files:

   * Resume (**.docx / .txt**)
   * Job Description (**.docx / .txt**)

2. Start the interview simulation

3. The AI will act as an interviewer and generate questions based on your input

---

## ⚠️ Notes

* Make sure your API key is correctly configured in `.env`
* Supported file formats:

  * `.docx`
  * `.txt`
* If server fails to start, check:

  * Node.js installation
  * Dependency installation

---

## 💡 Tips

* Use real resumes for better results
* Provide detailed JD for more targeted questions
* Ensure all files are in the same directory
