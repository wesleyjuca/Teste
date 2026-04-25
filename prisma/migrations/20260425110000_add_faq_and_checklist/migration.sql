-- CreateEnum
CREATE TYPE "ContentLevel" AS ENUM ('FUNDAMENTOS', 'OPERACAO_DIARIA', 'CASOS_ESPECIAIS');

-- CreateTable
CREATE TABLE "FaqItem" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "level" "ContentLevel" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "editorialReviewedAt" TIMESTAMP(3) NOT NULL,
    "normativeSource" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationalChecklistItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" "ContentLevel" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "editorialReviewedAt" TIMESTAMP(3) NOT NULL,
    "normativeSource" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperationalChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FaqItem_question_key" ON "FaqItem"("question");

-- CreateIndex
CREATE UNIQUE INDEX "OperationalChecklistItem_title_key" ON "OperationalChecklistItem"("title");
