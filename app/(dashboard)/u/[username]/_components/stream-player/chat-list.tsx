'use client';

import { ReceivedChatMessage } from "@livekit/components-react";

import { ChatMessage } from "./chat-message";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
};

export const ChatList = (
  {
    messages,
    isHidden
  }: ChatListProps
) => {
  if (isHidden || !messages || messages.length === 0)
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {
            isHidden ? "Chat is disabled" : "Welcome to the chat!"
          }
        </p>
      </div>
    )
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            data={message}
          />
        ))
      }
    </div>
  )
}

export const ChatListSkeleton = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Skeleton className="h-6 w-1/2" />
    </div>
  )
}
