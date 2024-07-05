-- DropForeignKey
ALTER TABLE `colaborador` DROP FOREIGN KEY `colaborador_user_id_fkey`;

-- AlterTable
ALTER TABLE `colaborador` MODIFY `user_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `colaborador` ADD CONSTRAINT `colaborador_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
