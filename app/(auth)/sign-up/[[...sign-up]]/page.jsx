
import { SignUp } from "@clerk/nextjs";
import AuthHeader from "../../_components/AuthHeader";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="flex items-center justify-between mb-5 gap-x-5">
         <AuthHeader />
        </div>
        
        <SignUp />
      </div>
    </>
  );
}
