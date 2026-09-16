# AI Usage Summary

> **Graduate Support Engineer Trainee Assessment**

---

### 🤖 1. AI Tools Used
- **Tool**: Antigravity AI Assistant (Gemini Model)
- **Role**: Pair programmer for code scaffolding, component design, and database schema setup.

---

### 💬 2. How AI Was Used
1. **App Architecture**: Scaffolding Express MVC backend (`routes`, `controllers`, `models`) and React component hierarchy (`Navbar`, `TaskCard`, `TaskModal`, `LoginModal`).
2. **Database Integration**: Writing Mongoose schemas for `User` and `Task` models connected to MongoDB Atlas (`kovai_task` DB).
3. **Styling & UI**: Designing glassmorphism theme tokens and responsive status filter controls.

---

### ✏️ 3. Manual Corrections & Engineering Adjustments
- **Index Conflict Resolution**: Resolved MongoDB Atlas duplicate index error by targeting clean collections (`task_users` and `task_items`).
- **Google Avatar Fix**: Added `referrerPolicy="no-referrer"` and `ui-avatars.com` fallback to prevent broken profile image loading.
- **Resilient Store Fallback**: Implemented automatic in-memory fallback logic in `storeService.js` to ensure the server never crashes even if DB connection times out.
- **Production API Setup**: Configured `vercel.json` rewrites and dynamic API endpoints pointing to Render.
