-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 16, 2021 at 10:11 PM
-- Server version: 5.7.33-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fixrevisi`
--

-- --------------------------------------------------------

--
-- Table structure for table `address_customer`
--

CREATE TABLE `address_customer` (
  `id_address` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `address_customer`
--

INSERT INTO `address_customer` (`id_address`, `fullname`, `address`, `city`, `region`, `zip_code`, `country`, `id_user`) VALUES
(1, 'Dhiya Reksa', 'Jl. Sindoro Dalam 5 Rt.2 Rw.22', 'Pemalang', 'Jawa Tengah', '35513', 'Indonesia', 4),
(2, 'Faqih', 'Jl. Sumbodro', 'Tegal', 'Jawa Tengah', '35587', 'Indonesia', 4),
(3, 'Cek Debug', 'Jl. Lele Dumbo', 'Pemalang', 'Jawa Tengah', '32178', 'Indonesia', 4),
(4, 'Dhiyo Lagi Update', 'Jl. Nusa Indah', 'Pemalang', 'Jawa Tengah', '52341', 'Indonesia', 4),
(5, 'User Gans', 'Jl. Sumbing 7', 'Pemalang', 'Jawa Tengah', '36428', 'Indonesia', 8),
(6, 'Rizal', 'Jl. Kupang 8', 'Tegal', 'Jawa Tengah', '42421', 'Indonesia', 8),
(7, 'Paijo', 'Jl. Semangka 7 rt 2 rw 20', 'Pemlanag', 'Jawa Tengah', '23192', 'Indonesia', 8),
(8, 'Dhiyo', 'Jl. Piranha 7', 'Pemalang', 'Jawa Tengah', '452341', 'Indonesia', 9),
(9, 'Dhiya Resa', 'JL. Sindoro 5', 'Pemalang', 'Jawa Tengah', '52123', 'Indonesia', 12),
(10, 'akbar', 'Jln. Baladewa Kiri 007', 'DKI jakarta', 'Jakarta Pusat', '14045', 'Indonesia', 13),
(11, 'zulfikar', 'jln baladewa kiri no 25', 'Jakarta Pusat', 'DKI jakarta', '14045', 'home', 14),
(12, 'akbar', 'jln baladewa kiri ', 'Jakarta Pusat', 'DKI Jakarta', '10450', 'Home', 44);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id_categories` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_photo` varchar(255) NOT NULL,
  `color_hexa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_categories`, `category_name`, `category_photo`, `color_hexa`) VALUES
(4, 'Short', 'https://res.cloudinary.com/devloops7/image/upload/v1605447841/newBlanja/ShortCategory_czom62.png', '#1C3391'),
(5, 'Jacket', 'https://res.cloudinary.com/devloops7/image/upload/v1605447840/newBlanja/JacketCategory_jvjeee.png', '#F67B02'),
(9, 'T-Shirt', 'https://res.cloudinary.com/devloops7/image/upload/v1605447841/newBlanja/TshirtCategory_odymmz.png', '#CC0B04'),
(15, 'shoes', '\r\nhttps://res.cloudinary.com/devloops7/image/upload/v1605447841/newBlanja/ShoesCategory_kd4uah.png', '#57CD9E'),
(16, 'pants', 'https://res.cloudinary.com/devloops7/image/upload/v1605447840/newBlanja/PantsCategory_qz4r9h.png', '#E31F51');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `color_name` varchar(30) NOT NULL,
  `color_hexa` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color_name`, `color_hexa`) VALUES
(1, 'Blue', '#0000FF'),
(2, 'Red', '#FF0000'),
(3, 'Black', '#000000'),
(4, 'green', '#008000'),
(5, 'white', '#FFFFFF');

-- --------------------------------------------------------

--
-- Table structure for table `conditions`
--

CREATE TABLE `conditions` (
  `id` int(11) NOT NULL,
  `conditions` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `conditions`
--

INSERT INTO `conditions` (`id`, `conditions`) VALUES
(1, 'New'),
(2, 'Second');

-- --------------------------------------------------------

--
-- Table structure for table `customer_detail`
--

CREATE TABLE `customer_detail` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `gender` varchar(11) NOT NULL,
  `date_of_birth` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `id` int(11) NOT NULL,
  `level` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`id`, `level`) VALUES
