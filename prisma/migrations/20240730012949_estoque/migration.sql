-- CreateTable
CREATE TABLE `Estoque` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `disponivel` BOOLEAN NOT NULL,
    `local_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Estoque_local_id_key`(`local_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estoque` ADD CONSTRAINT `Estoque_local_id_fkey` FOREIGN KEY (`local_id`) REFERENCES `local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
