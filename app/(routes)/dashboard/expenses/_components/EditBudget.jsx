"use client";

import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useEffect } from "react";
import { eq } from "drizzle-orm";
const EditBudget = ({ budgetInfo, refreshData }) => {
  const [showEmojiIcon, setShowEmojiIcon] = useState(budgetInfo?.icon || "😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

  const { user } = useUser();

  useEffect(() => {
    setShowEmojiIcon(budgetInfo?.icon);
    setName(budgetInfo?.name);
    setAmount(budgetInfo?.amount);
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const res = await db
      .update(Budgets)
      .set({ name: name, amount: amount, icon: showEmojiIcon })
      .where(eq(Budgets.id, budgetInfo?.id))
      .returning({ insertedId: Budgets.id })
      .returning();

    if (res) {
      toast.success("Budget updated successfully");
      refreshData();
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2 items-center">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update new budget</DialogTitle>
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
                    defaultValue={budgetInfo?.name}
                    type="text"
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <h2 className="font-medium my-2">Budget Amount</h2>
                  <Input
                    type="number"
                    defaultValue={budgetInfo?.amount}
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
                onClick={() => onUpdateBudget()}
                className="mt-5 w-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
