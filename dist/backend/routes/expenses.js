import { Router } from "express";
import { v4 as uuid } from "uuid";
const expenseRoutes = Router();
// State: expense array
let expenses = [];
function addExpense(amount, category, note) {
    const expense = {
        id: uuid(),
        amount,
        category,
        ...(note != undefined && { note }),
        date: new Date().toISOString()
    };
    expenses.push(expense);
    console.log("Added expense:", expense);
    return expense;
}
function getExpenses() {
    return expenses;
}
expenseRoutes.get("/expenses", (req, res) => {
    res.json(getExpenses());
});
expenseRoutes.post("/expenses", (req, res) => {
    const { amount, category, note } = req.body;
    const expense = addExpense(amount, category, note);
    res.json(expense);
});
export { expenseRoutes };
//# sourceMappingURL=expenses.js.map