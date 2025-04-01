import { User } from "@prisma/client"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

import UserAvatar from "@/components/user-avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Thumbnail, ThumbnailSkeleton } from "../../_components/thumbnail"

interface ResultCardProps {
  data: {
    id: string;
    updatedAt: Date;
    thumbnailUrl: string | null;
    isLive: boolean;
    name: string
  } & { user: User }
}

export const ResultCard = (
  { data }: ResultCardProps
) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl!}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}

        />
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-500">
              {data.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {data.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {
                formatDistanceToNow(new Date(data.updatedAt), {
                  addSuffix: true
                })
              }
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}


export const ResultCardSkeleton = () => {
  return (
    <div className="flex w-full gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  )
}
