"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useState } from "react";
import { toast } from "sonner";

const AddExpenses = ({ budgetId, user, refreshData }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const addNewExpense = async () => {
    const res = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ insertedId: Budgets.id });

    console.log(res);
    if (res) {
      refreshData();

      toast.success("Expense added successfully");
      setName("");
      setAmount("");
    }
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="text-lg font-bold ">Add Expenses</h2>

      <div className="mt-5">
        <h2 className="font-medium my-2">Expenses Name</h2>
        <Input
          type="text"
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
            placeholder="e.g. ₹ 500"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <Button
        disabled={!(name && amount)}
        onClick={() => addNewExpense()}
        className="mt-6 w-full"
      >
        Add Expenses
      </Button>
    </div>
  );
};

export default AddExpenses;
