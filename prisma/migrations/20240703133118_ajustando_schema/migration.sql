/*
  Warnings:

  - You are about to drop the column `user_id` on the `colaborador` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[colaborador_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `colaborador_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `colaborador` DROP FOREIGN KEY `colaborador_user_id_fkey`;

-- AlterTable
ALTER TABLE `colaborador` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `colaborador_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_colaborador_id_key` ON `users`(`colaborador_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_colaborador_id_fkey` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
