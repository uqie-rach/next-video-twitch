import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { onFollow, onUnfollow } from "@/actions/follow";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
};

export const Actions = (
  {
    isFollowing,
    hostIdentity,
    isHost
  }: ActionsProps
) => {
  const [isPending, startTransition] = useTransition();

  const { userId } = useAuth();
  const router = useRouter();

  function handleFollow() {
    startTransition(() => {
      onFollow(hostIdentity)
        .then(data => toast.success(`Following ${data.following.username}`))
        .catch(() => toast.error('Something went wrong. Please try again.'));
    })
  }
  function handleUnfollow() {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then(data => toast.success(`Unfollowed ${data.following.username}`))
        .catch(() => toast.error('Something went wrong. Please try again.'));
    })
  }

  function toggleFollow() {
    if (!userId) return router.push('/sign-in');

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant='primary'
      size='sm'
      className="w-full lg:w-auto"
    >
      <Heart className={
        cn(
          'h-4 w-4 mr-2',
          isFollowing ? 'fill-white' : 'fill-transparent',
        )
      } />
      {isFollowing ? 'Unfollow' : 'Follow'}
      {
        isHost && (
          <span className="text-xs font-semibold text-muted-foreground ml-2">
            (You)
          </span>
        )
      }
    </Button>
  )
}

export const ActionsSkeleton = () => {
  return (
    <Skeleton className="h-10 w-full lg:w-24" />
  )
}
