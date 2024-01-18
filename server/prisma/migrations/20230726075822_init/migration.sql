/*
  Warnings:

  - Made the column `sessionLifetime` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sessionLifetime` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "sessionLifetime" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sessionLifetime" SET NOT NULL;
