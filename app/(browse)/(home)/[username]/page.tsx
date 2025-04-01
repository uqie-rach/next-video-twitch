import { notFound } from "next/navigation";

import StreamPlayer from "@/app/(dashboard)/u/[username]/_components/stream-player";

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
  params: Promise<{
    username: string;
  }>
};

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockedByUser(user.id);

  if (isBlocking) {
    notFound();
  }

  return (
    <StreamPlayer
      user={user}
      isFollowing={isFollowing}
      stream={user.stream}
    />
  )
}

export default UserPage
