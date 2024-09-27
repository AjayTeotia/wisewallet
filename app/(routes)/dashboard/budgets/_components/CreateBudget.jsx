"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { toast } from "sonner";

const CreateBudget = () => {
  const [showEmojiIcon, setShowEmojiIcon] = useState("✋");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  const onCreateBudget = async () => {
    const res = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: showEmojiIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (res) {
      toast.success("Budget created successfully");
    }

    console.log(res);
  };

  return (
    <div className=" bg-background p-5">
      <Dialog>
        <DialogTrigger asChild>
          <div className=" p-10 rounded-md flex items-center font-semibold flex-col border-dashed border-4 cursor-pointer hover:shadow-md">
            <h2 className="text-3xl ">+</h2>
            <h2 className="">Create New Budget</h2>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {showEmojiIcon}
                </Button>

                <div className="absolute">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setShowEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>

                <div className="mt-5">
                  <h2 className="font-medium my-2">Budget Name</h2>
                  <Input
                    type="text"
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <h2 className="font-medium my-2">Budget Amount</h2>
                  <Input
                    type="number"
                    value={` ${amount}`}
                    placeholder="e.g. ₹ 500"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateBudget()}
                className="mt-5 w-full"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
