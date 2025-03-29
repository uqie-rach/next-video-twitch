'use client';

import UserAvatar, { UserAvatarSkeleton } from "@/components/user-avatar";
import { VerifiedMark } from "../verified-mark";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoHeaderProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  imageUrl: string;
  name: string;
}

export const VideoHeader = (
  {
    hostName,
    hostIdentity,
    viewerIdentity,
    isFollowing,
    imageUrl,
    name
  }: VideoHeaderProps
) => {
  // Get the list of participants in the room
  const participants = useParticipants();

  // Get the participant object for the host
  // This will be null if the host is not currently in the room
  const participant = useRemoteParticipant(hostIdentity);

  // Check if the host is currently in the room
  const isLive = !!participant;

  // If the host is not in the room, we can assume they are offline
  const participantCount = participants.length - 1; // Exclude the local participant

  // Check if the host is the same as the viewer
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;

  return (
    <div className="flex flex-col lg:from-white gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={true}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">
              {hostName}
            </h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">
            {name}
          </p>
          {
            isLive ? (
              <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                <UserIcon className="h-4 w-4" />
                <p>
                  {participantCount} {participantCount === 1 ? 'viewer' : 'viewers'}
                </p>
              </div>
            ) : (
              <p className="font-semibold text-xs text-muted-foreground">
                Offline
              </p>
            )
          }
        </div>
        <Actions
          isFollowing={isFollowing}
          hostIdentity={hostIdentity}
          isHost={isHost}
        />
      </div>
    </div>
  )
}

export const VideoHeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:from-white gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatarSkeleton size='lg' />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  )
}
