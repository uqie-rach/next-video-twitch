import { LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
}

export const NavItem = ({ label, icon: Icon, href, isActive }: NavItemProps) => {
  const { collapsed } = useCreatorSidebar(state => state);

  return (
    <Button
      asChild
      variant='ghost'
      className={
        cn(
          'w-full h-12',
          collapsed ? 'justify-center' : 'justify-start',
          isActive && 'bg-card'
        )
      }
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={
            cn(
              'h-4 w-4',
              collapsed ? 'mr-0' : 'mr-2'
            )
          } />
          {
            !collapsed && <span>{label}</span>
          }
        </div>
      </Link>
    </Button>
  )
}


export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="h-[32px] w-[32px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-[32px]" />
      </div>
    </li>
  )
}
