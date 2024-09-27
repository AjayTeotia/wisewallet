"use client";

import { db } from "@/utils/dbConfig";
import CreateBudget from "./CreateBudget";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);

  const getBudgetList = async () => {
    if (!user) return;

    console.log("User", user);

    const res = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);

    setBudgetList(res);

    console.log(res);
  };

  useEffect(() => {
    getBudgetList();
  }, [user]);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget />

        {budgetList.map((budget, index) => (
          <BudgetItem key={index} budget={budget} />
        ))}
      </div>
    </div>
  );
};

export default BudgetList;
