import { getSelf } from "./auth-service";
import { db } from "./prisma";

export async function isBlockedByUser(id: string) {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id }
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id
        }
      }
    });
    console.log('existingBlock', !!existingBlock);

    // Convert existingBlock to a boolean
    return !!existingBlock;

  } catch {
    return false;
  }
}

export async function blockUser(id: string) {
  try {
    const self = await getSelf();

    if (id === self.id) {
      throw new Error("Cannot block yourself");
    }
    const otherUser = await db.user.findUnique({
      where: { id }
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id
        }
      }
    });

    if (existingBlock) {
      throw new Error("Already blocked");
    }

    const block = await db.block.create({
      data: {
        blockerId: self.id,
        blockedId: otherUser.id
      },
      include: {
        blocked: true,
        blocker: true
      }
    });

    return block;
  } catch {
    return false;
  }
}

export async function unblockUser(id: string) {
  try {
    const self = await getSelf();

    if (id === self.id) {
      throw new Error("Cannot unblock yourself");
    }

    const otherUser = await db.user.findUnique({
      where: { id }
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id
        }
      }
    });

    if (!existingBlock) {
      throw new Error("Not blocked");
    }

    const unblock = await db.block.delete({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id
        }
      },
      include: {
        blocked: true,
        blocker: true
      }
    });

    console.log('unblock', unblock);

    return unblock;
  } catch {
    return false;
  }
}

export async function getBlockedUsers() {
  const self = await getSelf();

  const blocks = await db.block.findMany({
    where: {
      blockerId: self.id
    },
    include: {
      blocked: true,
    }
  });

  return blocks;
}
