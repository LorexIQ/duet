/*
  Warnings:

  - A unique constraint covering the columns `[deviceUID]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceUID` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "deviceUID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_deviceUID_key" ON "Session"("deviceUID");
