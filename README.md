# Expense Tracker

Simple monorepo with a frontend and backend for tracking expenses.

## Structure
- backend/ — Express API (TypeScript)
- frontend/ — React app (TypeScript)
- src/ — shared frontend source

## Quick start
1. Install dependencies
   - `npm install` (or `npm run install:all` if you add scripts)
2. Run backend
   - `cd backend`
   - `npm run dev` (or `ts-node backend/server.ts`)
3. Run frontend
   - `cd frontend`
   - `npm start`

## Notes
- Add a `.env` file for environment variables (not checked into git).
- Adjust commands above to match your `package.json` scripts.