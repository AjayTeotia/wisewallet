"use client";

import Logo from "@/app/Logo";
import { ModeToggle } from "@/components/modeToggle/ModeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, Menu, PiggyBank, ReceiptText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const DashboardHeader = () => {
  const [loading, setLoading] = useState(true);

  const navItems = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutGrid,
    },
    {
      id: 2,
      name: "Budget",
      path: "/dashboard/budgets",
      icon: PiggyBank,
    },
    {
      id: 3,
      name: "Expenses",
      path: "/dashboard/expenses",
      icon: ReceiptText,
    },
  ];

  const path = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-5 border-b shadow-sm flex items-center justify-between">
      <div className="">
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent className="w-[350px] sm:w-[540px]" side={"left"}>
              <Logo />
              <div className="flex flex-col gap-1 pt-4">
                {navItems.map((item) => (
                  <Link href={item.path} key={item.id}>
                    <h2
                      className={`flex items-center gap-2 mb-2 font-medium p-5 cursor-pointer rounded-md hover:bg-gray-500 hover:text-white ${
                        path === item.path && "bg-gray-500 text-white"
                      }`}
                    >
                      <item.icon />
                      {item.name}
                    </h2>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col items-center gap-y-5 mt-10">
                <div className="flex items-center gap-2">
                  {loading ? (
                    <Skeleton className="h-12 w-12 rounded-full" />
                  ) : (
                    <UserButton />
                  )}
                  <span>Profile</span>
                </div>

                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="md:hidden block">
          <ModeToggle />
        </div>
        {loading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        ) : (
          <>
            <UserButton />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
