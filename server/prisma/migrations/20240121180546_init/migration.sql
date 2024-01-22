-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NULL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'NULL';
