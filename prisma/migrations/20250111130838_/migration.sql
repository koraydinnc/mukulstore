/*
  Warnings:

  - You are about to drop the `Size` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sizes" TEXT[];

-- DropTable
DROP TABLE "Size";
