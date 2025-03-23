'use client';

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
  isFollowing: boolean;
  userId: string;
}

const Actions = ({ isFollowing, userId }: ActionProps) => {
  const [isPending, startTransition] = useTransition();

  function handleFollow() {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch((error) => toast.error(error.message));
    })
  }

  function handleUnfollow() {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`You are no longer following ${data.following.username}`))
        .catch((error) => toast.error(error.message));
    })
  }

  const onClick = isFollowing ? handleUnfollow : handleFollow
  return (
    <Button disabled={isPending} onClick={onClick} variant='primary' className="w-fit">
      {
        isPending ? <Loader size={16} className="animate-spin" /> : null
      }
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export default Actions;
