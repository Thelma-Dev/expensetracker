import { Expense, Category } from '../../../backend/types/expense';

const CATEGORIES: Category[] = [
  'Food', 'Rent', 'Transport', 'Electricity', 'Hydraulic',
  'Emergency Fund', 'Internet + TV', 'Phone Bill', 'Shopping',
  'Property Taxes', 'Other'
];

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onFilterChange: (category: string) => void;
  currentFilter: "" | Category;
  categoryTotals: Record<string, number>;
}

export default function ExpenseList({ expenses, onDelete, onFilterChange, currentFilter }: Props) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Expenses</h2>
        <div style={styles.total}>Total: ${total.toFixed(2)}</div>
      </div>

      <div style={styles.filterContainer}>
        <button 
          onClick={() => onFilterChange('')}
          style={{...styles.filterBtn, ...(currentFilter === '' ? styles.filterBtnActive : {})}}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            style={{...styles.filterBtn, ...(currentFilter === cat ? styles.filterBtnActive : {})}}
          >
            {cat}
          </button>
        ))}
      </div>

      {expenses.length === 0 ? (
        <p style={styles.empty}>No expenses yet. Add one to get started!</p>
      ) : (
        <ul style={styles.list}>
          {expenses.map(expense => (
            <li key={expense.id} style={styles.item}>
              <div style={styles.itemContent}>
                <div>
                  <div style={styles.category}>{expense.category}</div>
                  <div style={styles.note}>{expense.note || 'No note'}</div>
                  <div style={styles.date}>{new Date(expense.date).toLocaleDateString()}</div>
                </div>
                <div style={styles.amount}>${expense.amount.toFixed(2)}</div>
              </div>
              <button
                onClick={() => onDelete(expense.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: '20px'
  },
  total: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    color: '#28a745'
  },
  filterContainer: {
    display: 'flex' as const,
    gap: '10px',
    flexWrap: 'wrap' as const,
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee'
  },
  filterBtn: {
    padding: '6px 12px',
    border: '1px solid #ddd',
    background: 'white',
    borderRadius: '4px',
    cursor: 'pointer' as const,
    fontSize: '12px',
    transition: 'all 0.2s'
  },
  filterBtnActive: {
    background: '#007bff',
    color: 'white',
    borderColor: '#007bff'
  },
  list: {
    listStyle: 'none'
  },
  item: {
    padding: '12px',
    marginBottom: '10px',
    background: '#f9f9f9',
    borderRadius: '4px',
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const
  },
  itemContent: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    width: '100%',
    gap: '20px'
  },
  category: {
    fontWeight: 'bold' as const,
    color: '#333'
  },
  note: {
    fontSize: '12px',
    color: '#666',
    marginTop: '4px'
  },
  date: {
    fontSize: '11px',
    color: '#999',
    marginTop: '4px'
  },
  amount: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
    color: '#ff6b6b',
    whiteSpace: 'nowrap' as const
  },
  deleteBtn: {
    padding: '6px 12px',
    background: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer' as const,
    fontSize: '12px'
  },
  empty: {
    textAlign: 'center' as const,
    color: '#999',
    marginTop: '20px'
  }
};