import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const ExpensesListTable = ({ expensesList, refreshData }) => {
  const deleteExpense = async (id) => {
    const res = await db.delete(Expenses).where(eq(Expenses.id, id));

    if (res) {
      toast.success("Expense deleted successfully");
      refreshData();
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-gray-400 font-semibold text-lg p-2">
        <h2>Name</h2>

        <h2>Amount</h2>

        <h2>Date</h2>

        <h2>Action</h2>
      </div>

      {expensesList.map((expenses, index) => (
        <div className="grid grid-cols-4 bg-gray-300 font-light text p-2">
          <h2>{expenses.name}</h2>

          <h2>₹ {expenses.amount}</h2>

          <h2>{expenses.createdAt}</h2>

          <h2>
            <Trash
              className="w-5 h-5 text-red-500 cursor-pointer"
              onClick={() => deleteExpense(expenses.id)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpensesListTable;
