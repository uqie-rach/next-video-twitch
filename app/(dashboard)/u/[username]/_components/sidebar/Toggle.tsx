'use client';

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const Toggle = () => {
  const {
    collapsed,
    onExpand,
    onCollapse,
  } = useCreatorSidebar((state) => state);

  const label = collapsed ? 'Expanded' : 'Collapsed';
  return (
    <>
      {
        collapsed && (
          <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
            <Hint label={label} side="right" asChild>
              <Button
                onClick={onExpand}
                variant='ghost'
                className="h-auto p-2"
              >
                <ArrowRightFromLine className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
        )
      }

      {
        !collapsed && (
          <div className="py-3 mb-2 flex items-center w-full">
            <p className="font-semibold text-primary">
              For You
            </p>
            <Hint label={label} side="right" asChild>
              <Button
                onClick={onCollapse}
                variant='ghost'
                className="h-auto p-2 ml-auto"
              >
                <ArrowLeftFromLine className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
        )
      }
    </>
  )
}

export default Toggle;

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-[32px] w-[100px]" />
      <Skeleton className="h-[32px] w-[32px]" />
    </div>
  )
}
