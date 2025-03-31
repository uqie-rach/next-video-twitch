'use client';

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { User } from '@prisma/client';
interface UnblockButtonProps {
  userId: string
};

type CustomUser = {
  data: false | {
    blocker: {
      id: string;
      username: string;
      imageUrl: string;
      externalUserId: string;
      bio: string | null;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}

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
        .catch(err => toast.error("Failed to unblock user"));
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
