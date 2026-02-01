import React, {useMemo, useState} from "react";
import ExpenseForm from "./components/Expenseform";
import ExpenseList from "./components/ExpenseList";
import { useExpenses } from "./hooks/UseExpenses";
import { Category, Expense } from '../../backend/types/expense';


const App: React.FC = () => {

  const { expenses, addExpense, deleteExpense, loading, error } = useExpenses();
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: ""
  });

  // Phase 2: Derived state with useMemo
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const categoryMatch = !selectedCategory || expense.category === selectedCategory;
      const dateMatch = 
        (!dateRange.start || new Date(expense.date) >= new Date(dateRange.start)) &&
        (!dateRange.end || new Date(expense.date) <= new Date(dateRange.end));
      return categoryMatch && dateMatch;
    });
  }, [expenses, selectedCategory, dateRange]);

  // Phase 2: Calculate totals with useMemo
  const totals = useMemo(() => {
    const byCategory = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const filteredTotal = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    return { byCategory, total, filteredTotal };
  }, [expenses, filteredExpenses]);

  const handleAddExpense = async (expense: Omit<Expense, "id" | "date">) => {
    await addExpense(expense);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>💰 Expense Tracker</h1>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span>Total Expenses:</span>
            <strong>${totals.total.toFixed(2)}</strong>
          </div>
          <div style={styles.statItem}>
            <span>Filtered Total:</span>
            <strong>${totals.filteredTotal.toFixed(2)}</strong>
          </div>
        </div>
      </header>

      {error && <div style={styles.error}>{error}</div>}
      {loading && <div style={styles.loading}>Loading expenses...</div>}

      <ExpenseForm onAdd={handleAddExpense} />

      <div style={styles.filterSection}>
        <h3>Filters</h3>
        <div style={styles.filterGrid}>
          <div>
            <label>From Date:</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              style={styles.filterInput}
            />
          </div>
          <div>
            <label>To Date:</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              style={styles.filterInput}
            />
          </div>
        </div>
      </div>

      <ExpenseList
        expenses={filteredExpenses}
        onDelete={deleteExpense}
        onFilterChange={(category: string) => setSelectedCategory(category as Category | "")}
        currentFilter={selectedCategory}
        categoryTotals={totals.byCategory}
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "30px",
    borderRadius: "8px",
    marginBottom: "30px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  stats: {
    display: "flex" as const,
    gap: "20px",
    marginTop: "15px",
  },
  statItem: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "5px",
  },
  error: {
    background: "#f8d7da",
    color: "#721c24",
    padding: "12px",
    borderRadius: "4px",
    marginBottom: "20px",
    border: "1px solid #f5c6cb",
  },
  loading: {
    background: "#d1ecf1",
    color: "#0c5460",
    padding: "12px",
    borderRadius: "4px",
    marginBottom: "20px",
    border: "1px solid #bee5eb",
  },
  filterSection: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  filterGrid: {
    display: "grid" as const,
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginTop: "10px",
  },
  filterInput: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginTop: "5px",
  },
};

export default App;