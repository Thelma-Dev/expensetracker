import express from "express";
import { expenseRoutes } from "./routes/expenses";
export function createServer() {
    const app = express();
    app.use(express.json());
    //routes
    app.use("/api", expenseRoutes);
    return app;
}
//# sourceMappingURL=server.js.map