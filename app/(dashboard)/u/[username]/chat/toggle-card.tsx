'use client';

import { useTransition } from "react";
import { toast } from "sonner";

import { updateStream } from "@/actions/stream";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}

const ToggleCard = ({
  value = false,
  field,
  label
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success('Chat setting updated'))
        .catch(() => toast.error('Failed to update chat setting'))
    })
  }

  return (
    <div className="rounded-xl bg-card p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">
          {label}
        </p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            onCheckedChange={onChange}
            checked={value}
          >
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default ToggleCard;

export const ToggleCardSkeleton = () => {
  return (
    <Skeleton className="rounded-xl p-10 w-full" />
  )
}
