import React from "react";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/modeToggle/ModeToggle";

const Header = () => {
  return (
    <div className="p-5 flex items-center justify-between shadow-md border-b">
      <Logo />

      <div className="flex items-center gap-4 md:gap-6">
        <ModeToggle />

        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
