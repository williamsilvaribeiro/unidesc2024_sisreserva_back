-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `grupo_empresarial_id` VARCHAR(191) NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `colaborador_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_colaborador_id_key`(`colaborador_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(500) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ativo` BOOLEAN NOT NULL DEFAULT true,

    INDEX `sessions_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colaborador` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `data_nascimento` VARCHAR(191) NOT NULL DEFAULT '',
    `sexo` CHAR(1) NOT NULL DEFAULT '',
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `uf` VARCHAR(191) NOT NULL DEFAULT '',
    `telefone` VARCHAR(191) NOT NULL DEFAULT '',
    `telefone2` VARCHAR(191) NOT NULL DEFAULT '',
    `celular` VARCHAR(191) NOT NULL DEFAULT '',
    `celular2` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `email2` VARCHAR(191) NOT NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mensagem` VARCHAR(191) NOT NULL DEFAULT '',
    `grupo_empresarial_id` VARCHAR(191) NOT NULL,
    `enderecoId` VARCHAR(191) NOT NULL,
    `cor_na_agenda` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `colaborador_cpf_key`(`cpf`),
    UNIQUE INDEX `colaborador_enderecoId_key`(`enderecoId`),
    INDEX `colaborador_cpf_nome_ativo_idx`(`cpf`, `nome`, `ativo`),
    INDEX `colaborador_grupo_empresarial_id_fkey`(`grupo_empresarial_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_colaborador_id_fkey` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
