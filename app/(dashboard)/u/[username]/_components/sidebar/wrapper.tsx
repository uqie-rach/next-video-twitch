'use client';

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

import { ToggleSkeleton } from "./Toggle";
import { NavItemSkeleton } from "./nav-item";


interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const [isClient, setIsClient] = useState(false);
  const { collapsed } = useCreatorSidebar(state => state);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return (
    <div className="fixed left-0 px-5 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 transition-all">
      <ToggleSkeleton />
      {
        Array.from({ length: 4 }).map((_, index) => (
          <NavItemSkeleton key={index} />
        ))
      }
    </div>
  );

  return (
    <aside className={cn('fixed left-0 flex-col w-[80px] px-5 transition-all lg:w-60 flex h-full bg-background border-r border-[#2D2E35] z-50', collapsed && 'lg:w-[90px]')}>
      {children}
    </aside>
  );
}
