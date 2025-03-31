'use client';

import Image from "next/image";
import { Pencil } from "lucide-react";
import { Separator } from "@radix-ui/react-select";

import { InfoModal } from "./info-modal";

interface InfoCardProps {
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  thumbnailUrl: string;
};

export const InfoCard = (
  {
    hostIdentity,
    viewerIdentity,
    name,
    thumbnailUrl
  }: InfoCardProps
) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background p-6 lg:p-8">
        <div className="flex items-center gap-x-2.5 mb-6">
          <div className="rounded-md bg-blue-500 p-2 h-auto w-auto">
            <Pencil />
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-semibold capitalize">
              Edit Your Stream Info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your Visibility
            </p>
          </div>
          <InfoModal
            initialName={name}
            initialThumbnailUrl={thumbnailUrl}
          />
          <Separator />
        </div>
        <div className="space-y-4">
          <div className="">
            <h3 className="text-sm lg:text-base text-foreground mb-2">
              Name
            </h3>
            <p className="text-lg font-semibold text-foreground/40">
              {name}
            </p>
          </div>
          <div>
            <h3 className="text-sm lg:text-base text-foreground mb-2">
              Thumbnail
            </h3>
            <div className="w-full h-auto bg-cover bg-center rounded-lg">
              {
                thumbnailUrl && (
                  <div className="relative aspect-video rounded-md overflow-hidden w-full h-auto border border-white/10">
                    <Image
                      fill
                      src={thumbnailUrl}
                      alt={name}
                      className="object-cover"
                    />
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
