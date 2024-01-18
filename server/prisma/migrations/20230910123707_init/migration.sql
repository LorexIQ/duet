-- CreateTable
CREATE TABLE "drafts" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "drafts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
