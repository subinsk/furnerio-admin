/*
  Warnings:

  - The `emailVerified` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN,
ALTER COLUMN "updatedAt" SET NOT NULL;
