'use server';

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const livekitHost = process.env.LIVEKIT_API_URL!;
const livekitApiKey = process.env.LIVEKIT_API_KEY!;
const livekitApiSecret = process.env.LIVEKIT_API_SECRET!;

const roomService = new RoomServiceClient(
  livekitHost,
  livekitApiKey,
  livekitApiSecret
);

export const onBlock = async (id: string) => {
  const self = await getSelf();

  let blockedUser;

  try {
    blockedUser = await blockUser(id);
  } catch {

  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch {

  }

  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
}

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const blockedUser = await unblockUser(id);

  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
}
