"use client";

import Logo from "@/app/Logo";
import { ModeToggle } from "@/components/modeToggle/ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SideNav = () => {
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

  useEffect(() => {}, [path]);

  return (
    <div className="h-screen border p-5 shadow-md">
      <Logo />

      <div className=" flex flex-col items-center gap-y-10">
        <div className="mt-5">
          {navItems.map((item) => (
            <Link href={item.path} key={item.id}>
              <h2
                key={item.id}
                className={`flex items-center gap-2 mb-2 font-medium p-5 cursor-pointer rounded-md hover:bg-red-200 hover:text-red-600 ${
                  path === item.path && "bg-red-200 text-red-600"
                }`}
              >
                <item.icon />

                {item.name}
              </h2>
            </Link>
          ))}
        </div>

        <div className="fixed bottom-10 p-5 flex flex-col items-center gap-y-5">
          <div className="flex items-center gap-2 ">
            <UserButton /> Profile
          </div>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
