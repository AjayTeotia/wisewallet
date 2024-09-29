"use client";

import React from "react";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/modeToggle/ModeToggle";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex items-center justify-between shadow-md border-b">
      <Logo />

      <div className="flex items-center gap-4 md:gap-6">
        <ModeToggle />

        {isSignedIn ? (
          <>
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>

            <UserButton />
          </>
        ) : (
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
