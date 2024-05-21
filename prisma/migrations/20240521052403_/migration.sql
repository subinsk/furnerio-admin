-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email_verified" DROP DEFAULT,
ALTER COLUMN "email_verified" SET DATA TYPE TEXT;
