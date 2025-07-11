<img width="1874" height="900" alt="image" src="https://github.com/user-attachments/assets/bfea31f4-89d9-459d-b6e4-dc581f508f82" />

# 📝 Abdul Rehman’s MERN AI ToDo List (with Voice Support)

Welcome to **Abdul Rehman's MERN ToDo App** — a sleek and powerful task manager built using the MERN stack with voice recognition and a beautiful animated splash screen.

---

## 🚀 Features

* 🎙️ **Voice Recognition** (powered by `react-speech-recognition`)
* 📝 Create, delete, rename, and manage your tasks
* 📅 Due date picker with filter options (Today, Upcoming, Missed)
* ⭐ Mark tasks as Favorite
* 🔍 Search & 📂 Sort tasks
* 🔐 Google OAuth & JWT-based authentication
* 🎨 Animated splash screen
* 🧠 Smart and intuitive UI with Framer Motion

---

## 🧱 Tech Stack

* **Frontend**: React.js + Tailwind CSS + Framer Motion
* **Speech**: react-speech-recognition
* **Backend**: Node.js + Express.js
* **Authentication**: Google OAuth + JWT
* **Database**: MongoDB + Mongoose
* **Routing**: React Router (for dev), Next.js routing (for auth)

---

## 📸 Screenshots

> *Add splash screen, main UI, and task list screenshots here*

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/mern-ai-todo.git
cd mern-ai-todo
```

### 2. Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Create `.env` file in `/backend`

```env
PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 🔃 Run Locally

### Start Backend:

```bash
cd backend
npm run dev
```

### Start Frontend:

```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`

---

## 🧠 Folder Structure (Simplified)

```
📁 frontend
 ┣ 📁 components
 ┣ 📁 context
 ┣ 📁 pages / app
 ┗ 📄 TodoPage.jsx

📁 backend
 ┣ 📁 routes
 ┣ 📁 models
 ┗ 📄 server.js
```

---

## ✅ TodoPage Features Summary

* `Splash Screen` with animated intro
* `AuthContext` for login/logout/token management
* `Google Login` using `/api/auth/google`
* `Speech-to-Task`: Fill title & description by speaking
* `Rename Task`: Edit & Save titles and descriptions
* `Task Filters`: all / today / missed / upcoming

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

* [React Speech Recognition](https://www.npmjs.com/package/react-speech-recognition)
* [Framer Motion](https://www.framer.com/motion/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Google Developers Console](https://console.cloud.google.com/)

---

## 💡 Inspiration

> This is my first MERN Stack project — combining what I’ve learned with design, fullstack auth, and AI-style features.

**Made with ❤️ by Abdul Rehman**
