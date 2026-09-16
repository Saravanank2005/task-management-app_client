# AI Usage Summary

> **Graduate Support Engineer Trainee Assessment Submission**

---

## 🤖 1. AI Tools Utilized

- **ChatGPT**: Utilized for initial prompt structuring, project initialization, architecture breakdown, and requirement formatting.
- **Gemini 3.6 Flash **: Utilized for full-stack coding, Express API routes, React component composition, database schema design, and live deployment error debugging.

---

## 💬 2. How AI Was Used

1. **ChatGPT**:
   - Structured assessment requirements into clean project modules.
   - Outlined directory conventions and documentation requirements.

2. **Gemini 3.6 Flash**:
   - Generated Mongoose schemas (`User.js` & `Task.js`) and Express controllers.
   - Built modular React UI components (`Navbar`, `TaskCard`, `TaskModal`, `LoginModal`).
   - Assisted in troubleshooting CORS policies, Google OAuth origin mismatch errors, and database index fallback logic.

---

## ✏️ 3. Manual Corrections and Modifications

- **MongoDB Atlas Collection Isolation**: Fixed index collision error by assigning explicit collection names (`task_users` and `task_items`).
- **Google CDN Referrer Policy**: Added `referrerPolicy="no-referrer"` and `ui-avatars.com` image loading fallback for Google profile photos.
- **Resilient Database Fallback**: Added dual-mode storage logic in `storeService.js` so in-memory fallback activates automatically if Atlas connection times out.
- **Vercel & Render Proxy Setup**: Configured `vercel.json` rewrites and dynamic API URLs pointing to Render.
