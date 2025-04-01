import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/prisma";

export async function getFollowedUsers() {
  try {
    const self = await getSelf();

    const followedUsers = await db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id
            },
          }
        }
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true
              }
            }
          }
        }
      }
    });

    return followedUsers;
  } catch {
    return [];
  }
}

export async function isFollowingUser(id: string) {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id }
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id
      }
    });

    // Convert existingFollow to a boolean
    return !!existingFollow;

  } catch {
    return false;
  }
}

export async function followUser(id: string) {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id }
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      throw new Error("You can't follow yourself");
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id
      }
    });

    console.log('existingFollow', existingFollow);

    if (existingFollow) {
      throw new Error("You are already following this user");
    }

    const follow = await db.follow.create({
      data: {
        followerId: self.id,
        followingId: otherUser.id
      },
      include: {
        following: true,
        follower: true
      }
    });

    return follow;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function unfollowUser(id: string) {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id }
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      throw new Error("You can't unfollow yourself");
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id
      }
    });

    if (!existingFollow) {
      throw new Error("You are not following this user");
    }

    const follow = await db.follow.delete({
      where: {
        id: existingFollow.id
      },
      include: {
        following: true,
      }
    });

    return follow;
  } catch (error) {
    console.log(error);
    return false;
  }
}
