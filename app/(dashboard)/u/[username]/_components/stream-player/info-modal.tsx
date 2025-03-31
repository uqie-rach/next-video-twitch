'use client';

import {
  ComponentRef,
  useEffect,
  useRef,
  useState,
  useTransition
} from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Hint from "@/components/hint";

import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
};

export const InfoModal = (
  {
    initialName,
    initialThumbnailUrl
  }: InfoModalProps
) => {
  const [name, setName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(initialThumbnailUrl);

  const closeRef = useRef<ComponentRef<"button">>(null);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success('Thumbnail removed successfully')
          setThumbnailUrl(null);

          closeRef.current?.click();
        })
        .catch(() => toast.error('Failed to remove thumbnail'))
    });
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === initialName) {
      toast.error('No changes made to the stream name');
      return;
    }

    if (!name) {
      toast.error('Stream name cannot be empty');
      return;
    }

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success('Stream updated successfully')
          closeRef.current?.click();
        })
        .catch(() => toast.error('Failed to update stream'))
    });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size='sm' className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>
            Edit
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>
              Name
            </Label>
            <Input
              placeholder="Stream Name"
              onChange={onChange}
              value={name}
              disabled={isPending}
              className="border-none"
            />
          </div>
          {
            thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove Thumbnail" asChild side='left'>
                    <button
                      type="button"
                      className="h-auto w-auto p-2 hover:bg-red-100 rounded-xl"
                      onClick={onRemove}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </button>
                  </Hint>
                </div>
                <Image
                  fill
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  className="object-cover rounded-xl"
                />
              </div>
            ) : (
              <div>
                <Label className="mb-4">
                  Thumbnail
                </Label>
                <div className="space-y-2 rounded-xl p-4 outline-dashed outline-muted/10">
                  <UploadDropzone
                    endpoint='thumbnailUploader'
                    appearance={{
                      label: {
                        color: "#FFFFFF",
                      },
                      allowedContent: {
                        color: "#FFFFFF",
                      }
                    }}
                    onClientUploadComplete={
                      res => {
                        toast.success('Thumbnail uploaded successfully');
                        setThumbnailUrl(res[0].ufsUrl);
                        closeRef.current?.click();
                        router.refresh();

                      }
                    }
                    onUploadError={
                      (error: Error) => {
                        toast.error('Failed to upload thumbnail');
                      }
                    }
                  />
                </div>
              </div>
            )
          }
          <div className="flex justify-between">
            <DialogClose
              ref={closeRef}
              asChild
            >
              <Button type="button" variant='ghost'>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant='primary' disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
