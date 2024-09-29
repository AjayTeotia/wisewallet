"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

const AddExpenses = ({ budgetId, user, refreshData }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {
    setLoading(true);
    const res = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("YYYY-MM-DD"),
      })
      .returning({ insertedId: Budgets.id });

    setName("");
    setAmount("");

    // console.log(res);
    if (res) {
      setLoading(false);
      refreshData();

      toast.success("Expense added successfully");
      setName("");
      setAmount("");
    }

    setLoading(false);
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="text-lg font-bold ">Add Expenses</h2>

      <div className="mt-5">
        <h2 className="font-medium my-2">Expenses Name</h2>
        <Input
          type="text"
          value={name}
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mt-2">
        <h2 className="font-medium my-2">Expenses Amount</h2>

        <div className="mt-2">
          <h2 className="font-medium my-2">Budget Amount</h2>
          <Input
            type="number"
            value={amount}
            placeholder="e.g. ₹ 500"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <Button
        disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
        className="mt-6 w-full"
      >
        {loading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Add Expenses"
        )}
      </Button>
    </div>
  );
};

export default AddExpenses;
