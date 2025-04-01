# 🛡️ Setting Up Clerk in Next.js

## 📌 Overview
Clerk is a powerful authentication solution that simplifies user management in Next.js applications. This guide walks you through integrating Clerk with **Next.js 15 (App Router)**, handling authentication, and managing users.

## 🛠 Prerequisites
Before proceeding, ensure you have:
- ✅ A **Next.js 15** project set up
- ✅ A **Clerk** account ([Sign up here](https://clerk.dev/))
- ✅ Node.js 18+ installed

## 📦 Installation
Run the following command to install Clerk's SDK:

```sh
npm install @clerk/nextjs
```

## 🔑 Setting Up Environment Variables
Create a `.env.local` file in your project root and add the required Clerk keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key
CLERK_SECRET_KEY=your-secret-key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
CLERK_WEBHOOK_SECRET=your-webhook-secret
```

You can find these keys in your Clerk dashboard under **API Keys**.

## 🏗 Initializing Clerk in Next.js
### 1️⃣ Wrap Your Application with ClerkProvider
Modify `app/layout.tsx` to include `ClerkProvider`:

```tsx
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Next.js app with Clerk authentication',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### 2️⃣ Protect Routes with Middleware
Create a `middleware.ts` file to protect specific routes:

```ts
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/about'], // Routes accessible without authentication
  ignoredRoutes: ['/api/webhooks/clerk'],
});

export const config = {
  matcher: ['/:path*'],
};
```

### 3️⃣ Adding Authentication UI Components
Clerk provides built-in UI components for authentication. Add them to your pages:

#### **Sign In Page** (`app/sign-in/page.tsx`)
```tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return <SignIn />;
}
```

#### **Sign Up Page** (`app/sign-up/page.tsx`)
```tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp />;
}
```

## 🧑‍💻 Accessing User Data
You can access the authenticated user's details using Clerk hooks.

Example in `app/dashboard/page.tsx`:

```tsx
import { currentUser } from '@clerk/nextjs';

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <div>
      <h1>Welcome, {user?.firstName}</h1>
      <p>Email: {user?.emailAddresses[0].emailAddress}</p>
    </div>
  );
}
```

## 🔔 Handling Webhooks (Optional)
Clerk supports webhooks for real-time updates. Create an API route to handle them.

`app/api/webhooks/clerk/route.ts`
```ts
import { WebhookEvent, Webhook } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET!;
  const payload = await req.json();
  const header = req.headers.get('clerk-signature') || '';

  try {
    const event: WebhookEvent = Webhook.verify(secret, payload, header);
    console.log('Webhook received:', event);
  } catch (error) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Webhook received' });
}
```

## 🎉 Conclusion
You have successfully integrated Clerk authentication in your Next.js app! Users can now sign in, sign up, and manage their accounts securely.

📚 **Next Steps:**
- Customize Clerk UI components
- Implement role-based access control (RBAC)
- Secure API routes using Clerk authentication
