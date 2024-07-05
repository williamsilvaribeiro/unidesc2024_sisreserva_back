/*
  Warnings:

  - You are about to drop the column `colaborador_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `colaborador` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `colaborador` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_colaborador_id_fkey`;

-- AlterTable
ALTER TABLE `colaborador` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `colaborador_id`;

-- CreateIndex
CREATE UNIQUE INDEX `colaborador_user_id_key` ON `colaborador`(`user_id`);

-- AddForeignKey
ALTER TABLE `colaborador` ADD CONSTRAINT `colaborador_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
