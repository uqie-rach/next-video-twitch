import { cva, type VariantProps } from "class-variance-authority";

import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LiveBadge from "@/components/live-badge";

import { cn } from "@/lib/utils";

const avatarSizes = cva(
  "",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        lg: "h-14 w-14",
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
)

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
};

const UserAvatar = ({
  imageUrl,
  username,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;

  return (
    <div className="relative">
      <Avatar
        className={
          cn(
            isLive && "ring-2 ring-purple-500 border border-background",
            avatarSizes({ size })
          )
        }
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>

      {
        canShowBadge && <LiveBadge />
      }
    </div>
  )
}

export default UserAvatar;

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> { };

export const UserAvatarSkeleton = ({
  size,
}: UserAvatarSkeletonProps) => {
  return (
    <Skeleton className={
      cn(
        'rounded-full',
        avatarSizes({ size }),
      )
    } />
  )
}
