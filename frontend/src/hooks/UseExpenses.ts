import { useEffect, useReducer, useState } from "react";
import { expensesReducer } from "../reducer/expenseReducer";
import type { Expense } from "../../../backend/types/expense";
import { saveExpenses, loadExpenses } from "../utils/storage";

const API_URL = "http://localhost:3001/api/expenses";

export function useExpenses() {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeExpenses = async () => {
      try {
        setLoading(true);
        setError(null);
         

        try {
          const res = await fetch(API_URL);
          console.log(res.json());
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const storedExpenses: Expense[] = await res.json();
          dispatch({ type: "LOAD", payload: storedExpenses });
          saveExpenses(storedExpenses);

        } catch (err) {
          console.log("API unavailable, using cached expenses", err);
          const cached = loadExpenses(); 
          dispatch({ type: "LOAD", payload: cached }); 
        } 
      } catch (err) {
        setError("An unexpected error occurred.");
        const cached = loadExpenses();
        dispatch({ type: "LOAD", payload: cached });
      }
      finally {
        setLoading(false);
      }
    };

    initializeExpenses();
  }, [])

  const addExpense = async (expense: Omit<Expense, "id" | "date">) => {
    try {
      setError(null);
      const expenseWithDate = {
        ...expense,
        date: new Date().toISOString().split("T")[0],
      };

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenseWithDate),
        });

        if (!res.ok) throw new Error("Failed to add expense");
        const newExpense = await res.json();
        dispatch({ type: "ADD", payload: newExpense });
        saveExpenses([...expenses, newExpense]);
      } catch (apiError) {
        // Fallback: save locally only
        const localExpense: Expense = {
          ...expenseWithDate,
          id: Date.now().toString(),
        };
        dispatch({ type: "ADD", payload: localExpense });
        saveExpenses([...expenses, localExpense]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add expense");
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      setError(null);
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete expense");
        dispatch({ type: "DELETE", payload: id });
        saveExpenses(expenses.filter((e) => e.id !== id));
      } catch (apiError) {
        // Fallback: delete locally only
        dispatch({ type: "DELETE", payload: id });
        saveExpenses(expenses.filter((e) => e.id !== id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete expense");
    }
  };

  const updateExpense = async (expense: Expense) => {
    const res = await fetch(`${API_URL}/${expense.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)
    });

    const updatedExpense = await res.json();
    dispatch({ type: "UPDATE", payload: updatedExpense });
  }

  return { expenses, addExpense, updateExpense, deleteExpense, loading, error};
}
