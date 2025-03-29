'use client';

import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from '@livekit/components-react';
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { useChatSidebar } from "@/store/use-chat-sidebar";

import Video from "./video";
import { Chat } from "./chat";
import { ChatToggle } from "./chat-toggle";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

const StreamPlayer = (
  { user, stream, isFollowing }: StreamPlayerProps
) => {
  // Get the viewer token for the host identity
  // This will be used to connect to the LiveKit room
  const {
    token,
    name,
    identity
  } = useViewerToken(user.id);

  // Controls the chat sidebar state
  const { collapsed } = useChatSidebar(state => state);

  if (!token || !name || !identity) {
    return (
      <StreamLoader />
    )
  }

  // Populate the props for the chat component
  let ChatProps = {
    viewerName: name,
    hostName: user.username,
    hostIdentity: user.id,
    isFollowing: isFollowing,
    isChatEnabled: stream.isChatEnabled,
    isChatDelayed: stream.isChatDelayed,
    isChatFollowersOnly: stream.isChatFollowersOnly,
  };

  return (
    <>
      {
        // If the chat sidebar is collapsed, show the chat toggle button.
        // This only shows on large screens.
        collapsed && (
          <div className="hidden lg:block fixed top-[100px] right-2 z-50">
            <ChatToggle />
          </div>
        )
      }
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={
          cn(
            "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
            collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
          )
        }
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-auto hidden-scrollbar pb-10">
          <Video
            hostName={user.username}
            hostIdentity={user.id}
          />
        </div>
        <div className={
          cn(
            'col-span-1',
            collapsed && 'hidden',
          )
        }>
          <Chat {...ChatProps} />
        </div>
      </LiveKitRoom>
    </>
  )
}

export default StreamPlayer;

const StreamLoader = () => {
  return (
    <div className="mx-auto mt-30 lg:mt-40 w-fit flex gap-4 items-center bg-white/5 rounded-lg p-4">
      <LoaderCircle className="animate-spin text-blue-500" size={32} />
      <p className="text-sm lg:text-lg text-foreground/50">
        Please wait a moment.
      </p>
    </div>
  )
}
