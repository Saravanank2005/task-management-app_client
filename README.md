# Task360 - Simple Task Management Application

> **Graduate Support Engineer Trainee Assessment Submission**

Task360 is a full-stack task management application built with **React (JSX)**, **Vanilla CSS**, **Node.js**, **Express**, **MongoDB Atlas**, and **Google Authentication**.

---

## ⚡ Quick Start

### 1. Run Backend Server
```bash
cd server
npm install
npm start
```
*Server runs on `http://localhost:5000`*

### 2. Run Frontend Client
```bash
cd client
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

## 🚀 Key Features

- **Google Authentication & Demo Mode**: Sign in with your Google account or click **"Task360 Demo Account"** for instant cross-device testing.
- **Create & Manage Tasks**: Add tasks with title and description.
- **Status Workflows**: Track task progress across **Planned**, **In Progress**, and **Complete** states.
- **Filter & Search**: Easily filter tasks by state or use the real-time search bar.
- **MongoDB Atlas Storage**: All user data and tasks are stored persistently in the `kovai_task` MongoDB Atlas database.

---

## 💡 Important Notes & Assumptions

- **User Isolation**: Users can strictly view and edit their own tasks.
- **Task Lifecycle**: Every task belongs to one of three states (`Planned`, `In Progress`, `Complete`).
- **Resilient Fallback**: If database connection is unavailable, the backend automatically uses an in-memory store so testing is never interrupted.

---

## 🛠️ Environment Configuration

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.1d6gi.mongodb.net/kovai_task?retryWrites=true&w=majority
JWT_SECRET=kovai_task_manager_jwt_secret_key_2026_spec
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Frontend (`client/.env`)
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```
