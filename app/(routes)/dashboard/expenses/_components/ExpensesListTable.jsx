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
    <div className="mt-5 border rounded-xl  overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-black text-white">
          <tr>
            <th className="py-2 p-5 text-left text-lg font-semibold">Name</th>
            <th className="py-2 text-left text-lg font-semibold">Amount</th>
            <th className="py-2 text-left text-lg font-semibold">Date</th>
            <th className="py-2 text-left text-lg font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y p-5 divide-gray-200 font-medium bg-gray-300">
          {expensesList.map((expenses, index) => (
            <tr className="text-gray-800 bg-neutral-200">
              <td className="py-2 px-5">{expenses.name}</td>

              <td className="py-2 px-5">₹ {expenses.amount}</td>

              <td className="py-2 px-5">{expenses.createdAt}</td>

              <td className="py-2 px-5">
                <Trash
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={() => deleteExpense(expenses.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesListTable;
