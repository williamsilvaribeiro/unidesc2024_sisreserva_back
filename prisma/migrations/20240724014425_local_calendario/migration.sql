/*
  Warnings:

  - Added the required column `calendario_id` to the `local` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `calendario` ADD COLUMN `ativo` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `local` ADD COLUMN `calendario_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `local` ADD CONSTRAINT `local_calendario_id_fkey` FOREIGN KEY (`calendario_id`) REFERENCES `calendario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
