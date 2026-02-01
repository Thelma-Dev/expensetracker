import {Router} from "express";
import {v4 as uuid} from "uuid";
import type { Category, Expense } from "../types/expense";

const expenseRoutes = Router();

// State: expense array
let expenses: Expense[] = [];

function addExpense(amount: number, category: Category, note?: string): Expense {
  const expense: Expense = {
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

function getExpenses(): Expense[] {
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

expenseRoutes.delete("/expenses/:id", (req, res) => {
    const { id } = req.params;
    expenses = expenses.filter(expense => expense.id !== id);
    res.status(204).send();
});

expenseRoutes.put("/expenses/:id", (req, res) => {
    const { id } = req.params;
    const { amount, category, note } = req.body;
    let expense = expenses.find(expense => expense.id === id);
    if (expense) {
        expense.amount = amount;
        expense.category = category;
        expense.note = note;
        res.json(expense);
    } else {
        res.status(404).send({ message: "Expense not found" });
    }   
});

export { expenseRoutes };