(1, 'customer'),
(2, 'seller');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `transaction_code` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `seller_id` int(11) DEFAULT NULL,
  `id_address` int(11) NOT NULL,
  `status_order` set('On Process','Delivery','Delivered') NOT NULL DEFAULT 'On Process',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `transaction_code`, `total`, `user_id`, `seller_id`, `id_address`, `status_order`, `created_at`, `updated_at`) VALUES
(71, 53529, 4500000, 13, 16, 10, 'On Process', '2021-02-15 10:13:19', '2021-02-15 10:13:19'),
(72, 9013, 450000, 14, 16, 11, 'On Process', '2021-02-15 10:22:03', '2021-02-15 10:22:03'),
(73, 1861, 450000, 13, 16, 10, 'On Process', '2021-02-15 11:42:43', '2021-02-15 11:42:43'),
(74, 36796, 150000, 13, 16, 10, 'On Process', '2021-02-15 19:24:31', '2021-02-15 19:24:31'),
(75, 12057, 1400000, 13, 16, 10, 'On Process', '2021-02-15 19:42:30', '2021-02-15 19:42:30'),
(76, 22146, 300000, 14, 16, 11, 'On Process', '2021-02-15 22:03:54', '2021-02-15 22:03:54'),
(77, 64146, 4500000, 14, 16, 11, 'On Process', '2021-02-15 22:25:59', '2021-02-15 22:25:59'),
(78, 57296, 955500, 44, 15, 12, 'On Process', '2021-02-16 21:26:19', '2021-02-16 21:26:19'),
(79, 18223, 700000, 13, 16, 10, 'On Process', '2021-02-16 22:07:48', '2021-02-16 22:07:48');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `sub_total_item` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`order_id`, `product_id`, `product_qty`, `sub_total_item`) VALUES
(22, 1, 2, 6000),
(22, 2, 3, 15000),
(23, 7, 5, 35000),
(23, 2, 3, 15000),
(23, 10, 3, 30000),
(24, 9, 5, 35000),
(24, 2, 3, 15000),
(25, 44, 1, 550000),
(26, 36, 5, 400000),
(27, 33, 2, 360000),
(28, 30, 1, 150000),
(29, 30, 1, 150000),
(30, 30, 1, 150000),
(31, 30, 1, 150000),
(32, 32, 5, 100000),
(33, 36, 3, 240000),
(34, 36, 3, 240000),
(34, 33, 2, 360000),
(35, 30, 3, 450000),
(36, 36, 1, 80000),
(37, 36, 1, 80000),
(38, 32, 1, 20000),
(39, 36, 2, 160000),
(40, 37, 1, 80000),
(41, 35, 1, 80000),
(42, 31, 2, 240000),
(43, 33, 1, 180000),
(44, 33, 1, 180000),
(45, 42, 4, 400000),
(46, 33, 3, 540000),
(47, 30, 3, 450000),
(48, 35, 2, 160000),
(49, 30, 2, 300000),
(49, 35, 2, 160000),
(50, 43, 2, 400000),
(50, 33, 2, 360000),
(51, 32, 5, 100000),
(51, 35, 3, 240000),
(52, 30, 2, 300000),
(52, 33, 3, 540000),
(53, 44, 3, 1350000),
(54, 33, 5, 900000),
(54, 30, 3, 450000),
(55, 31, 1, 120000),
(56, 36, 3, 240000),
(57, 31, 2, 6000),
(57, 32, 3, 15000),
(58, 31, 2, 6000),
(58, 32, 3, 15000),
(59, 31, 2, 240000),
(59, 37, 3, 240000),
(60, 37, 1, 80000),
(61, 31, 5, 600000),
(61, 37, 3, 240000),
(61, 38, 4, 320000),
(62, 31, 3, 360000),
(63, 1, 2, 6000),
(63, 2, 3, 15000),
(64, 1, 2, 6000),
(64, 2, 3, 15000),
(65, 31, 2, 6000),
(65, 32, 3, 15000),
(66, 31, 2, 6000),
(66, 32, 3, 15000),
(67, 68, 2, 200000),
(67, 31, 1, 120000),
(68, 31, 2, 240000),
(69, 31, 1, 120000),
(70, 70, 1, 1000000),
(71, 91, 3, 4500000),
(72, 92, 3, 450000),
(73, 92, 3, 450000),
(74, 90, 3, 150000),
(75, 94, 2, 700000),
(75, 93, 2, 700000),
(76, 92, 2, 300000),
(77, 91, 3, 4500000),
(78, 96, 3, 955500),
(79, 93, 2, 700000);

