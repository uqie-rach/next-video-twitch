'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "../verified-mark";
import { BioModal } from "./bio-modal";

interface AboutCardProps {
  hostIdentity: string;
  viewerIdentity: string;
  hostName: string;
  bio: string | null;
  followedByCount: number;
};

export const AboutCard = (
  {
    hostIdentity,
    viewerIdentity,
    hostName,
    bio,
    followedByCount,
  }: AboutCardProps
) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  console.log(followedByCount)

  const followedByLabel = followedByCount === 1 ? "follower" : "followers"

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
          {
            isHost && (
              <BioModal initialValue={bio!} />
            )
          }
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span> {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || "No bio available."}
        </p>
      </div>
    </div>
  )
}


export const AboutCardSkeleton = () => {
  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  )
}
