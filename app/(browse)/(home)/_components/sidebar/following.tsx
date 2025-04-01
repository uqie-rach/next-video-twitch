'use client';

import { Follow, User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";
import UserItem, { UserItemSkeleton } from "./user-item";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: {
        isLive: boolean
      } | null
    }
  })[];
}

const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar(state => state);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {
        !collapsed && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Following
            </p>
          </div>
        )
      }

      <ul className="space-y-2">
        {
          data.map(({ following }) => (
            <UserItem
              key={following.id}
              imageUrl={following.imageUrl}
              username={following.username}
              isLive={following.stream?.isLive}
            />
          ))
        }
      </ul>
    </div>
  )
}

export default Following

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {
        [...Array(5)].map((_, index) => (
          <UserItemSkeleton key={index} />
        ))
      }
    </ul>
  )
}
