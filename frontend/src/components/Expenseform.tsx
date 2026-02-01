import { useState } from 'react';
import { Expense, Category } from '../../../backend/types/expense';

const CATEGORIES: Category[] = [
  'Food', 'Rent', 'Transport', 'Electricity', 'Hydraulic',
  'Emergency Fund', 'Internet + TV', 'Phone Bill', 'Shopping',
  'Property Taxes', 'Other'
];

interface Props {
  onAdd: (expense: {
    amount: number;
    category: Category;
    note?: string;
    date: string;
  }) => void;
}

export default function ExpenseForm({ onAdd }: Props) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Rent');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || isNaN(parseFloat(amount))) return;

    onAdd({
      amount: parseFloat(amount),
      category,
      note: note || undefined,
      date
    });

    setAmount('');
    setCategory('Rent');
    setNote('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
     <h3>Add New Expense</h3>

      <div style={styles.group}>
        <label>Category</label>
        <select 
          value={category} 
          onChange={e => setCategory(e.target.value as Category)}
          style={styles.input}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={styles.group}>
        <label>Amount ($)</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.group}>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.group}>
        <label>Note (optional)</label>
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Add a note..."
          style={styles.input}
        />
      </div>

      <button type="submit" style={styles.button}>Add Expense</button>
    </form>
  );
}

const styles = {
  form: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  group: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  button: {
    background: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  }
};