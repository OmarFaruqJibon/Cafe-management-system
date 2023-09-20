-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2023 at 06:10 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cafe_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `id` int(11) NOT NULL,
  `uuid` varchar(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` varchar(20) NOT NULL,
  `paymentMethod` varchar(50) NOT NULL,
  `total` int(11) NOT NULL,
  `productDetails` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`productDetails`)),
  `createdBy` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`id`, `uuid`, `name`, `email`, `contactNumber`, `paymentMethod`, `total`, `productDetails`, `createdBy`) VALUES
(2, '434685c0-4da2-11ee-a2cd-5f40a6cfbd1c', 'Jibon', 'jibon@mail.com', '1234567885', 'cash', 80, '[{\"id\":1, \"name\": \"Coffee\",  \"price\": 40,  \"total\": 80,   \"category\": \"Coffee\",  \"quantity\": \"2\"}]', 'admin@mail.com'),
(12, '7c72bce0-5128-11ee-9b57-7dcbac27524c', 'Jibon', 'jibon@mail.com', '1234565154', 'Card', 200, '[{\"id\":5,\"name\":\"Clemon\",\"category\":\"Beer\",\"quantity\":\"5\",\"price\":40,\"total\":200}]', 'admin@mail.com'),
(14, '40acc760-512c-11ee-9b57-7dcbac27524c', 'bob', 'bob@m.com', '1234567890', 'Card', 400, '[{\"id\":1,\"name\":\"CocaCola\",\"category\":\"Coffee\",\"quantity\":\"8\",\"price\":50,\"total\":400}]', 'admin@mail.com'),
(15, '1b063870-519a-11ee-ac1b-c7c843db55a9', 'fdsdfs', 'sf@sdf.com', '1234567890', 'Card', 40, '[{\"id\":5,\"name\":\"Clemon\",\"category\":\"Beer\",\"quantity\":\"1\",\"price\":40,\"total\":40}]', 'admin@mail.com'),
(16, '382fecc0-53f2-11ee-9992-8d69837192fa', 'Jibon', 'jb@mail.com', '2321346837', 'Mpesa', 90, '[{\"id\":7,\"name\":\"Due\",\"category\":\"Beer\",\"quantity\":\"1\",\"price\":50,\"total\":50},{\"id\":5,\"name\":\"Clemon\",\"category\":\"Beer\",\"quantity\":\"1\",\"price\":40,\"total\":40}]', 'admin@mail.com'),
(17, 'd3686000-56e0-11ee-8978-afad5caffcdf', 'Jibon', 'jibon@mail.com', '1234567890', 'Cash', 460, '[{\"id\":6,\"name\":\"Mojo\",\"category\":\"Beer\",\"quantity\":\"7\",\"price\":30,\"total\":210},{\"id\":7,\"name\":\"Due\",\"category\":\"Beer\",\"quantity\":\"5\",\"price\":50,\"total\":250}]', 'admin@mail.com'),
(18, '604471c0-56e2-11ee-8978-afad5caffcdf', 'fdsf', 'dssd@dss.fds', '1234567845', 'Cash', 20, '[{\"id\":4,\"name\":\"Cake\",\"category\":\"Beer\",\"quantity\":\"1\",\"price\":20,\"total\":20}]', 'admin@mail.com'),
(19, '295e6650-571b-11ee-8978-afad5caffcdf', 'sda', 'sad@dd.cds', '1234567845', 'Cash', 40, '[{\"id\":5,\"name\":\"Clemon\",\"category\":\"Beer\",\"quantity\":\"1\",\"price\":40,\"total\":40}]', 'admin@mail.com');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(2, 'Beer'),
(4, 'Cake'),
(7, 'Chips'),
(1, 'Coffee');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `categoryID`, `description`, `price`, `status`) VALUES
(1, 'CocaCola', 1, 'Drink It.', 50, 'true'),
(2, 'Corona Extra', 2, 'Corona is produced in ', 350, 'false'),
(4, 'Cake', 2, 'cake', 20, 'true'),
(5, 'Clemon', 2, 'Clemon drink', 40, 'true'),
(6, 'Mojo', 2, 'Mojo', 30, 'true'),
(7, 'Due', 2, 'Due', 50, 'true'),
(8, 'Potato', 7, 'Potato', 20, 'true'),
(9, 'Butter Cake', 4, 'Butter Cake', 30, 'true'),
(10, 'Cold Coffee', 1, 'Cold Coffee', 50, 'true');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `phone`, `email`, `password`, `status`, `role`) VALUES
(1, 'Admin', '0174218927', 'admin@mail.com', 'admin111', 'true', 'admin'),
(3, 'annie', '1234567845', 'annie@mail.com', '12345678', 'true', 'admin'),
(4, 'jibon', '1234567890', 'jibon@mail.com', '12345678', 'true', 'user'),
(5, 'Test', '1234567890', 'test@test.com', '123456', 'true', 'user'),
(6, 'New User', '1234567890', 'new@mail.com', '123456', 'true', 'user'),
(7, 'Gisha', '1234567845', 'gisha@mail.com', '123456', 'true', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
