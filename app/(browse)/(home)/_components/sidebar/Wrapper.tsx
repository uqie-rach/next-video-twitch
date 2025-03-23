'use client';

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

import { ToggleSkeleton } from "./Toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const [isClient, setIsClient] = useState(false);
  const { collapsed } = useSidebar((state) => state);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return (
    <div className="fixed left-0 px-5 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 transition-all">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </div>
  );


  return (
    <aside
      className={cn(`fixed left-0 px-5 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 transition-all`, collapsed && `w-[70px]`)}
    >
      {children}
    </aside>
  )
}
