'use client';

import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";

interface ActionProps {
  isFollowing: boolean;
  isBlocking: boolean;
  userId: string;
}

const Actions = ({ isBlocking, isFollowing, userId }: ActionProps) => {
  const [isPending, startTransition] = useTransition();

  function handleFollow() {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          if (!data) return toast.error('Failed to follow user');

          toast.success(`You are now following ${data.following.username}`);
        })
        .catch((error) => toast.error(error.message));
    })
  }

  function handleUnfollow() {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          if (!data) return toast.error('Failed to follow user');

          toast.success(`You are no longer following ${data.following.username}`);
        })
        .catch((error) => toast.error(error.message));
    })
  }

  const toggleFollowStatus = isFollowing ? handleUnfollow : handleFollow

  function handleBlock() {
    startTransition(() => {
      onBlock(userId)
        .then(data => {
          if (!data) return toast.error('Failed to block user');

          toast.success(`Blocked ${data.blocked.username}`)
        })
        .catch(error => toast.error(error.message))
    })
  }

  function handleUnblock() {
    startTransition(() => {
      onUnblock(userId)
        .then(data => {
          if (!data) return toast.error('Failed to block user');

          toast.success(`Unblocked ${data.blocked.username}`)
        })
        .catch(error => toast.error(error.message))
    })
  }

  const toggleBlockStatus = isBlocking ? handleUnblock : handleBlock;

  return (
    <div className="space-x-4">
      <Button disabled={isPending} onClick={toggleFollowStatus} variant='primary' className="w-fit">
        {
          isPending ? <Loader size={16} className="animate-spin" /> : null
        }
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button disabled={isPending} onClick={toggleBlockStatus} variant='destructive' className="w-fit">
        {
          isPending ? <Loader size={16} className="animate-spin" /> : null
        }
        {isBlocking ? 'Unblock' : 'Block'}
      </Button>
    </div>
  )
}

export default Actions;
