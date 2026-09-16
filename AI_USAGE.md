# AI Usage Summary Report

Graduate Support Engineer Trainee Assessment Submission

---

## 1. AI Tools Utilized

- Primary AI Tool: Antigravity AI Assistant (Gemini Model)
- Role: Pair programming assistant for system scaffolding, database schema design, and technical problem solving.

---

## 2. Description of AI Usage

The AI tool was utilized throughout the development lifecycle for the following tasks:

1. Architecture Scaffolding: Generating initial Express.js route structures, Mongoose schemas, and React component boilerplates.
2. Component Composition: Designing modular React components including Navbar, TaskCard, TaskModal, and LoginModal.
3. API Client Configuration: Setting up Axios request interceptors for automatic JWT Authorization header injection.
4. Error Troubleshooting: Diagnosing CORS policy restrictions, Google OAuth origin mismatch errors, and database index collisions.

---

## 3. Example Prompts Executed

- Prompt 1 (Architecture): "Design a full-stack Task Management application using React, Express, Node.js, and MongoDB Atlas supporting Google OAuth and task status transitions (Planned, In Progress, Complete)."
- Prompt 2 (Database Validation): "Construct Mongoose schemas for User and Task models with strict status enum validation and user isolation."
- Prompt 3 (Authentication Fallback): "Create a single persistent Demo Account flow saved in MongoDB Atlas to allow evaluators to test all features out-of-the-box."

---

## 4. Manual Engineering Corrections and Modifications

Although initial boilerplate code was generated with AI assistance, the following manual technical modifications were made to ensure quality and stability:

1. MongoDB Atlas Index Collision Resolution: Resolved duplicate key errors (`E11000`) by explicitly assigning dedicated collection names (`task_users` and `task_items`) in Mongoose schema options.
2. Google CDN Referrer Policy Correction: Fixed broken profile image rendering by adding `referrerPolicy="no-referrer"` and `ui-avatars.com` fallback handling on user avatar images.
3. Resilient Database Fallback Implementation: Added dual-mode storage logic in `storeService.js` to ensure in-memory fallback execution if MongoDB Atlas connectivity times out.
4. Production Proxy Configuration: Configured `vercel.json` rewrites to proxy client API requests seamlessly to the live Render backend API.
