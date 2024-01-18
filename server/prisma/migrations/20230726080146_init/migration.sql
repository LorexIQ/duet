/*
  Warnings:

  - You are about to alter the column `sessionLifetime` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `sessionLifetime` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "sessionLifetime" SET DEFAULT 7,
ALTER COLUMN "sessionLifetime" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sessionLifetime" SET DEFAULT 7,
ALTER COLUMN "sessionLifetime" SET DATA TYPE INTEGER;
