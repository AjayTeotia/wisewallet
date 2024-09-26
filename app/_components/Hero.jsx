import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex items-center flex-col bg-background">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl leading-tight tracking-tighter ">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] bg-clip-text font-bold text-transparent">
              WiseWallet
            </span>
          </h1>

          <br />
          <h2 className="text-3xl font-bold text-slate-500 sm:text-4xl leading-tight tracking-tighter gap-x-5">
            Manager Your Expense <br />
            <strong className="font-extrabold text-black sm:block">
              Control Your Money
            </strong>
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl/relaxed">
            Start Create your budget and save ton of money.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button>Get Started</Button>
            
          </div>
        </div>
      </div>

      <Image
        className="-mt-5 rounded-xl border-2"
        src={"/dashboard.png"}
        alt={"dashboard"}
        width={1000}
        height={700}
      />
    </section>
  );
};

export default Hero;
