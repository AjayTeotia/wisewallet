"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const DashboardHeader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-5 border-b shadow-sm flex items-center justify-between">
      <div className=""></div>

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
      </div>
    </div>
  );
};

export default DashboardHeader;