-- --------------------------------------------------------

--
-- Table structure for table `otp_reset`
--

CREATE TABLE `otp_reset` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `condition_id` int(11) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `product_desc` text NOT NULL,
  `product_photo` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `status_product_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `category_id`, `condition_id`, `product_price`, `product_qty`, `product_desc`, `product_photo`, `user_id`, `status_product_id`, `created_at`, `updated_at`) VALUES
(85, 'H&M', 16, 1, 450000, 50, 'Jeans 5 saku dengan denim katun washed dengan ukuran santai dengan zip fly dan kancing, serta kaki meruncing. Jeans tersebut sebagian dibuat dari kapas daur ulang.', '[\"/image/1613217289625-image.png \",\"/image/1613217289635-image.png \",\"/image/1613217289643-image.png \"]', 15, 1, '2021-02-13 18:54:49', '2021-02-16 21:13:23'),
(86, 'H&M', 16, 1, 450000, 50, 'Jeans 5 saku dengan denim katun washed dengan ukuran santai dengan zip fly dan kancing, serta kaki meruncing. Jeans tersebut sebagian dibuat dari kapas daur ulang.', '[\"/image/1613217292923-image.png \",\"/image/1613217292932-image.png \",\"/image/1613217292947-image.png \"]', 15, 1, '2021-02-13 18:54:52', '2021-02-16 21:13:23'),
(90, 'Billabong', 4, 1, 50000, 5, 'Pria cenderung memiliki aktifitas fisik yang lebih tinggi dibandingkan wanita. Pria yang cenderung suka bergerak dan melakukan kegiatan fisik harus didukung oleh busana yang sesuai. Salah satu busana pendukung gerak dan aktifitas tinggi kaum adam ini adalah Celana Boxer Pria. Celana Boxer ini dibuat dari bahan Cotton combed yg sangan lembut adem dan nyaman serta di perindah dengan sablon Fullprint.', '[\"/image/1613219906426-image.png \",\"/image/1613219906428-image.png \",\"/image/1613219906429-image.png \"]', 16, 1, '2021-02-13 19:38:26', '2021-02-16 21:13:23'),
(91, 'Levi\'s', 5, 1, 1500000, 6, 'Warisan denim klasik kami berpadu dengan desain yang berfokus pada masa depan. Membangun etos dari Levi\'s® Red Collection asli - diperkenalkan pada akhir tahun 90-an - kami bertujuan untuk menemukan kembali jeans 5 saku yang ikonik. Detail pakaian kerja yang menarik , kain berkelanjutan, dan bentuk modern menciptakan sesuatu yang benar-benar baru namun tidak salah lagi Levi\'s®. Jaket Trucker membuat pakaian - dan gayanya bertahan melampaui musim dan tren. Dimaksudkan untuk dipakai selamanya, di mana pun, kapan pun, Anda akan kesulitan menemukan jaket dengan bentuk yang lebih mudah , desain yang lebih serbaguna atau rasa sejuk yang melekat. Kami menata ulang Jaket paling ikonik kami dengan jahitan off-kilter, kantong dalam , dan bagian belakang yang terbuat dari tembaga. Kami membuat jaket ini dengan kapas rami', '[\"/image/1613220190001-image.png \",\"/image/1613220190007-image.png \",\"/image/1613220190009-image.png \"]', 16, 1, '2021-02-13 19:43:10', '2021-02-16 21:13:23'),
(92, 'Thanksinsomnia', 9, 1, 150000, 7, 'Regular fit short sleeve t-shirt with plastisol screenprinted.\n\nmaterial : american cotton\nsize chart (before wash)\nS : Height 70 - width 53 - SL 23 cm\nM : Height 72 - width 55 - SL 24 cm', '[\"/image/1613220367462-image.png \",\"/image/1613220367465-image.png \",\"/image/1613220367467-image.png \"]', 16, 1, '2021-02-13 19:46:07', '2021-02-16 21:13:23'),
(93, 'Compass Gazzelle', 15, 1, 350000, 6, 'Siluet pertama sepatu Compass terlahir kembali pada 2018. Gazelle Low dirancang dengan sentuhan vintage klasik yang dipadukan dengan detail modern yang relevan. Potongan rendah menekankan gaya santai dan kasual. Logo samping itu diwariskan dari tahun 1988, terinspirasi dari binatang Gazelle yang sedang berlari.', '[\"/image/1613220524550-image.jpeg \",\"/image/1613220524552-image.jpeg \",\"/image/1613220524553-image.jpeg \"]', 16, 1, '2021-02-13 19:48:44', '2021-02-16 21:13:23'),
(94, 'H&M', 16, 1, 350000, 6, 'Sebuah klasik taper dibuat untuk gaya setiap hari. Dibuat dengan ruang ekstra untuk kenyamanan. Sebuah alternatif modern untuk jeans lurus.', '[\"/image/1613220697001-image.png \",\"/image/1613220697004-image.png \",\"/image/1613220697008-image.png \"]', 16, 1, '2021-02-13 19:51:37', '2021-02-16 21:13:23'),
(95, 'Converse', 15, 1, 550000, 5, 'Warna musim panas. Sejak debutnya yang luar biasa pada tahun 1974, sepatu One Star kemudian diadopsi dan dimiliki oleh para independen. Kami telah mengoptimalkan edisi tahun 90-an yang berani dengan kanvas yang dicuci, detail bintang yang tertekan, aksen plat karet tembus pandang, dan insole OrthoLite untuk bantalan lengkap di bawah kaki. Legenda tetap segar selama musim panas.', '[\"/image/1613399978639-image.png \",\"/image/1613399978671-image.png \",\"/image/1613399978673-image.png \"]', 15, 3, '2021-02-15 21:39:38', '2021-02-16 21:13:23'),
(96, 'Vans', 9, 1, 318500, 4, 'Kaos Kotak Cetak Klasik adalah kaos katun ringspun yang lebih berat 100% carded dengan lengan pendek dan grafik kotak depan yang diisi dengan motif bunga.', '[\"/image/1613400612003-image.png \",\"/image/1613400612008-image.png \",\"/image/1613400612025-image.png \"]', 15, 3, '2021-02-15 21:50:12', '2021-02-16 21:10:01'),
(97, 'Vans Wall', 15, 1, 25000000, 3, 'Bandana Sk8-Hi memadukan atasan bertali Vans yang legendaris dengan suede kokoh dan bagian atas kanvas dengan motif tengkorak bandana. Ini juga termasuk penutup kaki yang diperkuat untuk menahan keausan berulang, kerah empuk untuk penyangga dan fleksibilitas, dan outsoles wafel karet khas.', '[\"/image/1613487030830-image.png\",\"/image/1613487030833-image.png\",\"/image/1613487030838-image.png\"]', 15, 3, '2021-02-16 15:42:58', '2021-02-16 21:50:31');

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE `product_colors` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_colors`
--

