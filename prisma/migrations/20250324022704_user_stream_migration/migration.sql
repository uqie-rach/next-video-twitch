/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stream_userId_key" ON "Stream"("userId");

-- CreateIndex
CREATE INDEX "Stream_userId_idx" ON "Stream"("userId");

-- CreateIndex
CREATE INDEX "Stream_ingressId_idx" ON "Stream"("ingressId");

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
