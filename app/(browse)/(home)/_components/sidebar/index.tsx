import React from 'react'

import { Wrapper } from './Wrapper';
import Toggle, { ToggleSkeleton } from './Toggle';
import Recommended, { RecommendedSkeleton } from './recommended';

import { getRecommended } from '@/lib/recommended-service';
import { getFollowedUsers } from '@/lib/follow-service';
import Following, { FollowingSkeleton } from './following';

const Sidebar = async () => {
  const recommended = await getRecommended();
  const follows = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={follows} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  )
}

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-white/10 z-50'>
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}
