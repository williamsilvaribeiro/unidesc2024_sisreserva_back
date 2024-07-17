/*
  Warnings:

  - You are about to alter the column `data_de_agendamento` on the `calendario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `calendario` MODIFY `data_de_agendamento` INTEGER NOT NULL;
