
import { StreamPlayerSkeleton } from '@/app/(dashboard)/u/[username]/_components/stream-player'

const UserLoading = () => {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  )
}

export default UserLoading;
