"use client";

import { db } from "@/utils/dbConfig";
import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const { user } = useUser();

  const routes = useRouter();

  const checkUserBudget = async () => {
    const res = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    // console.log(res);

    if (res.length === 0) {
      routes.replace("/dashboard/budgets");
    }
  };

  useEffect(() => {
    user && checkUserBudget();
  }, [user]);

  return (
    <div className="bg-background">
      <div className="fixed md:w-64 hidden md:block ">
        <SideNav />
      </div>

      <div className="md:ml-64">
        <DashboardHeader />

        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
