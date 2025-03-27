import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
  username: string;
}

export const OfflineVideo = (
  { username }: OfflineVideoProps
) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground/30" />
      <p className="text-muted-foreground/40 capitalize">
        {username} is offline</p>
    </div>
  )
}
