'use client';

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import { ChatInfo } from "./chat-info";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly?: boolean;
  isDelayed?: boolean;
  isFollowing?: boolean;
}

export const ChatForm = (
  {
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowersOnly,
    isDelayed,
    isFollowing
  }: ChatFormProps
) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);

      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  }

  if (isHidden) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <div className="mb-2">
          <ChatInfo
            isDelayed={isDelayed}
            isFollowersOnly={isFollowersOnly}
          />
        </div>
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Type a message..."
          className={
            cn(
              'border-white/10',
              isFollowersOnly && 'rounded-t-none border-t-0'
            )
          }
        />
      </div>
      <div className="ml-auto">
        <Button
          type="submit"
          variant='primary'
          size='sm'
          disabled={isDisabled}

        >
          Chat
        </Button>
      </div>
    </form>
  )
}


export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  )
}
