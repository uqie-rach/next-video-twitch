import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";
import StreamPlayer from "../_components/stream-player";

interface CreatorPageProps {
  params: Promise<{
    username: string;
  }>
};

const CreatorPage = async (
  { params }: CreatorPageProps
) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername((await params).username);

  if (!user || user.externalUserId !== externalUser?.id || !user?.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
      />
    </div>
  )
}

export default CreatorPage
