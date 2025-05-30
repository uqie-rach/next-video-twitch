'use client';

import { useEffect, useMemo, useState } from "react";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { CommunityTab } from "./community-tab";

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled?: boolean;
  isChatDelayed?: boolean;
  isChatFollowersOnly?: boolean;
};

export const Chat = (
  {
    viewerName,
    hostName,
    hostIdentity,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
  }: ChatProps
) => {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { variant, onExpand } = useChatSidebar(state => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reverseMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  function onSubmit() {
    if (!send) return;

    send(value);
    setValue('');
  };

  function onChange(val: string) {
    setValue(val);
  };

  return (
    <div className="flex flex-col bg-background border-l border-white/5 pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {
        variant === ChatVariant.CHAT && (
          <>
            <ChatList
              messages={reverseMessages}
              isHidden={isHidden}
            />
            <ChatForm
              onSubmit={onSubmit}
              value={value}
              onChange={onChange}
              isHidden={isHidden}
              isFollowersOnly={isChatFollowersOnly}
              isDelayed={isChatDelayed}
              isFollowing={isFollowing}
            />
          </>
        )
      }
      {
        variant === ChatVariant.COMMUNITY && (
          <>
            <CommunityTab
              viewerName={viewerName}
              hostName={hostName}
              isHidden={isHidden}
            />
          </>
        )
      }
    </div>
  )
}

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-foreground/10 pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  )
}
