'use client';

import { ComponentRef, FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { updateUser } from "@/actions/user";

interface BioModalProps {
  initialValue: string;
}

export const BioModal = (
  {
    initialValue,
  }: BioModalProps
) => {
  const [value, setValue] = useState(initialValue);

  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ComponentRef<"button">>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success('Bio updated successfully');

          setValue(value);
          closeRef.current?.click();
        })
        .catch(() => toast.error('Failed to update bio'));
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size='sm' className='ml-auto'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="User Bio"
            onChange={(e) => setValue(e.target.value)}
            value={value || ""}
            disabled={isPending}
            rows={5}
            property="bio"
          />
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button
                type="button"
                variant='ghost'
                ref={closeRef}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              type="submit"
              variant='primary'
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
