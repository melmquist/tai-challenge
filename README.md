# Transformer.AI Task Manager

A full-stack task manager app built with Vue 3 (Composition API, Tailwind CSS) and NestJS (Prisma, SQLite), featuring tag-based filtering and strong TypeScript discipline.

---

## 1. Approach & Interesting Decisions

- **Clean Architecture:** Adopted a modular, SOLID-compliant structure for both backend (NestJS) and frontend (Vue 3).
- **TypeScript-First:** All code is strongly typed, with DTOs and validation on the backend.
- **Tag Feature:** Extended the basic task manager to support tags, using a normalized many-to-many relation (Task, Tag, TaskTag) in the database. The frontend supports tag entry and filtering via a dropdown.
- **Developer Ergonomics:** Used DTOs, class-validator, and clear separation of concerns for maintainability.

---

## 2. AI Tools in the Workflow

- **CursorAI:** Used as the primary coding assistant for code generation, refactoring, and architectural guidance.
- **Custom Rules:** Integrated a custom rules file from [cursor.directory](https://cursor.directory/clean-nestjs-typescript-cursor-rules) and further tailored it with ChatGPT to enforce clean NestJS/TypeScript practices.
- **ChatGPT:** Used for troubleshooting, code review, and to help with advanced architectural and migration steps.
- **AI Integration Comments:** Key files and code blocks are annotated where AI tools were used.

---

## 3. Running the Project Locally

### Prerequisites
- Node.js v20.19.0 or higher
- npm (v10+ recommended)

### Steps
1. **Clone the repo:**
   ```sh
   git clone https://github.com/melmquist/tai-challenge.git
   cd tai-challenge
   ```
2. **Install dependencies:**
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Create the backend .env file:**
   - In the `backend` directory, create a file named `.env` with the following contents:
     ```env
     DATABASE_URL="file:./dev.db"
     ```
4. **Run database migrations:**
   ```sh
   cd ../backend
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. **Start the backend:**
   ```sh
   npm run start
   # Runs on http://localhost:3000
   ```
6. **Start the frontend:**
   ```sh
   cd ../frontend
   npm run dev
   # Runs on http://localhost:5173
   ```
7. **Open the app:**
   - Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 4. Future Optimizations

- **Testing:**
  - Add unit and E2E tests for backend (Jest, @nestjs/testing) and frontend (Vitest, Cypress).
- **Deployment:**
  - Deploy the full-stack app to Vercel (or similar), with environment-based configuration for API URLs.
- **User Authentication:**
  - Add user accounts and per-user task/tag management.
- **UI/UX Enhancements:**
  - Tag management UI, drag-and-drop, task priorities, etc.

---

**AI Integration:** This README and much of the codebase were generated and refined with the help of AI tools (CursorAI, ChatGPT). 