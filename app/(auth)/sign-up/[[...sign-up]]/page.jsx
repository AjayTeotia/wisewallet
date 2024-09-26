import Logo from "@/app/Logo";
import { ModeToggle } from "@/components/modeToggle/ModeToggle";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="flex items-center justify-between mb-5 gap-x-5">
          <Logo />

          <ModeToggle />
        </div>
        <SignUp />
      </div>
    </>
  );
}
