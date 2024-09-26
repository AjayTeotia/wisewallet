import { WalletCards } from "lucide-react";

const Logo = () => {
  return (
    <a href="/" className="flex items-center gap-2">
      {/* Wallet Icon */}
      <WalletCards className="w-11 h-11 stroke stroke-[1.5] stroke-rose-400" />

      {/* Title */}
      <p className="bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        WiseWallet
      </p>
    </a>
  );
};

export default Logo;
