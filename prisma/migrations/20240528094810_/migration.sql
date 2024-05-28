-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cheklist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cheklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheklistItem" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "cheklistId" INTEGER NOT NULL,

    CONSTRAINT "CheklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Cheklist" ADD CONSTRAINT "Cheklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheklistItem" ADD CONSTRAINT "CheklistItem_cheklistId_fkey" FOREIGN KEY ("cheklistId") REFERENCES "Cheklist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
