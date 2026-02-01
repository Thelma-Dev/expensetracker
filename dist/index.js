import { v4 as uuid } from "uuid";
// State: expense array
let expenses = [];
// Add expense
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
}
// Example usage
addExpense(25, "Food", "Lunch");
addExpense(100, "Shopping", "Shoes");
console.log("All expenses:", expenses);
//# sourceMappingURL=index.js.map