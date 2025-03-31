'use client';

import { MinusCircle } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";

import { cn, stringToColor } from "@/lib/utils";

import { onBlock } from "@/actions/block";


interface CommunityItemProps {
  viewerName: string;
  hostName: string;
  participantName: string;
  participantIidentity: string;
};

export const CommunityItem = ({
  viewerName,
  hostName,
  participantName,
  participantIidentity
}: CommunityItemProps
) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || "");
  const isSelf = viewerName === participantName;
  const isHost = viewerName === hostName;

  function handleBlock(): void {
    // Prevent blocking yourself or the host
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIidentity)
        .then(data => toast.success(`Blocked ${data?.blocked.username}`))
        .catch(err => toast.error(`Failed to block ${participantName}`))
    });

  }

  return (
    <div className={
      cn(
        'group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5 mb-3',
        isPending && 'opacity-50',
        isSelf && 'bg-white/5',
      )
    }>
      <p style={{ color: color }}>
        {participantName}
      </p>

      {
        isHost && !isSelf && (
          <Hint
            label="Block"
            side="left"
            asChild
          >
            <Button
              className="h-auto w-auto p-1 rounded-full opacity-0 group-hover:opacity-100"
              onClick={handleBlock}
              disabled={isSelf || !isHost || isPending}
            >
              <MinusCircle className="text-red-500" size={16} />
            </Button>
          </Hint>
        ) || (
          <p>
            {isHost && 'Host'}
          </p>
        )
      }
    </div>
  )
}
