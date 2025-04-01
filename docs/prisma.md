# ⚙️ Database Configuration for Next.js Video Streaming

This guide explains how to configure the database for a video streaming project built with Next.js. The project uses:
- 🛠️ **ORM**: Prisma (^6.5.0)
- ☁️ **Cloud Database**: Supabase
- 🐘 **Database Driver**: PostgreSQL



## 🔑 **Prerequisites**

Before proceeding, ensure you have the following ready:
1. 📝 **Supabase Account**: Sign up on [Supabase](https://supabase.io).
2. 🐘 **PostgreSQL Database**: Supabase provides a PostgreSQL database by default.
3. 📦 **Prisma CLI**: Install the Prisma CLI globally using the following command:
   ```bash
   npm install prisma
   ```

---

## 📂 **Database Configuration**

### 📜 **Step 1: Add Environment Variables**

Add the following variables to your `.env.local` or `.env.production` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Prisma
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database-name>
DIRECT_URL=postgresql://<username>:<password>@<direct-host>:<port>/<database-name>
```

- 🗂️ **DATABASE_URL**: Use the connection URL format provided by Supabase.
- 🔗 **DIRECT_URL**: Used for direct database connections.

---

### 🛠️ **Step 2: Configure Prisma**

Define your Prisma schema in the `prisma/schema.prisma` file:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id             String  @id @default(uuid())
  username       String  @unique
  imageUrl       String  @db.Text
  externalUserId String  @unique
  bio            String? @db.Text

  following  Follow[] @relation("Following")
  followedBy Follow[] @relation("FollowedBy")

  blocking  Block[] @relation("Blocking")
  blockedBy Block[] @relation("BlockedBy")

  stream Stream?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Stream {
  id                  String  @id @default(uuid())
  name                String  @db.Text
  thumbnailUrl        String? @db.Text
  ingressId           String? @unique
  serverUrl           String? @db.Text
  streamKey           String? @db.Text
  isLive              Boolean @default(false)
  isChatEnabled       Boolean @default(true)
  isChatDelayed       Boolean @default(false)
  isChatFollowersOnly Boolean @default(false)

  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([ingressId])
}

model Follow {
  id          String @id @default(uuid())
  followerId  String
  followingId String

  follower  User @relation(name: "Following", fields: [followerId], references: [id], onDelete: Cascade)
  following User @relation(name: "FollowedBy", fields: [followingId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([followerId, followingId])
  @@index([followerId])
  @@index([followingId])
}

model Block {
  id        String @id @default(uuid())
  blockerId String
  blockedId String

  blocker User @relation(name: "Blocking", fields: [blockerId], references: [id], onDelete: Cascade)
  blocked User @relation(name: "BlockedBy", fields: [blockedId], references: [id], onDelete: Cascade)

  @@unique([blockerId, blockedId])
  @@index([blockerId])
  @@index([blockedId])
}
```

---

### 📦 **Step 3: Install Dependencies**

Install Prisma and the PostgreSQL driver:

```bash
npm install prisma @prisma/client
npm install --save-dev @types/node
```

🔧 **Generate Prisma Client**:

```bash
npx prisma generate
```

---

### 🚀 **Step 4: Run Migrations**

1. **Initialize Prisma**:
   ```bash
   npx prisma init
   ```

2. **Create and Apply Database Migrations**:
   ```bash
   npx prisma migrate dev --name "your-migration-name"
   ```
   - 📂 This command creates a migration file in the `prisma/migrations/` folder.
   - 💾 The database schema in Supabase will be updated accordingly.

   *Note*: Shutdown your next app everytime you wants to do a migration or generate new schema using **npx prisma generate**

3. **Verify Your Database**:
   - Access the [Supabase Dashboard](https://app.supabase.io) to ensure the database schema has been applied correctly.

---

### 🧪 **Step 5: Test the Connection**

To confirm everything is working:
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Verify that your application interacts successfully with the database.

---

🚩 Your database is now set up and ready to use with your Next.js video streaming project. Let me know if you need documentation for other aspects! 🎉
