import type { Expense } from "../../../backend/types/expense";
import type {User } from "../../../backend/types/user";

export const saveExpenses = (expenses: Expense[]) =>
  localStorage.setItem("expenses", JSON.stringify(expenses));

export const loadExpenses = (): Expense[] =>
  JSON.parse(localStorage.getItem("expenses") || "[]");

export const saveUser = (user : User[]) => 
    localStorage.setItem("user", JSON.stringify(user));

export const loadUser = (): User[] =>
    JSON.parse(localStorage.getItem("user") || "[]");