# TaskFlow - Full-Stack Task Management Application

> **Graduate Support Engineer Trainee Assessment Submission**

TaskFlow is a modern, responsive, full-stack Task Management application built with **React (JSX)**, **Vanilla CSS**, **Node.js**, **Express**, **MongoDB Atlas**, and **Google Authentication**.

---

## 🚀 1. How to Access and Use the Application

### Core Features:
- **Google OAuth Authentication & MongoDB Atlas Profile Persistence**:
  - First-time users clicking **"Sign Up with Google"** automatically have their profile (Email, Full Name, Avatar URL, Auth Provider, Timestamps) saved into **MongoDB Atlas**.
  - Returning users clicking **"Sign In with Google"** have their session verified, updated with `lastLogin` timestamp, and redirected immediately to the task home page.
- **Task Creation**: Create tasks with titles, descriptions, and initial status assignment.
- **View & Filter Tasks**: View tasks organized by status tabs (**Planned**, **In Progress**, **Complete**) with real-time status count badges and keyword search.
- **Update Task Status**: Seamlessly change task status between **Planned**, **In Progress**, and **Complete** via instant status select dropdowns on task cards.
- **Edit & Delete Tasks**: Full task modification and removal capabilities.
- **User Data Isolation**: Every authenticated user strictly accesses and manages their own isolated task list.

---

## 🔑 2. Login & Registration Instructions

1. **Option A — Sign Up with Google (First Time Users)**:
   - On the welcome screen, ensure the **"Sign Up (First Time)"** tab is selected.
   - Click **"Sign Up with Google"**. Authorize your Google account when prompted.
   - Your account profile will be created and saved in MongoDB Atlas. You will be issued a JWT token session and redirected to the application home page.

2. **Option B — Sign In with Google (Returning Users)**:
   - Select the **"Sign In (Existing)"** tab on the welcome screen.
   - Click **"Sign In with Google"**. Your existing account record in MongoDB Atlas is loaded and updated with a fresh `lastLogin` timestamp.

3. **Option C — Evaluator One-Click Demo Mode (Out-of-the-Box Testing)**:
   - To allow evaluators to test all full-stack features immediately without waiting for Google Cloud Console OAuth setup, click **"One-Click Sign Up/In as Assessment Evaluator"** or **"One-Click Sign Up/In as Demo Trainee User"**.
   - This instantly generates or loads a demo user record in MongoDB Atlas and issues a signed JWT session.

---

## 💡 3. Important Assumptions Made

1. **Task State Lifecycle**:
   - Each task belongs to exactly one of three states: `Planned`, `In Progress`, or `Complete`.
   - Newly created tasks default to `Planned` if no status is explicitly selected.
2. **User Scope & Privacy**:
   - Tasks are bound to the `userId` of the logged-in user. Users cannot view or mutate tasks belonging to other accounts.
3. **Session Persistence**:
   - JWT tokens are stored securely in browser `localStorage` to persist user sessions across page refreshes.
4. **Database Resilience**:
   - The application connects to MongoDB (Atlas or Local). If MongoDB credentials are not provided or connection times out, the backend gracefully activates an in-memory storage fallback so evaluators can inspect and test the application without database setup friction.

---

## ⚠️ 4. Known Limitations

1. **Google OAuth Client Domain Matching**:
   - Official Google OAuth 2.0 requires registering `http://localhost:3000` under "Authorized JavaScript origins" in the Google Cloud Console.
2. **Offline Mode**:
   - Changes require an active connection to the Node/Express backend API.
3. **Task Collaborators**:
   - Shared or team-wide task boards are intentionally excluded from scope to strictly comply with requirement boundaries.

---

## 📌 5. Important Notes or Warnings for Users

- **JWT Expiration**: User sessions automatically expire after 30 days, requiring re-authentication.
- **Demo Data Reset**: If running under the in-memory database fallback mode without a live MongoDB URI, created tasks will reset upon restarting the backend Node.js process. Connecting a persistent MongoDB Atlas URI avoids data resets.

---

## 🛠️ 6. Local Setup Instructions

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **MongoDB** (Local instance or MongoDB Atlas connection string)

### Step 1: Clone & Navigate
```bash
git clone <your-repository-url>
cd Kovai-Task
```

### Step 2: Configure Environment Variables

#### Backend Environment (`server/.env`)
Create a `.env` file inside the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_custom_jwt_secret_key_2026
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

#### Frontend Environment (`client/.env`)
Create a `.env` file inside the `client/` directory:
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Step 3: Install & Start Backend Server
```bash
cd server
npm install
npm start
```
*The backend server will run on `http://localhost:5000`.*

### Step 4: Install & Start Frontend Client
In a new terminal window:
```bash
cd client
npm install
npm run dev
```
*The React frontend will launch on `http://localhost:3000`.*

---

## 📂 Project Architecture

```
Kovai-Task/
├── server/                    # Node.js + Express Backend
│   ├── config/                # Database connection & status handlers
│   ├── controllers/           # Auth & Task business logic controllers
│   ├── middleware/            # JWT authentication middleware
│   ├── models/                # Mongoose models (User, Task)
│   ├── routes/                # Express API routes (/api/auth, /api/tasks)
│   ├── services/              # Database & store abstraction layer
│   └── index.js               # Express application entry point
├── client/                    # React (JSX) Frontend
│   ├── src/
│   │   ├── components/        # Navbar, TaskCard, TaskModal, LoginModal, Toast
│   │   ├── context/           # AuthContext & TaskContext state providers
│   │   ├── services/          # Axios HTTP API client
│   │   ├── styles/            # CSS tokens & visual styling system
│   │   ├── App.jsx            # Main App layout & Dashboard logic
│   │   └── main.jsx           # React & GoogleOAuthProvider root
│   ├── index.html
│   └── vite.config.js
├── README.md                  # Comprehensive Documentation
└── AI_USAGE.md                # AI Assistance & Engineering Rationale
```
