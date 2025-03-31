import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/prisma'
import { resetIngresses } from '@/actions/ingress'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type
  console.log(`Received webhook with event type of ${eventType}`)
  console.log(`[Webhook Payload]: body: ${body}`)

  // Respond to webhook
  if (eventType === 'user.created') {
    try {
      await db.user.create({
        data: {
          username: payload.data.username ?? `User ${payload.data.id}`,
          externalUserId: payload.data.id,
          imageUrl: payload.data.image_url,
          stream: {
            create: {
              name: `${payload.data.username}'s Stream`,
            },
          }
        }
      });

      return new Response('User created', { status: 201 })
    } catch (error) {
      console.error('Error: Could not create user:', error)
      return new Response('Error: Could not create user', {
        status: 400,
      })
    }

  } else if (eventType === 'user.updated') {

    const user = await db.user.findUnique({
      where: {
        externalUserId: payload.data.id,
      }
    });

    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      }
    })
  } else if (eventType === 'user.deleted') {
    await resetIngresses(payload.data.id);

    const user = await db.user.findUnique({
      where: {
        externalUserId: payload.data.id,
      }
    })

    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    await db.user.delete({
      where: {
        externalUserId: payload.data.id,
      }
    })
  }

  return new Response('Webhook received', { status: 200 })
}
