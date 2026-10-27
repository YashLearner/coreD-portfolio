/*
  Warnings:

  - You are about to drop the column `status` on the `UnansweredQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UnansweredQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UnansweredQuestion" DROP COLUMN "status",
DROP COLUMN "updatedAt";
