'use server';

import { AccessToken } from 'livekit-server-sdk';
import { v4 } from 'uuid';

import { getSelf } from '@/lib/auth-service';
import { getUserById } from '@/lib/user-service';
import { isBlockedByUser } from '@/lib/block-service';

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    // Get the current user from the session
    // This will throw an error if the user is not logged in
    self = await getSelf();

  } catch {
    // If the user is not logged in, create a guest user
    // This is a temporary solution, as we don't have a guest user system yet
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username }
  }

  // Check if the host is blocked by the current user
  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error('Host not found');
  }

  // Check if the host is blocked by the current user
  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error('Host is not available');
  }

  // Check if the host is the same as the current user
  const isHost = self.id === host.id;

  // If the host is the same as the current user, create a token for the host
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username
    }
  );

  // Grant the token permissions based on the host's identity
  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true
  });

  return await Promise.resolve(token.toJwt());
}
