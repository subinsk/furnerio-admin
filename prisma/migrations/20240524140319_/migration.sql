/*
  Warnings:

  - You are about to drop the column `image` on the `products` table. All the data in the column will be lost.
  - Added the required column `mrp` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_name_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "image",
ADD COLUMN     "code" TEXT,
ADD COLUMN     "content" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "mrp" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "newLabel" TEXT,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "saleLabel" TEXT,
ADD COLUMN     "subdescription" TEXT;
