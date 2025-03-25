import { db } from "@/lib/prisma";

export async function getStreamByUserId(userId: string) {
  try {
    const stream = await db.stream.findUnique({
      where: { userId }
    });

    return stream
  } catch {
    return false;
  }
}
