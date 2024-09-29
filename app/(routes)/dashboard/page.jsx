"use client";

import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BarChartDashboard from "./expenses/_components/BarChartDashboard";

const page = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [budgetList, setBudgetList] = useState([]);
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
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.name));

    setBudgetList(res);
    setLoading(false);

    //  console.log(res);
  };

  useEffect(() => {
    getBudgetInfo();
  }, [user]);

  return (
    <div className="p-5">
      {loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-5 w-[200px]" />
        </div>
      ) : (
        <h2 className="font-bold text-3xl">Hi, {user?.firstName} </h2>
      )}

      <p className="text-muted-foreground">
        Here's what happing with your money, Let's manage your money
      </p>

      <CardInfo budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 ">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
        </div> 

        <div className="">Other content </div>
      </div>
    </div>
  );
};

export default page;
