-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2024 at 05:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentalcarservice`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pick_up` varchar(255) NOT NULL,
  `drop_off` varchar(255) NOT NULL,
  `distance` int(11) NOT NULL,
  `fare` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `pick_up_date` varchar(255) NOT NULL,
  `pick_up_time` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `driver_age` text NOT NULL,
  `passengers` text NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `user_id`, `pick_up`, `drop_off`, `distance`, `fare`, `type`, `pick_up_date`, `pick_up_time`, `model`, `driver_age`, `passengers`, `created_by`, `created_at`) VALUES
(6, 5, 'Kolkata', 'Odisha', 653, 13060, 'SUV', '25-02-2024', '10:00', 'BMW_X5', '30', '8', 'Rajdeep Dutta', '2024-02-13 10:23:46');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `car_id` int(11) NOT NULL,
  `car_image` varchar(100) NOT NULL,
  `model` varchar(50) NOT NULL,
  `license_no` varchar(50) NOT NULL,
  `capacity` int(2) NOT NULL,
  `type` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `fare` bigint(20) NOT NULL,
  `is_delete` int(1) NOT NULL COMMENT '0-> car not deleted, 1-> car deleted',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_on` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`car_id`, `car_image`, `model`, `license_no`, `capacity`, `type`, `color`, `fare`, `is_delete`, `created_at`, `modified_on`) VALUES
(19, 'images\\car_image_1707661966062.png', 'BMW_X1', 'WB0420240012024', 4, 'SUV', 'blue', 20, 0, '2024-02-09 12:23:20', 1707661966109);

-- --------------------------------------------------------

--
-- Table structure for table `car_images`
--

CREATE TABLE `car_images` (
  `car_image_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `path` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_on` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_images`
--

INSERT INTO `car_images` (`car_image_id`, `car_id`, `path`, `created_at`, `modified_on`) VALUES
(1, 19, 'images\\car_image_1707661966069.webp', '2024-02-09 12:23:20', 1707661966149);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `password` text NOT NULL,
  `role` int(1) NOT NULL COMMENT '1->User,2->Driver,3->Admin',
  `is_delete` int(1) NOT NULL COMMENT '0-> not deleted, 1-> deleted',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_on` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `phone`, `password`, `role`, `is_delete`, `created_at`, `modified_on`) VALUES
(5, 'Rajdeep Dutta', 'dutta10rajdeep@gmail.com', '9163426071', '$2b$10$rUmMSoRnOE7AvGmKjoneLezt12ipJ8zjRVhcHa.U20D6iFEe9EW96', 1, 0, '2024-01-13 17:38:50', 0),
(6, 'Rajdeep Dutta', 'rajdeepdutta1710@gmail.com', '6290177617', '$2b$10$koCbE2KlA6vpJjjF/hLPt.E5Z8eAA0ZcivUenDdFcejUoWhiziSjO', 1, 0, '2024-01-13 18:23:02', 0),
(7, 'Rajdeep Dutta', 'rajdeep1710@gmail.com', '9836952191', '$2b$10$tVgfVmMKUjmbACfhz5tgnOYV6AlVInG51TRMcjCaumahI7j/XfIs.', 3, 0, '2024-01-13 18:24:24', 0),
(8, 'Lewis Hamilton', 'lewishamilton@gmail.com', '2122132142', '$2b$10$OdZehqa9IXWHsw7Rc3JSHOkB/55cAfPFvx7XqEEHampgoaDGY0CoG', 2, 0, '2024-01-13 19:09:24', 0),
(10, 'Rein McRaj', 'reinmcraj@gmail.com', '0123456789', '$2b$10$ET.xsuZFmteJKTbTvWRl4O/HQZ4pLbS22pckF4kxH/vOTaAaS6jqK', 1, 0, '2024-01-18 19:40:40', 0),
(11, 'Rein McRaj', 'rein@gmail.com', '0123456798', '$2b$10$cWDPa6qNRpjHwjqYKu5JweNYMogyrlqoPgutol8nlUBe8MC4O2HTq', 1, 0, '2024-01-18 19:44:54', 0),
(12, 'John Cena', 'johncena@wwe.com', '5121341341', '$2b$10$BNQgC9Scu8hFzto6Bene.uSzTHP/QNI.xgQeok/UIm0NuztQ/wtzu', 1, 0, '2024-01-19 12:21:26', 0),
(14, 'Ryan McLaren', 'ryanmclaren17@driver.com', '1231231235', '$2b$10$8HREosMBQZzrFPaRWJ.nYOPArKcYRugkIxjSVZ/XrE0o32L/Fr1PC', 2, 1, '2024-01-20 19:27:30', 1706025597645);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`car_id`);

--
-- Indexes for table `car_images`
--
ALTER TABLE `car_images`
  ADD PRIMARY KEY (`car_image_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `car_images`
--
ALTER TABLE `car_images`
  MODIFY `car_image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
