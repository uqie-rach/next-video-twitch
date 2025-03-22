'use client';

import { useSidebar } from '@/store/use-sidebar';
import { User } from '@prisma/client'
import React from 'react'

import UserItem, { UserItemSkeleton } from './user-item';

interface RecommendedProps {
  data: User[]
}

const Recommended = ({
  data
}: RecommendedProps) => {
  const { collapsed } = useSidebar(state => state);

  const showLabel = !collapsed && data.length > 0;

  console.log(showLabel)
  return (
    <div>
      <div className="mb-4">
        {
          showLabel && (
            <h3 className="text-sm text-muted-foreground mb-3">
              Recommended
            </h3>
          )
        }

        {
          (
            <div className="space-y-4">
              {
                data.map(user => (
                  <UserItem
                    key={user?.id}
                    username={user?.username}
                    imageUrl={user?.imageUrl}
                    isLive={true}
                  />
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Recommended

export const RecommendedSkeleton = () => {
  return (
    <ul className='px-2'>
      {
        [...Array(3)].map((_, i) => (
          <UserItemSkeleton key={i} />
        ))
      }
    </ul>
  )
}
