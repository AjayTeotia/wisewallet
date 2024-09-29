import { Skeleton } from "@/components/ui/skeleton";
import { PiggyBank, ReceiptIcon, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

const CardInfo = ({ budgetList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    if (budgetList) {
      calCardInfo();
    }
  }, [budgetList]);

  const calCardInfo = () => {
    console.log("cardInfo", budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach((budget) => {
      totalBudget_ += Number(budget.amount);
      totalSpend_ += budget.totalSpend;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {budgetList && budgetList.length > 0 ? (
        <>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">₹ {totalBudget}</h2>
            </div>
            <PiggyBank className="bg-gray-500 h-12 w-12 rounded-full text-white p-3" />
          </div>

          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spends</h2>
              <h2 className="font-bold text-2xl">₹ {totalSpend}</h2>
            </div>
            <ReceiptIcon className="bg-gray-500 h-12 w-12 rounded-full text-white p-3" />
          </div>

          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">No. Budget</h2>
              <h2 className="font-bold text-2xl">{budgetList.length}</h2>
            </div>
            <Wallet className="bg-gray-500 h-12 w-12 rounded-full text-white p-3" />
          </div>
        </>
      ) : (
        [1, 2, 3].map((item, index) => (
          <Skeleton className="h-20 w-full" key={index} />
        ))
      )}
    </div>
  );
};

export default CardInfo;
