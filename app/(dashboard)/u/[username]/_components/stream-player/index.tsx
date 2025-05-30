'use client';

import { LiveKitRoom } from '@livekit/components-react';

import { cn } from "@/lib/utils";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { useChatSidebar } from "@/store/use-chat-sidebar";

import Video, { VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { VideoHeader, VideoHeaderSkeleton } from "./video-header";
import { AboutCard, AboutCardSkeleton } from "./about-card";
import { InfoCard } from "./info-card";

export type SafeStreamType = {
  name: string;
  id: string;
  thumbnailUrl: string | null;
  isLive: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}


type SafeUserType = {
  id: string;
  username: string;
  bio: string | null;
  stream: SafeStreamType | null;
  imageUrl: string;
  _count: { followedBy: number }
}

interface StreamPlayerProps {
  user: SafeUserType & {
    _count: {
      followedBy: number;
    }
  };
  stream: SafeStreamType | null;
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
      <StreamPlayerSkeleton />
    )
  }

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
          <VideoHeader
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            isFollowing={isFollowing}
            imageUrl={user.imageUrl}
            name={name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream?.name}
            thumbnailUrl={stream?.thumbnailUrl || ''}
          />
          <AboutCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            hostName={user.username}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>
        <div className={
          cn(
            'col-span-1',
            collapsed && 'hidden',
          )
        }>
          <Chat
            hostIdentity={user.id}
            viewerName={name}
            isFollowing={isFollowing}
            isChatEnabled={stream?.isChatEnabled}
            isChatDelayed={stream?.isChatDelayed}
            isChatFollowersOnly={stream?.isChatFollowersOnly}
            hostName={user.username}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}

export default StreamPlayer;

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <VideoHeaderSkeleton />
        <AboutCardSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  )
}
