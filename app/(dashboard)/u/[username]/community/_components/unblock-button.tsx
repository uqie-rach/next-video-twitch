'use client';

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { onUnblock } from "@/actions/block";

interface UnblockButtonProps {
  userId: string
};

const UnblockButton = (
  { userId }: UnblockButtonProps
) => {
  const [isPending, startTransition] = useTransition();

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((result) => {
          if (!result) {
            throw new Error("Failed to unblock user");
          }
          // Access the blocked user's data from the result
          const blockedUser = result.blocked;
          toast.success(`Unblocked ${blockedUser.username}`);
        })
        .catch(() => toast.error("Failed to unblock user"));
    });
  };


  return (
    <Button
      disabled={isPending}
      variant="outline"
      onClick={handleUnblock}
    >
      Unblock
    </Button>
  )
}

export default UnblockButton;
