# SwiftReply

A full-stack project that generates intelligent email replies using Google's Gemini API. This includes:

- 🚀 **Spring Boot backend** for API handling  
- 🎨 **React frontend** with dark mode and responsive UI  
- 🧩 **Chrome Extension** that integrates with Gmail to auto-generate replies

## 🗂️ Project Structure
**email-assistant/**
├── backend/ # Spring Boot backend
├── frontend/ # React.js frontend (with Tailwind or MUI)
├── extension/ # Chrome Extension (for Gmail)

📌# How it works
This project combines three components to enable AI-powered email replies:

🧱 1. Spring Boot Backend
✅ Purpose:
Accepts the original email content and optional tone (like professional, casual, etc.)

Sends this to Google Gemini API (via HTTP POST)

Returns a generated reply back to the client

🛠️ **Key Responsibilities:**
Expose a REST API endpoint:
POST /api/generate

Accept JSON input:

json
Copy
Edit
{
  "email": "Original email content here...",
  "tone": "professional"
}
Call Gemini API with prompt + tone instructions

Return the AI-generated response as JSON

🔐 **Gemini API Setup:**
You need a Google API key for Gemini:

Go to Google AI Studio

Sign in with your Google account

Click "Create API Key"

Paste it in your backend .env or application.properties

💻 2. React Frontend
✅ Purpose:
Allows users to paste original email, select tone, and click Generate Reply

Sends user input to the backend via axios or fetch

Displays a loading spinner while the backend responds

Shows the AI reply in a styled output box

🛠️ **Main Features:**
Input field for original email (multiline)

Dropdown for tone: None, Friendly, Professional, Casual

"Generate Reply" button

Dark mode support (optional)

Displays loader (<CircularProgress />) during backend call

Shows generated email reply in styled Typography box

🧩 3. Chrome Extension (Gmail)
✅ Purpose:
Automatically adds a "Generate Reply" button inside Gmail UI

When clicked:

Grabs currently opened email body

Sends it to the backend

Inserts generated reply in Gmail's reply box

🛠️ How It Works:
Content script injects into Gmail tab

Watches for open email threads

Adds a button below each email

On button click:

Collects email text

Sends it to backend using fetch()

Gets AI reply

Auto-fills reply textbox in Gmail with the AI reply

🔐 Setup:
Create a manifest.json with Gmail permissions

Use content_script.js to modify Gmail DOM

Host backend locally or on cloud (Render, Railway, Vercel)

🌐 Data Flow Overview
vbnet
Copy
Edit
<p align="center">
<pre>
                                       User (Gmail / Web UI)
                                                 ↓
                                     Clicks "Generate Reply"
                                                 ↓
                            Frontend/Extension sends POST request to backend:
                                        /api/generate-reply
                                                 ↓
                               Spring Boot Backend forms Gemini API prompt:
                               "Reply to this email in a [tone] tone: ..."
                                                 ↓
                                     Gemini API generates reply
                                                 ↓
                              Backend sends reply to Frontend/Extension
                                                 ↓
                                Reply inserted in UI or Gmail textbox
</pre>
</p>



## 📷 Preview

Here is a preview of the AI-generated email reply using the extension:

![AI Reply Preview](./assets/Screenshot%202025-07-26%20142836.png)

## 🎯 **How to Run the Project**  
🧪 *Test it Locally with Backend, Frontend, and Chrome Extension*

---

### 🔧 **1. Start Spring Boot Backend**

```bash
cd backend
./mvnw spring-boot:run

### 💻 Start React Frontend

```bash
cd frontend
npm install
npm run dev

### 🧩 Load Chrome Extension

1. Open **Chrome** and go to  
   `chrome://extensions`

2. Enable **Developer Mode** (top-right toggle)

3. Click **"Load unpacked"**

4. Select your `/extension` folder

---

### 📬 Test in Gmail

1. Open **Gmail** in Chrome  
2. Click on any **email**

3. You’ll see a new **“Generate Reply”** button added by the extension

4. Click the button  
   → Sends the request to your backend  
   → Gemini API generates a smart reply  
   → ✨ The reply is auto-inserted into Gmail’s reply box