INSERT INTO `product_colors` (`id`, `product_id`, `color_id`) VALUES
(1, 31, 1),
(2, 31, 2),
(4, 37, 1),
(5, 38, 1),
(6, 39, 1),
(7, 39, 2),
(8, 44, 1),
(9, 44, 2),
(10, 46, 1),
(11, 46, 2),
(12, 50, 1),
(13, 50, 2),
(14, 68, 1),
(15, 68, 2),
(16, 70, 1),
(17, 70, 2),
(18, 71, 1),
(19, 71, 2),
(20, 72, 1),
(21, 72, 2),
(22, 73, 1),
(23, 73, 2),
(52, 85, 3),
(53, 85, 1),
(54, 86, 3),
(55, 86, 1),
(62, 90, 1),
(63, 90, 2),
(64, 91, 1),
(65, 91, 3),
(66, 92, 1),
(67, 92, 5),
(68, 93, 1),
(69, 93, 3),
(70, 93, 4),
(71, 94, 1),
(72, 94, 4),
(73, 95, 1),
(74, 95, 2),
(75, 95, 3),
(76, 96, 1),
(77, 96, 2),
(78, 96, 5),
(94, 97, 1),
(95, 97, 2);

-- --------------------------------------------------------

--
-- Table structure for table `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_sizes`
--

