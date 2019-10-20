-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Okt 2019 pada 15.33
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id_categories` int(11) NOT NULL,
  `Categories` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id_categories`, `Categories`) VALUES
(667, 'Tshirt '),
(668, 'Long Pants'),
(669, 'Jacket'),
(671, 'Shirt Updated');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_order`
--

CREATE TABLE `detail_order` (
  `id_detail_order` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `sub_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `detail_order`
--

INSERT INTO `detail_order` (`id_detail_order`, `id_order`, `id_product`, `qty`, `sub_total`) VALUES
(207, 206, 4, 12, 20),
(208, 206, 5, 10, 50),
(209, 207, 4, 5, 20),
(210, 207, 5, 3, 50),
(211, 208, 4, 5, 20),
(212, 208, 5, 3, 50),
(213, 209, 4, 5, 20),
(214, 209, 5, 3, 50),
(215, 210, 4, 5, 20),
(216, 210, 5, 3, 50),
(217, 211, 4, 5, 200),
(218, 211, 5, 3, 50),
(219, 212, 4, 5, 200),
(220, 212, 5, 3, 50),
(221, 213, 4, 5, 20000),
(222, 213, 5, 3, 50),
(223, 214, 4, 5, 20),
(224, 214, 5, 3, 50);

--
-- Trigger `detail_order`
--
DELIMITER $$
CREATE TRIGGER `TG_UPDATEQTY_PRODUCTS` AFTER INSERT ON `detail_order` FOR EACH ROW BEGIN
 UPDATE products SET quantity=quantity-NEW.qty
 WHERE id_product=NEW.id_product;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `order`
--

CREATE TABLE `order` (
  `id_order` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `order`
--

INSERT INTO `order` (`id_order`, `date_added`, `total`) VALUES
(206, '2019-10-18 15:45:24', 200),
(207, '2019-10-18 18:39:08', 200),
(208, '2019-10-19 01:21:57', 666),
(209, '2019-10-19 05:08:24', 666),
(210, '2019-10-19 16:01:55', 666),
(211, '2019-10-19 16:02:05', 666),
(212, '2019-10-19 16:02:12', 666),
(213, '2019-10-19 16:02:20', 666),
(214, '2019-10-20 12:47:26', 666);

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `name` varchar(35) NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `id_categories` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id_product`, `name`, `description`, `image`, `id_categories`, `price`, `date_added`, `date_updated`, `quantity`) VALUES
(4, 'Tshirt What For', 'Color : Navy\r\nMaterial : Cotton', 'https://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/WOe4k54dKu9MSL2H9meBLMA9VVdoBmtJ3I21yZsK.jpeg', 667, 121500, '2019-10-18 11:57:44', '2019-10-20 12:47:26', 194),
(5, 'Tshirt 100 PERCENT WILD', 'Color : Blue\r\nMaterial : Cotton\r\n', 'https://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/OQOoYfjoDUB8B02k3XfAB1cpzFMcChFB7OfW6HiE.jpeg', 667, 121500, '2019-10-18 12:01:45', '2019-10-20 12:47:26', 6),
(7, 'Cargo Long Pants - SCL 41', 'Color : Navy\r\nMaterial : Cotton', 'https://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/2BCGB9V2iTbnPHh52eC0AglpcuEtutXO6RFoNrdy.jpeg', 668, 279000, '2019-10-18 12:07:15', '2019-10-18 12:16:13', 50),
(8, 'Jacket - JS 817', 'Color : Orange\r\nMaterial : Parachute', 'https://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/yF9imOyUMnB9OstajdIpDEbR38jyXfHllMwSpmkL.jpeg', 669, 292500, '2019-10-18 12:08:41', '2019-10-18 12:15:26', 50),
(9, 'Update Name', 'Code : WMS 336 Color : RED', 'https://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/htkhsu4KSa2ynIjeIPqVPragM1b03nKnXi0FNMVI.jpeg', 668, 200, '2019-10-19 14:59:28', '2019-10-20 11:48:46', 20),
(10, 'Star', 'Code : WMS 336 Color : Black', '://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/htkhsu4KSa2ynIjeIPqVPragM1b03nKnXi0FNMVI.jpeg', 668, 200, '2019-10-19 15:13:14', '2019-10-19 15:13:14', 50),
(11, 'Star', 'Code : WMS 336 Color : Black', '://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/htkhsu4KSa2ynIjeIPqVPragM1b03nKnXi0FNMVI.jpeg', 668, 200, '2019-10-20 07:44:19', '2019-10-20 07:44:19', 50),
(12, 'Star', 'Code : WMS 336 Color : Black', '://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/htkhsu4KSa2ynIjeIPqVPragM1b03nKnXi0FNMVI.jpeg', 668, 200, '2019-10-20 07:44:23', '2019-10-20 07:44:23', 50),
(13, 'Star', 'Code : WMS 336 Color : Black', '://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/htkhsu4KSa2ynIjeIPqVPragM1b03nKnXi0FNMVI.jpeg', 668, 200, '2019-10-20 07:44:25', '2019-10-20 07:44:25', 50),
(14, 'Star', 'Code : WMS 336 Color : Black', '://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/htkhsu4KSa2ynIjeIPqVPragM1b03nKnXi0FNMVI.jpeg', 668, 200, '2019-10-20 07:44:27', '2019-10-20 07:44:27', 50),
(15, 'Star', 'Code : WMS 336 Color : Black', '://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/htkhsu4KSa2ynIjeIPqVPragM1b03nKnXi0FNMVI.jpeg', 668, 200, '2019-10-20 07:44:28', '2019-10-20 07:44:28', 50),
(16, 'Star', 'Code : WMS 336 Color : Black', '://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/htkhsu4KSa2ynIjeIPqVPragM1b03nKnXi0FNMVI.jpeg', 668, 200, '2019-10-20 07:44:29', '2019-10-20 07:44:29', 50),
(17, 'Star', 'Code : WMS 336 Color : Black', '://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/htkhsu4KSa2ynIjeIPqVPragM1b03nKnXi0FNMVI.jpeg', 668, 200, '2019-10-20 07:44:30', '2019-10-20 07:44:30', 50),
(18, 'Star', 'Code : WMS 336 Color : Black', '://starcross-prod.s3.ap-southeast-1.amazonaws.com/images/products/small/htkhsu4KSa2ynIjeIPqVPragM1b03nKnXi0FNMVI.jpeg', 668, 200, '2019-10-20 11:46:12', '2019-10-20 11:46:12', 50);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`) VALUES
(8, 'hasan', '$2a$10$gxAl1.VsTPcylcrYV8o66O8/ctZe3r5L/N3wciu5G9dziETVOtB5i');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_categories`);

--
-- Indeks untuk tabel `detail_order`
--
ALTER TABLE `detail_order`
  ADD PRIMARY KEY (`id_detail_order`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_product` (`id_product`);

--
-- Indeks untuk tabel `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id_order`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `id_categories` (`id_categories`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id_categories` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=672;

--
-- AUTO_INCREMENT untuk tabel `detail_order`
--
ALTER TABLE `detail_order`
  MODIFY `id_detail_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;

--
-- AUTO_INCREMENT untuk tabel `order`
--
ALTER TABLE `order`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detail_order`
--
ALTER TABLE `detail_order`
  ADD CONSTRAINT `detail_order_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_order_ibfk_3` FOREIGN KEY (`id_order`) REFERENCES `order` (`id_order`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_categories`) REFERENCES `categories` (`id_categories`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
