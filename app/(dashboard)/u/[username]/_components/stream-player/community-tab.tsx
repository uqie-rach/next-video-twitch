'use client';

import { useParticipants } from "@livekit/components-react";
import { LocalParticipant, Participant, RemoteParticipant } from "livekit-client";
import { MinusIcon } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useEffect, useMemo, useRef, useState } from "react";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CommunityItem } from "./community-item";

interface CommunityTabProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
};

export const CommunityTab = (
  {
    viewerName,
    hostName,
    isHidden
  }: CommunityTabProps
) => {
  const [value, setValue] = useState('');

  const participants = useParticipants();
  const debouncedValue = useDebounceValue(value, 500);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [])

  function onChange(newValue: string) {
    setValue(newValue);
  }

  function filteredParticipant() {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;

      if (!acc.some(p => p.identity === hostAsViewer)) {
        acc.push(participant);
      }

      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter(participant => {
      return participant.name?.toLowerCase().includes(debouncedValue[0].toLowerCase());
    });
  }

  useMemo(filteredParticipant, [participants, debouncedValue])

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Community is disabled
        </p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder="Search community"
        className="mb-4 border-border/10"
        ref={searchRef}
      />

      {
        filteredParticipant().length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">
              No result
            </p>
          </div>
        )
      }

      <ScrollArea className="mt-4">
        {
          filteredParticipant().map((pt) => (
            <CommunityItem
              key={pt.identity}
              viewerName={viewerName}
              hostName={hostName}
              participantName={pt.name!}
              participantIidentity={pt.identity}
            />
          ))
        }
      </ScrollArea>
    </div>
  )
}
