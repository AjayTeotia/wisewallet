"use client";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import { Skeleton } from "@/components/ui/skeleton";
import AddExpenses from "../_components/AddExpenses";
import ExpensesListTable from "../_components/ExpensesListTable";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EditBudget from "../_components/EditBudget";

const ExpensesPage = ({ params }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const routes = useRouter();

  const getBudgetInfo = async () => {
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
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    setLoading(false);

    setBudgetInfo(res[0]);

    getExpensesList();

    //console.log("res", res);
  };

  const getExpensesList = async () => {
    const res = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.createdAt));
    setExpensesList(res);
    console.log(res);
  };

  const deleteBudget = async () => {
    const deleteExpenseRes = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id));

    if (deleteExpenseRes) {
      const res = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
    }

    toast.success("Budget deleted successfully");
    routes.replace("/dashboard/budgets");
  };
  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expenses
        <div className="flex items-center font-semibold gap-x-2">
          <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 items-center" variant="destructive">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with all of its expenses and remove
                  your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 ">
        {loading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <BudgetItem budget={budgetInfo} />
        )}

        <AddExpenses
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-xl">Latest Expenses</h2>

        <ExpensesListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
};

export default ExpensesPage;
