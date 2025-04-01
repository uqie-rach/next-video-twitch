# 🎥 Next.js Video Streaming App

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![LiveKit](https://img.shields.io/badge/LiveKit-FF4088?style=for-the-badge&logo=data:image/svg+xml;base64,...)

## 📖 Table of Contents
1. [📌 Overview](#overview)
2. [🛠 Tech Stack](#tech-stack)
   - [🎨 UI Libraries](#ui-libraries)
3. [✨ Features](#features)
4. [⚙️ Installation & Setup](#installation--setup)
   - [📋 Prerequisites](#prerequisites)
   - [📂 Setups](#setups)
   - [📥 Clone the Repository](#clone-the-repository)
   - [📦 Install Dependencies](#install-dependencies)
   - [🌍 Setup Ngrok](#setup-ngrok)
   - [🔑 Environment Variables](#environment-variables)
   - [🚀 Run the Development Server](#run-the-development-server)
5. [🚢 Deployment](#deployment)
6. [📚 Additional Documentation](#additional-documentation)

## 📌 Overview
This is a modern video streaming platform built with **Next.js 15** and the **App Router**. It allows users to broadcast live using software like OBS Studio via **WHIP (WebRTC-HTTP Ingestion Protocol)** and **RTMP (Real-Time Messaging Protocol)**. Users can also watch live streams, follow other users, block unwanted users, and sign in using Google. The platform includes **real-time chat, viewer blocking, and other essential streaming controls**.

## 🛠 Tech Stack
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-2A2A2A?style=for-the-badge&logo=clerk&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![LiveKit](https://img.shields.io/badge/LiveKit-FF4088?style=for-the-badge&logo=data:image/svg+xml;base64,...)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 🎨 UI Libraries
- 🏗 **ShadCN** (UI components)
- 💬 **Sonnet** (Message popup)

## ✨ Features
- 🎬 **Live Streaming Support**: Users can stream using OBS Studio or other WHIP/RTMP-compatible software.
- 🚀 **Low-Latency WebRTC Streaming**: Powered by LiveKit for high-performance video delivery.
- 🔐 **User Authentication**: Secure sign-in with Clerk, including Google authentication.
- 🤝 **Follow & Block Users**: Users can follow others and block unwanted viewers.
- 💬 **Real-Time Chat**: Engage with audiences through live chat.
- 🛑 **Viewer Management**: Block disruptive viewers to maintain a positive streaming environment.

## ⚙️ Installation & Setup
### 📋 Prerequisites
Ensure you have the following installed:
- 📦 **Node.js 18+**
- 🛢 **PostgreSQL (via Supabase)**
- 📡 **OBS Studio (for streaming tests)**
- 🌍 **Ngrok** (for exposing local services)

### 📂 Setups
### 📥 Clone the Repository
```sh
git clone https://github.com/uqie-rach/next-video-twitch.git
cd next-video-twitch
```

### 📦 Install Dependencies
```sh
npm install
```

### 🌍 Setup Ngrok
Clerk and LiveKit webhooks require a publicly accessible URL. We use Ngrok to expose our local development server.

1. **Install Ngrok**:
   - If you haven't installed Ngrok, download it from [ngrok.com](https://ngrok.com/download) and install it.
   - Or, install via npm:
     ```sh
     npm install -g ngrok
     ```

2. **Start Ngrok**:
   ```sh
   ngrok http 3000
   ```
   This will generate a publicly accessible URL. Copy the generated URL and use it for webhooks.

3. **Update Clerk Webhooks**:
   - Don't forget to finish🎥 [LiveKit Integration](docs/livekit.md) setup
   - Go to your Clerk dashboard.
   - Add the Ngrok-generated URL to your webhook settings. bind to **_your-ngrok-url.com/api/webhooks/clerk_**

4. **Update LiveKit Webhooks**:
   - Finish the 🔐 [Authentication](docs/auth.md) setup
   - Configure LiveKit webhook URLs in your LiveKit settings. bind to **_your-ngrok-url.com/api/webhooks/livekit_**


### 🔑 Environment Variables
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

### 🚀 Run the Development Server
```sh
npm run dev
```

## 🚢 Deployment
The app can be deployed on platforms like **Vercel, Netlify, or a custom server setup**.
```sh
git push origin main
```

## 📚 Additional Documentation
For more detailed documentation, visit the `/docs/` folder:
- 📜 [API Documentation](docs/api.md)
- 🛢 [Prisma Setup](docs/prisma.md)
- 🎥 [LiveKit Integration](docs/livekit.md)
- 🔐 [Authentication](docs/auth.md)
