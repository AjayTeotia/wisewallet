"use client";

import Logo from "@/app/Logo";
import { ModeToggle } from "@/components/modeToggle/ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Skeleton = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`}></div>
);

const SideNav = () => {
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
    {
      id: 4,
      name: "Upgrade",
      path: "/dashboard/upgrade",
      icon: ShieldCheck,
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
    <div className="h-screen border-r p-5 shadow-md">
      <Logo />

      <div className="flex flex-col items-center gap-y-10">
        <div className="mt-5">
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

        <div className="fixed bottom-10 p-5 flex flex-col items-center gap-y-5">
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            ) : (
              <>
                <UserButton />
              </>
            )}
             Profile
          </div>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
