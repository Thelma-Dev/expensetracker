export type Category = 
"Food" | "Rent" | "Transport" | "Electricity"| "Hydraulic" | "Emergency Fund" |
"Internet + TV"|"Phone Bill"|"Shopping" | "Property Taxes" | "Other";

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  note?: string;
  date: string;
}