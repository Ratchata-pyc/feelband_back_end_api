/*
  Warnings:

  - You are about to drop the column `genre` on the `Musician` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Musician` table. All the data in the column will be lost.
  - Added the required column `genreId` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Musician` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Musician` DROP COLUMN `genre`,
    DROP COLUMN `role`,
    ADD COLUMN `genreId` INTEGER NOT NULL,
    ADD COLUMN `roleId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `role_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genre_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `genre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Musician` ADD CONSTRAINT `Musician_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role_list`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Musician` ADD CONSTRAINT `Musician_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genre_list`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