INSERT INTO `product_sizes` (`id`, `product_id`, `size_id`) VALUES
(1, 31, 3),
(2, 31, 4),
(4, 37, 4),
(5, 39, 1),
(6, 39, 2),
(7, 38, 2),
(8, 44, 1),
(9, 44, 2),
(10, 46, 1),
(11, 46, 2),
(12, 50, 1),
(13, 50, 2),
(14, 68, 2),
(15, 68, 3),
(16, 68, 4),
(17, 68, 5),
(18, 70, 6),
(19, 70, 7),
(20, 71, 1),
(21, 71, 4),
(22, 71, 5),
(23, 72, 5),
(24, 72, 6),
(25, 73, 1),
(26, 73, 2),
(55, 85, 10),
(56, 85, 11),
(57, 86, 10),
(58, 86, 11),
(65, 90, 1),
(66, 90, 12),
(67, 91, 3),
(68, 91, 4),
(69, 92, 2),
(70, 92, 3),
(71, 93, 11),
(72, 93, 12),
(73, 94, 11),
(74, 94, 12),
(75, 95, 10),
(76, 95, 11),
(77, 95, 12),
(78, 96, 1),
(79, 96, 2),
(80, 96, 3),
(93, 97, 1),
(94, 97, 2);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `product_id`, `rating`) VALUES
(83, 85, 4),
(84, 86, 3),
(85, 90, 5),
(86, 91, 3),
(87, 92, 3),
(88, 93, 4),
(89, 94, 2);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `user_id`, `review`) VALUES
(1, 30, 8, 'Barangnya bagus,, sesuai pesanan'),
(2, 30, 4, 'Barangnya keren, sesuai pesanan'),
(3, 34, 9, 'Barangnya keren, sesuai pesanan'),
(4, 32, 9, 'Barangnya keren, sesuai pesanan'),
(5, 31, 9, 'Barangnya keren, sesuai pesanan'),
(6, 35, 9, 'Barangnya keren, sesuai pesanan'),
(7, 72, 9, 'Barangnya keren, sesuai pesanan'),
(8, 71, 9, 'Barangnya keren, sesuai pesanan');

-- --------------------------------------------------------

--
-- Table structure for table `seller_detail`
--

CREATE TABLE `seller_detail` (
  `id` int(11) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `store_desc` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `size` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `size`) VALUES
(1, 'XS'),
(2, 'S'),
(3, 'M'),
(4, 'L'),
(5, 'XL'),
(6, 'XXL'),
(7, 'XXXL'),
(8, '28'),
(9, '29'),
(10, '30'),
(11, '31'),
(12, '32');

-- --------------------------------------------------------

--
-- Table structure for table `status_history`
--

