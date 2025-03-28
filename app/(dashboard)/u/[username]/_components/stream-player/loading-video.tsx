import { Loader2 } from "lucide-react";

interface LoadingVideoProps {
  label: string;
}

export const LoadingVideo = (
  { label }: LoadingVideoProps
) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <Loader2 className="h-10 w-10 text-muted-foreground/30 animate-spin" />
      <p className="text-muted-foreground/40">
        {label}</p>
    </div>
  )
}
