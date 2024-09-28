import Logo from "@/app/Logo";
import { ModeToggle } from "@/components/modeToggle/ModeToggle";
import React from "react";

const AuthHeader = () => {
  return (
    <div className="fixed mt-5 border-b shadow-lg top-0 left-0 right-0 flex w-full px-5 items-center justify-between mb-5 gap-x-5 ">
      <div className="flex items-center mb-5 ">
        <Logo />
      </div>

      <div className="flex items-center gap-4 mb-5">
        <ModeToggle />
      </div>
    </div>
  );
};

export default AuthHeader;
