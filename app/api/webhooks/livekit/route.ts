import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

import { db } from "@/lib/prisma";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: Request) {
  // const body = JSON.stringify(req.body);
  const body = JSON.stringify(await req.json());
  const headerPayload = headers();
  const authorization = (await headerPayload).get("Authorization");

  if (!authorization) {
    return new Response("Unauthorized", { status: 400 });
  }

  const event = await receiver.receive(body, authorization);

  if (event.event === 'ingress_ended') {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId
      },
      data: {
        isLive: false
      }
    })
  }

  if (event.event === 'ingress_started') {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId
      },
      data: {
        isLive: true
      }
    })
  }

  return new Response('OK', { status: 200 });
}
