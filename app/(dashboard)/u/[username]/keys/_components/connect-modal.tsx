'use client';

import { AlertTriangle } from "lucide-react";
import { ComponentRef, useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

const ConnectModal = () => {
  const closeRef = useRef<ComponentRef<'button'>>(null);

  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<"WHIP" | "RTMP">("RTMP");

  const onSubmit = () => {
    startTransition(() => {
      createIngress(ingressType)
        .then(() => {
          toast.success('Ingress created successfully');
          closeRef?.current?.click();
        })
        .catch((err) => {
          toast.error(`Failed to create Ingress, \nerror: ${err.message}`)
          console.log(err)
        });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='primary'>
          Generate Connection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={value => setIngressType(value.toString() as "WHIP" | "RTMP")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"RTMP"}>RTMP</SelectItem>
            <SelectItem value={"WHIP"}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This will generate a new stream key and server URL. Are you sure you want to continue?
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose
            ref={closeRef}
            asChild
          >
            <Button variant='ghost'>
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={onSubmit}
            variant='primary'
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConnectModal
