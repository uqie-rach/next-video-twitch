import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";

interface UserPageProps {
  params: Promise<{
    username: string;
  }>
};

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <h1>{user.username}</h1>
      <p>following: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  )
}

export default UserPage
