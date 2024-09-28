import Link from "next/link";

const BudgetItem = ({ budget }) => {
  const calProgressPercentage = () => {
    const percentage = (budget.totalSpend / budget.amount) * 100;

    return percentage.toFixed(2);
  };

  return (
    <Link
      href={`/dashboard/expenses/${budget.id}`}
      className="p-5 rounded-lg border hover:shadow-md cursor-pointer h-[170px]"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center  gap-2">
          <h2 className="text-2xl p-2 px-4 rounded-full flex items-center font-semibold flex-col border-4 cursor-pointer hover:shadow-md">
            {budget.icon}
          </h2>
          <div className="">
            <h2 className="font-bold">{budget.name}</h2>

            <h2 className="text-sm text-muted-foreground">
              {budget.totalItems} Item
            </h2>
          </div>
        </div>

        <h2 className="text-lg font-bold">₹ {budget.amount}</h2>
      </div>

      <div className="mt-5">
        <div className="flex mb-2 items-center justify-between">
          <h2 className="text-sm text-muted-foreground">
            ₹ {budget.totalSpend ? budget.totalSpend : 0} Spend
          </h2>

          <h2 className="text-sm text-muted-foreground">
            ₹ {budget.amount - budget.totalSpend} Remaining
          </h2>
        </div>

        <div className="w-full h-2 rounded-full bg-gray-300">
          <div
            className="h-2 rounded-full bg-blue-500"
            style={{ 
              width: `${calProgressPercentage()}%` 
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
