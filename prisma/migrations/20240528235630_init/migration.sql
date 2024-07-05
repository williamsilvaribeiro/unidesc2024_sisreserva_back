/*
  Warnings:

  - You are about to drop the column `celular2` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `cor_na_agenda` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `email2` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoId` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `grupo_empresarial_id` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `mensagem` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `telefone2` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `grupo_empresarial_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `cargo` to the `colaborador` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `colaborador_enderecoId_key` ON `colaborador`;

-- DropIndex
DROP INDEX `colaborador_grupo_empresarial_id_fkey` ON `colaborador`;

-- AlterTable
ALTER TABLE `colaborador` DROP COLUMN `celular2`,
    DROP COLUMN `cor_na_agenda`,
    DROP COLUMN `email2`,
    DROP COLUMN `enderecoId`,
    DROP COLUMN `grupo_empresarial_id`,
    DROP COLUMN `mensagem`,
    DROP COLUMN `sexo`,
    DROP COLUMN `telefone2`,
    DROP COLUMN `uf`,
    ADD COLUMN `cargo` VARCHAR(191) NOT NULL,
    ADD COLUMN `curso` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `grupo_empresarial_id`;

-- CreateTable
CREATE TABLE `local` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `bloco` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
