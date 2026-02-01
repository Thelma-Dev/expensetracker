import { useReducer, useState } from 'react';
import type { Expense } from '../../../backend/types/expense';
import { saveExpenses, loadExpenses } from '../utils/storage';

type Action = 
  | { type: 'ADD'; payload: Expense }
  | { type: 'DELETE'; payload: string }
  | { type: 'LOAD'; payload: Expense[] }
  | {type: 'UPDATE'; payload: Expense };

const expensesReducer = (state: Expense[], action: Action): Expense[] => {
  switch (action.type) {
    case 'ADD':
      const newState = [...state, action.payload];
      saveExpenses(newState);
      return newState;
    case 'DELETE':
      const filtered = state.filter(e => e.id !== action.payload);
      saveExpenses(filtered);
      return filtered;
    case 'UPDATE':
      const updated = state.map(e => 
        e.id === action.payload.id ? action.payload : e
      );
      saveExpenses(updated);
      return updated;
    case 'LOAD':
      return action.payload;
    default:
      return state;
  }
};

export { expensesReducer };