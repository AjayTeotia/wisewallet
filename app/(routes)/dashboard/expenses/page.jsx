"use client";

import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useEffect, useState } from "react";
import ExpensesListTable from "./_components/ExpensesListTable";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

const ExpensePage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  const getBudgetList = async () => {
    if (!user) return;

    setLoading(true);

    const res = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.name));

    setBudgetList(res);
    getAllExpenses(); // Call to fetch expenses
  };

  const getAllExpenses = async () => {
    if (!user) return;

    const res = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.createdAt));

    setExpensesList(res);
    setLoading(false); // Set loading to false after fetching expenses
  };

  useEffect(() => {
    getBudgetList();
  }, [user]);

  return (
    <div className="m-5">
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <ExpensesListTable
          expensesList={expensesList}
          refreshData={() => getBudgetList()}
        />
      )}
    </div>
  );
};

export default ExpensePage;
