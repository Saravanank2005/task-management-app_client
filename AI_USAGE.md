# AI Usage Summary & Engineering Rationale

> **Graduate Support Engineer Trainee Assessment — AI Tool Utilization Report**

---

## 🤖 1. Which AI Tools Were Used

- **AI Development Assistant**: Antigravity AI Agent (Powered by Gemini model)
- **Role**: Pair programmer, software architect, and documentation co-author.

---

## 🛠️ 2. How AI Tools Were Used

1. **Requirements & Scope Planning**:
   - Analyzed functional requirements (Google Auth, Task Creation, Task Viewing, Task Status Update).
   - Identified underspecified edge cases (e.g., evaluator testing without Google OAuth credentials, database connection timeouts).

2. **Full-Stack Architecture & Schema Design**:
   - Scaffolding Express MVC directory layout (`controllers`, `models`, `routes`, `middleware`, `services`).
   - Designing Mongoose schemas with explicit status enums (`Planned`, `In Progress`, `Complete`).

3. **Frontend Component Composition**:
   - Creating modular React components (`Navbar`, `TaskCard`, `TaskModal`, `LoginModal`, `Toast`).
   - Designing a modern dark-mode CSS design system using CSS custom variables and glassmorphism.

4. **Documentation Co-Creation**:
   - Structure `README.md` to address all 6 assessment criteria sections.

---

## 💬 3. Example Prompts Used

### Prompt 1: Initial Architecture Planning
> *"Help me plan a clean full-stack Task Management application using React, JSX, Express, Node.js, and MongoDB Atlas. Requirements include Google Authentication, creating tasks, listing tasks, and updating status (Planned, In Progress, Complete). Identify missing edge cases and design a resilient architecture."*

### Prompt 2: Status Enum & Validation Design
> *"Write a Mongoose Task schema that strictly enforces task states: Planned, In Progress, and Complete. Add controller endpoints for status updates via PATCH /api/tasks/:id/status with user isolation."*

### Prompt 4: MongoDB Atlas User Data Persistence & Sign Up / Sign In Flow
> *"Enhance the authentication system so first-time users clicking Sign Up with Google have their profile data saved into MongoDB Atlas, while returning users signing in load their existing user record and update lastLogin timestamp before redirecting to the task home page."*

---

## ✏️ 4. AI-Generated Code Modified & Corrected Manually

While AI generated initial boilerplate and component skeletons, several critical manual modifications and enhancements were implemented to ensure software quality:

1. **MongoDB Atlas User Data Persistence (`server/models/User.js` & `server/services/storeService.js`)**:
   - *Enhancement*: Added `authProvider`, `lastLogin`, and `isNewUser` flags to user schema and authentication controllers. Automatically creates or updates the user profile record in MongoDB Atlas upon Google OAuth authentication.

2. **Resilient Database Store Fallback (`server/services/storeService.js`)**:
   - *Issue*: Standard AI code assumed MongoDB would always be running locally or that an Atlas connection string would be present immediately.
   - *Manual Modification*: Implemented an automatic dual-mode store abstraction layer. If MongoDB connection times out or fails, the backend seamlessly switches to an in-memory fallback store without crashing, ensuring 100% out-of-the-box evaluator testing.

3. **Strict Status Enum Validation (`server/controllers/taskController.js`)**:
   - *Issue*: Initial AI draft allowed arbitrary string updates to the status field.
   - *Manual Modification*: Explicitly enforced strict status value validation (`['Planned', 'In Progress', 'Complete']`) in both controller route handlers and Mongoose schemas.

4. **Bearer JWT Axios Request Interceptor (`client/src/services/api.js`)**:
   - *Issue*: AI boilerplate initially passed token manually in individual component fetch calls.
   - *Manual Modification*: Refactored API client to use a centralized Axios request interceptor that automatically attaches `Authorization: Bearer <token>` from `localStorage`.

5. **Optimistic UI Updates & Error Rollback (`client/src/context/TaskContext.jsx`)**:
   - *Issue*: Standard AI status update logic waited for network response before updating card state, causing visual lag.
   - *Manual Modification*: Implemented optimistic UI updates so status pill changes happen instantly, with automatic rollback and toast notifications if the API request fails.
