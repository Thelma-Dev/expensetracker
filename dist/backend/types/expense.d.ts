export type Category = "Food" | "Rent" | "Transport" | "Shopping" | "Other";
export interface Expense {
    id: string;
    amount: number;
    category: Category;
    note?: string;
    date: string;
}
//# sourceMappingURL=expense.d.ts.map