CREATE TABLE `status_history` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status_history`
--

INSERT INTO `status_history` (`id`, `name`) VALUES
(1, 'On Process'),
(2, 'Delivery'),
(3, 'Finish');

-- --------------------------------------------------------

--
-- Table structure for table `status_product`
--

CREATE TABLE `status_product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status_product`
--

INSERT INTO `status_product` (`id`, `name`) VALUES
(1, 'sold out'),
(2, 'archived'),
(3, 'ready');

-- --------------------------------------------------------

--
-- Table structure for table `token_whitelist`
--

CREATE TABLE `token_whitelist` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `token_whitelist`
--

INSERT INTO `token_whitelist` (`id`, `token`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjksImVtYWlsIjoidGhpbmtwYWRAZ21haWwuY29tIiwiaWF0IjoxNjExNjAxOTQ3fQ.QkIwr7zWNA4ppjDPuSHBBsWNTv5Fq1M1u1jDpPheE_k'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjcsImVtYWlsIjoicGVuanVhbEBnbWFpbC5jb20iLCJpYXQiOjE2MTE2MDM4NjZ9.XyDvxcj41llps3x83HEl9SleRQZER2XaufgmVwVB4FM'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjksImVtYWlsIjoidGhpbmtwYWRAZ21haWwuY29tIiwiaWF0IjoxNjExNjA1OTY4fQ.uV_6rS8N1sFTYfg8_mGpTl01v0D4eX9M6BqZSXkt4LY'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjgsImVtYWlsIjoidXNlcmJhcnVAZ21haWwuY29tIiwiaWF0IjoxNjExNjA5ODM3fQ.3q6kl9pNfMPgRA_SAdB3wTT_kTsasHPYybfl_5yXUCw'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjQsImVtYWlsIjoiZGhpeW9kZXY3QGdtYWlsLmNvbSIsImlhdCI6MTYxMTYwOTg3Mn0.7QUKcPJEDWxAJs7L3AnB_EdPuhrxQpE0P-PuCp_-gLE'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjgsImVtYWlsIjoidXNlcmJhcnVAZ21haWwuY29tIiwiaWF0IjoxNjExNzEzNDIzfQ.QfXA7rdT-sLW3KKwNTkKW6pBwmIPu9rv5ujE1k1ectk'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjgsImVtYWlsIjoidXNlcmJhcnVAZ21haWwuY29tIiwiaWF0IjoxNjExNzE5NzA3fQ.iUw9SHyaFNeQiZ9rVdQ-nPPkOzzHgQsnO4eG6hin_6k'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjYsImVtYWlsIjoic2VsbGVyQGdtYWlsLmNvbSIsImlhdCI6MTYxMTc3MjQ3M30.-7yor0w2ZE7gRlXsbtU_4iTLTLhqHp0V12NHS_psNwQ'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjgsImVtYWlsIjoidXNlcmJhcnVAZ21haWwuY29tIiwiaWF0IjoxNjExNzg3MTgzfQ.1tkWYzAevCs2IwIj09uuInznpqToLTGPg9G3nc84XQg'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjgsImVtYWlsIjoidXNlcmJhcnVAZ21haWwuY29tIiwiaWF0IjoxNjExNzk5MjA5fQ.EYUJKvs-KMeK2EkJzzq2y6wgCZPNqirBNDYJdkZvkW0'),
(24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjgsImVtYWlsIjoidXNlcmJhcnVAZ21haWwuY29tIiwiaWF0IjoxNjExNzk5NTg2fQ.FoIW8qp_Ye9Id4Uj4BETJzocfaUK47mioVwt-jgpnOA'),
(26, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjcsImVtYWlsIjoicGVuanVhbEBnbWFpbC5jb20iLCJpYXQiOjE2MTE4MDA1NDh9.V1JnlT3ZR9BYVUeJFUCd8jsSiAyS74XtcyI9lYYQAFE'),
(27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjExLCJlbWFpbCI6ImFya2FkZW15QGdtYWlsLmNvbSIsImlhdCI6MTYxMTgxMzY0NX0.TBXW1hA23afqxO9EXGZHYAbEyuaq5ejwiKSKleZaFrY'),
(32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjcsImVtYWlsIjoicGVuanVhbEBnbWFpbC5jb20iLCJpYXQiOjE2MTE4MTczMjJ9.MCLmeduww2iPHx8OGdGExA1nBzZ0FmLPvebvH-BzA8U'),
(45, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjQsImVtYWlsIjoiZGhpeW9kZXY3QGdtYWlsLmNvbSIsImlhdCI6MTYxMTg5OTY2NH0.RaER1uxrr8GAl7ECJUkVMzPIfuw_no47QpylFWrb5s4'),
(46, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjcsImVtYWlsIjoicGVuanVhbEBnbWFpbC5jb20iLCJpYXQiOjE2MTE5MzEwMjZ9.8bJsT09KRvDTv2jb7IUFpA0NFw85-ch9aWNEYoGh2Z8'),
(47, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjEzLCJlbWFpbCI6ImFrYmFyLnp1bDczQGdtYWlsLmNvbSIsImlhdCI6MTYxMjY3MTAyMX0.t2EGpUSzsij-WyG9TG083ZqVkocF-6V1v0y-RapDxsQ'),
(48, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjEzLCJlbWFpbCI6ImFrYmFyLnp1bDczQGdtYWlsLmNvbSIsImlhdCI6MTYxMjY3OTgxOH0.IwFSD3A3lv_HB9g2DMp8XHBPPHTh11w6a-Y1Ok_tvFs'),
(49, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjEzLCJlbWFpbCI6ImFrYmFyLnp1bDczQGdtYWlsLmNvbSIsImlhdCI6MTYxMjY3OTkyOX0.QHSAzsZqqgIsDNxcO2gI6N9epghntESFO234zcemGus'),
(50, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjEzLCJlbWFpbCI6ImFrYmFyLnp1bDczQGdtYWlsLmNvbSIsImlhdCI6MTYxMjc2MzE1OX0.OH5a9ekGcthZJZLpgo8Q5YU94qSohFeTLHbXxvyJ4Sg'),
(51, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjE0LCJlbWFpbCI6ImFrYmFyQGdtYWlsLmNvbSIsImlhdCI6MTYxMjc2NzM2OH0.k28-vWAM6rK5H5y3q9QJdLciQvwcpQlRkkZFVik2CMA'),
(52, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjE1LCJlbWFpbCI6ImhhZW1haGUzQGdtYWlsLmNvbSIsImlhdCI6MTYxMjc5MDczMX0.vcRkgVAe-7qDV9DFYdUphT8c1ZW6XIX2Hk-cQhDy8OI'),
(53, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjE1LCJlbWFpbCI6ImhhZW1haGUzQGdtYWlsLmNvbSIsImlhdCI6MTYxMjc5MTc4Nn0.1tyg6pn_Eu2gIa3Qfy4ubg4FZVygO0t4BZel8Hdl4Qw'),
(62, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjEzLCJlbWFpbCI6ImFrYmFyLnp1bDczQGdtYWlsLmNvbSIsImlhdCI6MTYxMjg4NTYyNH0.JJVHffxgTzMEoty4TyOvX9cslRa3j-yNTDfjXNkSZg4'),
(63, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjEzLCJlbWFpbCI6ImFrYmFyLnp1bDczQGdtYWlsLmNvbSIsImlhdCI6MTYxMjg4NTY4NX0.5mKKHxGrVAfVH79DZMG8qQONLzN2RbhhYsCoUh07CIY'),
(65, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjEzLCJlbWFpbCI6ImFrYmFyLnp1bDczQGdtYWlsLmNvbSIsImlhdCI6MTYxMjg4NjUyOX0.bqD60_brbbDu9VhricoDsKCLesG2hS1yOWaIkt2VR0s'),
(66, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjE1LCJlbWFpbCI6ImhhZW1haGUzQGdtYWlsLmNvbSIsImlhdCI6MTYxMjkyNDc1NX0.vLJMEiuq4xb1mmLb1SK8cYGObU0QuwkdBnSqYueTt6Q'),
(84, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjEzLCJlbWFpbCI6ImFrYmFyLnp1bDczQGdtYWlsLmNvbSIsImlhdCI6MTYxMjk1MzM5NX0.lPL_dEiAMRAkQgvRSPS0IxD-PUJpj8G5zEhuHj5etpc'),
(86, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjE1LCJlbWFpbCI6ImhhZW1haGUzQGdtYWlsLmNvbSIsImlhdCI6MTYxMzIwNzI1OX0.Fg_kHH-aDWF6qLA2EauytdMp0SW6CJSlWYzE8X0gBJ0'),
(93, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjE1LCJlbWFpbCI6ImhhZW1haGUzQGdtYWlsLmNvbSIsImlhdCI6MTYxMzIxMjc3N30.8Tjz94k5qp7ZISn_oc4M7ncle18V73mR5lg2LCB_kyc'),
(95, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MiwiaWQiOjE2LCJlbWFpbCI6ImFrYmFyenVsODk2QGdtYWlsLmNvbSIsImlhdCI6MTYxMzIxOTczMn0.bLdpqAwKdyXK4CT-5Ev_uyLKyXGFABUE7u_2qp2nMy8'),
(106, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbF9pZCI6MSwiaWQiOjQ0LCJlbWFpbCI6ImhhZW1haGU0QGdtYWlsLmNvbSIsImlhdCI6MTYxMzM3NjY2OX0.tjKyZX_yNkbRG_MojUt446DoumBU9BcLPsMN5hILtQw');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `full_name`, `email`, `password`, `level_id`) VALUES
(13, 'akbar', 'akbar zul', 'akbar.zul73@gmail.com', '$2b$10$a5l0IytropL4izY29OWvweHC72ScgfCi.yDnD.G7SHyqlaXyKMVeS', 1),
(14, 'Akbarzul', 'akbar gans', 'akbar@gmail.com', '$2b$10$XKLPfpLNRsR5JbjtK31zLuU7fkLb5m2bangnAMKtVQ3rOPRDKCYCe', 1),
(15, 'akbar', 'akbar zul', 'haemahe3@gmail.com', '$2b$10$fbU2ZJwEPYF8nbEhEY2.eucZ6eyREfXJ/m/j8AyuwijJIScit5GMG', 2),
(16, 'akbar zul', 'Barzul', 'akbarzul896@gmail.com', '$2b$04$4q8PEmLVevSxz90h/ifEfeQAmjjZW1eVU3B6hqHmlBwL5EJpYUzey', 2),
(41, 'akbarzulfikar98', 'gansStore', 'cobadoang@gmail.com', '$2b$10$Y4FGFSST6Fzep0.YdjWKlOTM/Z1uXbkxa1E.Dz1wdrhkBkLR0waTO', 2),
(42, 'akbarzulfikar98', 'gans', 'a@gmail.com', '$2b$10$XzLcw55p/.NkZtWaah65euKfenwlMhbMTYcWmnbYWiUy3a6.cnlvq', 2),
(43, '30035', 'asasas', 'tawiarachaerunisah@gmail.com', '$2b$10$NO3h9fIW.A.sLeNqUUKJIuhaZYxypZhQAMaB6i2kCCzKklfmRRADS', 2),
(44, 'zulfikar', 'akbar zulfikar', 'haemahe4@gmail.com', '$2b$10$VZuVgjaGIcjVCcASNiddIOHbE/.KcU.tMNGAOhQkqki.X0YX5Iy8q', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address_customer`
--
ALTER TABLE `address_customer`
  ADD PRIMARY KEY (`id_address`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_categories`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conditions`
--
ALTER TABLE `conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_detail`
--
ALTER TABLE `customer_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otp_reset`
--
ALTER TABLE `otp_reset`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seller_detail`
--
ALTER TABLE `seller_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status_history`
--
ALTER TABLE `status_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status_product`
--
ALTER TABLE `status_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `token_whitelist`
--
ALTER TABLE `token_whitelist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address_customer`
--
ALTER TABLE `address_customer`
  MODIFY `id_address` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_categories` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `conditions`
--
ALTER TABLE `conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `customer_detail`
--
ALTER TABLE `customer_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT for table `otp_reset`
--
ALTER TABLE `otp_reset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;
--
-- AUTO_INCREMENT for table `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `seller_detail`
--
ALTER TABLE `seller_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `status_history`
--
ALTER TABLE `status_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `status_product`
--
ALTER TABLE `status_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `token_whitelist`
--
ALTER TABLE `token_whitelist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
