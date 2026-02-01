import express from "express";
import type { Express } from "express";
import { expenseRoutes } from "./routes/expenses";

export function createServer(): Express {
  const app = express();
  app.use(express.json());
  
  //routes
  app.use("/api", expenseRoutes)

  return app;
}