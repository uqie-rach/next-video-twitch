# Next.js Video Streaming App

## Overview
This is a modern video streaming platform built with Next.js 15 and the App Router. It allows users to broadcast live using software like OBS Studio via WHIP (WebRTC-HTTP Ingestion Protocol) and RTMP (Real-Time Messaging Protocol). Users can also watch live streams, follow other users, block unwanted users, and sign in using Google. The platform includes real-time chat, viewer blocking, and other essential streaming controls.

## Tech Stack
- **Next.js 15** (App Router)
- **Next.js Server Actions**
- **Clerk** (Authentication & Webhooks)
- **NextAuth.js** (Planned for future development)
- **Supabase** (PostgreSQL database)
- **LiveKit** (Real-time streaming and WebRTC integration)
- **TailwindCSS** (Styling)

### UI Libraries
- **ShadCN** (UI components)
- **Sonnet** (Message popup)

## Features
- **Live Streaming Support**: Users can stream using OBS Studio or other WHIP/RTMP-compatible software.
- **Low-Latency WebRTC Streaming**: Powered by LiveKit for high-performance video delivery.
- **User Authentication**: Secure sign-in with Clerk, including Google authentication.
- **Follow & Block Users**: Users can follow others and block unwanted viewers.
- **Real-Time Chat**: Engage with audiences through live chat.
- **Viewer Management**: Block disruptive viewers to maintain a positive streaming environment.

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js 18+
- PostgreSQL (via Supabase)
- OBS Studio (for streaming tests)

### Clone the Repository
```sh
git clone https://github.com/your-username/next-video-twitch.git
cd next-video-twitch
```

### Install Dependencies
```sh
npm install
```

### Environment Variables
Create a `.env.local` file and add the required environment variables:
```env
  # Clerk
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=
  CLERK_WEBHOOK_SECRET=

  # Supabase
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=

  # Prisma
  DATABASE_URL=
  DIRECT_URL=

  # Livekit
  LIVEKIT_API_URL=
  LIVEKIT_API_KEY=
  LIVEKIT_API_SECRET=
  NEXT_PUBLIC_LIVEKIT_WS_URL=
```

### Run the Development Server
```sh
npm run dev
```

## Deployment
The app can be deployed on platforms like Vercel, Netlify, or a custom server setup.
```sh
git push origin main
vercel deploy
```
