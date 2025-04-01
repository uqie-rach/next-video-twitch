'use server';

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  TrackSource,
  CreateIngressOptions,
  IngressVideoOptions,
  IngressAudioOptions
} from 'livekit-server-sdk';
import { revalidatePath } from 'next/cache';

import { getSelf } from '@/lib/auth-service';
import { db } from '@/lib/prisma';

const livekitHost = process.env.LIVEKIT_API_URL!;
const livekitApiKey = process.env.LIVEKIT_API_KEY!;
const livekitApiSecret = process.env.LIVEKIT_API_SECRET!;

const roomService = new RoomServiceClient(
  livekitHost,
  livekitApiKey,
  livekitApiSecret
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (type: "WHIP" | "RTMP") => {
  const ingressType = type === "WHIP" ? IngressInput.WHIP_INPUT : IngressInput.RTMP_INPUT;
  const self = await getSelf();

  await resetIngresses(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.enableTranscoding = true;
  } else {
    options.video = new IngressVideoOptions({
      source: TrackSource.CAMERA,
      encodingOptions: {
        case: 'preset',
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
      }
    });

    options.audio = new IngressAudioOptions({
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        case: 'preset',
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
      }
    });

    const ingress = await ingressClient.createIngress(
      ingressType,
      options
    );

    if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new Error('Failed to create ingress from server action');
    }

    await db.stream.update({
      where: { userId: self.id },
      data: {
        ingressId: ingress.ingressId,
        serverUrl: ingress.url,
        streamKey: ingress.streamKey,
      }
    });

    revalidatePath(`/u/${self.username}/keys`);
    return ingress;
  }
}
