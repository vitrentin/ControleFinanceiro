DROP DATABASE ControleFinanceiro2;
CREATE DATABASE IF NOT EXISTS ControleFinanceiro2;
USE ControleFinanceiro2;
CREATE TABLE `users` (
    `id` int auto_increment NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `transactions` (
    `id` int  auto_increment NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `transactionType` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `user_id` int NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON update current_timestamp(3),
    PRIMARY KEY (`id`),
    foreign key(`user_id`) references `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `categories` (
    `id` int auto_increment NOT NULL,
    `name` VARCHAR(191) NOT NULL,
	`user_id` int NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    foreign key(`user_id`) references `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `messages` (
    `id` int auto_increment NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
