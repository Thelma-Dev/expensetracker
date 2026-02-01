import express from "express";
import type { Express } from "express";
import { expenseRoutes } from "./routes/expenses";
import cors from "cors";

export function createServer(): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  //routes
  app.use("/api", expenseRoutes)

  return app;
}

// Start the server if this file is run directly
const app = createServer();
const PORT = 3001;

app.get("/", (_req, res) => {
  res.send("Expense Tracker API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
