-- ============================================================
-- SQL DUMP: BONEKAKU DATABASE
-- Complete dataset extracted from boneka-ku.html
-- Compatible with MySQL 5.7+ / MySQL 8.0+ / MariaDB / cPanel phpMyAdmin
-- Generated: 2026-09-20
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ------------------------------------------------------------
-- Table: categories
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `external_link` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `slug`, `name`, `description`, `external_link`, `sort_order`) VALUES
(1, 'most-favorite', 'Most Favorite', 'Koleksi ready stock paling laris dengan desain terbaik dan model pilihan. Siap kirim untuk berbagai kebutuhan acara anda.', 'https://bonekaku.co.id/katalog-ready-stock/', 1),
(2, 'animal', 'Animal Series', 'Seri boneka binatang yang lucu dan menggemaskan — pilihan favorit untuk souvenir dan koleksi.', 'https://bonekaku.co.id/katalog-animal-series/', 2),
(3, 'boneka-sovenir', 'Boneka Souvenir', 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 'https://bonekaku.co.id/katalog-boneka-sovenir/', 3),
(4, 'bantal', 'Bantal Custom', 'Bantal juga dapat dijadikan media promosi yang menarik dan efektif. Kami menyediakan dan alternatif desain bantal yang dapat anda pilih.', 'https://bonekaku.co.id/katalog-bantal-custom/', 4),
(5, 'boneka-custom', 'Boneka Custom', 'Punya mascot andalan? Bingung menjadikannya menarik tidak hanya sebuah logo? Bawa pada kami, dan kami akan bantu untuk wujudkan dalam bentuk boneka.', 'https://bonekaku.co.id/katalog-boneka-custom/', 5),
(6, 'graduation', 'Graduation Series', 'Seri boneka wisuda — hadiah penuh makna untuk merayakan kelulusan dengan gaya khas Bonekaku.', 'https://bonekaku.co.id/katalog-graduation-series/', 6),
(7, 'maskot', 'Maskot / Badut', 'Kami juga menerima pemesanan maskot / badut untuk media promosi. Dengan bahan dan rangka yang kokoh.', 'https://bonekaku.co.id/katalog-maskot/', 7),
(8, 'masker', 'Masker', 'Kami juga menyediakan masker sebagai souvenir dan media promosi yang efektif.', 'https://bonekaku.co.id/katalog-masker/', 8);

-- ------------------------------------------------------------
-- Table: products
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `category_slug` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `image_url` text NOT NULL,
  `size` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_new` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  KEY `products_category_id_foreign` (`category_id`),
  KEY `products_category_slug_index` (`category_slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`id`, `category_id`, `category_slug`, `tag`, `name`, `slug`, `image_url`, `size`, `price`, `description`, `is_featured`, `is_new`, `sort_order`) VALUES
(1, 1, 'most-favorite', 'Most Favorite', 'Bear Jeslyn, 12cm', 'bear-jeslyn-12cm-1', 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Jeslyn-12-outfit-scaled.jpg', '12cm', NULL, 'Bear Jeslyn, 12cm merupakan salah satu boneka terfavorit dengan bahan velboa lembut, isian silikon dacron berkualitas tinggi, dan jahitan sangat rapi. Cocok untuk souvenir eksklusif, kado spesial, maupun merchandise perusahaan.', 1, 1, 1),
(2, 1, 'most-favorite', 'Most Favorite', 'Bear Vico, 15cm', 'bear-vico-15cm-2', 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Vico-3outfit-scaled.jpg', '15cm', NULL, 'Bear Vico, 15cm merupakan salah satu boneka terfavorit dengan bahan velboa lembut, isian silikon dacron berkualitas tinggi, dan jahitan sangat rapi. Cocok untuk souvenir eksklusif, kado spesial, maupun merchandise perusahaan.', 1, 1, 2),
(3, 1, 'most-favorite', 'Most Favorite', 'Bear Mayna, 15cm', 'bear-mayna-15cm-3', 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Mayna-3outfit-scaled.jpg', '15cm', NULL, 'Bear Mayna, 15cm merupakan salah satu boneka terfavorit dengan bahan velboa lembut, isian silikon dacron berkualitas tinggi, dan jahitan sangat rapi. Cocok untuk souvenir eksklusif, kado spesial, maupun merchandise perusahaan.', 1, 1, 3),
(4, 1, 'most-favorite', 'Most Favorite', 'Bear Bobby, 18cm', 'bear-bobby-18cm-4', 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Bobby-18-outfit2-scaled.jpg', '18cm', NULL, 'Bear Bobby, 18cm merupakan salah satu boneka terfavorit dengan bahan velboa lembut, isian silikon dacron berkualitas tinggi, dan jahitan sangat rapi. Cocok untuk souvenir eksklusif, kado spesial, maupun merchandise perusahaan.', 1, 1, 4),
(5, 1, 'most-favorite', 'Most Favorite', 'Bear Boy-Girl, 20cm standing', 'bear-boy-girl-20cm-standing-5', 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Boy-Girl-outfit-scaled.jpg', '20cm', NULL, 'Bear Boy-Girl, 20cm standing merupakan salah satu boneka terfavorit dengan bahan velboa lembut, isian silikon dacron berkualitas tinggi, dan jahitan sangat rapi. Cocok untuk souvenir eksklusif, kado spesial, maupun merchandise perusahaan.', 1, 1, 5),
(6, 1, 'most-favorite', 'Most Favorite', 'Bear Kempins, 22cm', 'bear-kempins-22cm-6', 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Kempinski-22-3outfit-scaled.jpg', '22cm', NULL, 'Bear Kempins, 22cm merupakan salah satu boneka terfavorit dengan bahan velboa lembut, isian silikon dacron berkualitas tinggi, dan jahitan sangat rapi. Cocok untuk souvenir eksklusif, kado spesial, maupun merchandise perusahaan.', 1, 1, 6),
(7, 2, 'animal', 'Animal Series', 'Clown Fish', 'clown-fish-7', 'https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Clown-Fish.png', '', NULL, 'Koleksi Clown Fish dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 1, 7),
(8, 2, 'animal', 'Animal Series', 'Dolphin', 'dolphin-8', 'https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Lumba-Lumba__.png', '', NULL, 'Koleksi Dolphin dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 1, 8),
(9, 2, 'animal', 'Animal Series', 'Goat', 'goat-9', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Goat.png', '', NULL, 'Koleksi Goat dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 1, 9),
(10, 2, 'animal', 'Animal Series', 'Goat 2', 'goat-2-10', 'https://bonekaku.co.id/wp-content/uploads/2019/09/Image-Goat-2__.png', '', NULL, 'Koleksi Goat 2 dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 1, 10),
(11, 2, 'animal', 'Animal Series', 'Lion', 'lion-11', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Lion.png', '', NULL, 'Koleksi Lion dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 1, 11),
(12, 2, 'animal', 'Animal Series', 'Lobster', 'lobster-12', 'https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Lobster.png', '', NULL, 'Koleksi Lobster dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 1, 12),
(13, 2, 'animal', 'Animal Series', 'Mini Leopard', 'mini-leopard-13', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Mini-Leopard.png', '', NULL, 'Koleksi Mini Leopard dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 13),
(14, 2, 'animal', 'Animal Series', 'Monkey', 'monkey-14', 'https://bonekaku.co.id/wp-content/uploads/2019/09/Image-Monkey_.png', '', NULL, 'Koleksi Monkey dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 14),
(15, 2, 'animal', 'Animal Series', 'Orang Utan', 'orang-utan-15', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Orang-Utan.png', '', NULL, 'Koleksi Orang Utan dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 15),
(16, 2, 'animal', 'Animal Series', 'Owl 02', 'owl-02-16', 'https://bonekaku.co.id/wp-content/uploads/2019/09/Image-Owl-02_.png', '', NULL, 'Koleksi Owl 02 dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 16),
(17, 2, 'animal', 'Animal Series', 'Owl Graduation Series', 'owl-graduation-series-17', 'https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Owl-Graduation-Series.png', '', NULL, 'Koleksi Owl Graduation Series dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 17),
(18, 2, 'animal', 'Animal Series', 'Penguin', 'penguin-18', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Pinguin.png', '', NULL, 'Koleksi Penguin dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 18),
(19, 2, 'animal', 'Animal Series', 'Animal Bintang Laut', 'animal-bintang-laut-19', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Bintang-Laut-12cm-1-scaled.jpg', '', NULL, 'Koleksi Animal Bintang Laut dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 19),
(20, 2, 'animal', 'Animal Series', 'Animal Rabbit Yelvo', 'animal-rabbit-yelvo-20', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Rabbit-15cm-Yelvo-scaled.jpg', '', NULL, 'Koleksi Animal Rabbit Yelvo dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 20),
(21, 2, 'animal', 'Animal Series', 'Animal Rabbit Pocket', 'animal-rabbit-pocket-21', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Rabbit-Pocket-15cm-scaled.jpg', '', NULL, 'Koleksi Animal Rabbit Pocket dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 21),
(22, 2, 'animal', 'Animal Series', 'Animal Tupai', 'animal-tupai-22', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Tupai-1-scaled.jpg', '', NULL, 'Koleksi Animal Tupai dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 22),
(23, 2, 'animal', 'Animal Series', 'Animal Orang Utan', 'animal-orang-utan-23', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Orang-Utan-17cm-scaled.jpg', '', NULL, 'Koleksi Animal Orang Utan dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 23),
(24, 2, 'animal', 'Animal Series', 'Animal Beruang Madu', 'animal-beruang-madu-24', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Beruang-Madu-18cm-scaled.jpg', '', NULL, 'Koleksi Animal Beruang Madu dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 24),
(25, 2, 'animal', 'Animal Series', 'Animal Macan', 'animal-macan-25', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Macan-18cm-scaled.jpg', '', NULL, 'Koleksi Animal Macan dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 25),
(26, 2, 'animal', 'Animal Series', 'Animal Panda 18cm velboa', 'animal-panda-18cm-velboa-26', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Panda-18cm-velboa-scaled.jpg', '', NULL, 'Koleksi Animal Panda 18cm velboa dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 26),
(27, 2, 'animal', 'Animal Series', 'Animal Pinguin outfit', 'animal-pinguin-outfit-27', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Pinguin-18cm-outfit-scaled.jpg', '', NULL, 'Koleksi Animal Pinguin outfit dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 27),
(28, 2, 'animal', 'Animal Series', 'Animal Gajah 20cm', 'animal-gajah-20cm-28', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Gajah-20cm-scaled.jpg', '', NULL, 'Koleksi Animal Gajah 20cm dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 28),
(29, 2, 'animal', 'Animal Series', 'Animal Gajah Duduk + outfit', 'animal-gajah-duduk-outfit-29', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Gajah-Duduk-outfit-scaled.jpg', '', NULL, 'Koleksi Animal Gajah Duduk + outfit dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 29),
(30, 2, 'animal', 'Animal Series', 'Animal Rabbit Yelvo +outfit', 'animal-rabbit-yelvo-outfit-30', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Rabbit-15cm-Yelvo-outfit-scaled.jpg', '', NULL, 'Koleksi Animal Rabbit Yelvo +outfit dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 30),
(31, 2, 'animal', 'Animal Series', 'Animal Panda 15cm', 'animal-panda-15cm-31', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Panda-15cm-Velboa-scaled.jpg', '', NULL, 'Koleksi Animal Panda 15cm dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 31),
(32, 2, 'animal', 'Animal Series', 'Animal Kura', 'animal-kura-32', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Kura-15cm-side-scaled.jpg', '', NULL, 'Koleksi Animal Kura dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 32),
(33, 2, 'animal', 'Animal Series', 'Animal Doggy', 'animal-doggy-33', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Doggy-12-scaled.jpg', '', NULL, 'Koleksi Animal Doggy dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 33),
(34, 2, 'animal', 'Animal Series', 'Animal Gajah', 'animal-gajah-34', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Gajah-12-scaled.jpg', '', NULL, 'Koleksi Animal Gajah dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 34),
(35, 2, 'animal', 'Animal Series', 'Animal Goat', 'animal-goat-35', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Goat-12-scaled.jpg', '', NULL, 'Koleksi Animal Goat dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 35),
(36, 2, 'animal', 'Animal Series', 'Animal Hippo', 'animal-hippo-36', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Hippo-12-scaled.jpg', '', NULL, 'Koleksi Animal Hippo dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 36),
(37, 2, 'animal', 'Animal Series', 'Animal Ikan wisuda bank Ina', 'animal-ikan-wisuda-bank-ina-37', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Ikan-wisuda-bank-Ina-12cm-scaled.jpg', '', NULL, 'Koleksi Animal Ikan wisuda bank Ina dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 37),
(38, 2, 'animal', 'Animal Series', 'Boneka Animal Kodok', 'boneka-animal-kodok-38', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Kodok-12-scaled.jpg', '', NULL, 'Koleksi Boneka Animal Kodok dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 38),
(39, 2, 'animal', 'Animal Series', 'Animal Monkey', 'animal-monkey-39', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Monkey-12-scaled.jpg', '', NULL, 'Koleksi Animal Monkey dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 39),
(40, 2, 'animal', 'Animal Series', 'Animal Rabbit', 'animal-rabbit-40', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Rabbit-12-scaled.jpg', '', NULL, 'Koleksi Animal Rabbit dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 40),
(41, 2, 'animal', 'Animal Series', 'Animal Sapi', 'animal-sapi-41', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Sapi-12-scaled.jpg', '', NULL, 'Koleksi Animal Sapi dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 41),
(42, 2, 'animal', 'Animal Series', 'Animal Snoopy', 'animal-snoopy-42', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Series-12-Snoopy-scaled.jpg', '', NULL, 'Koleksi Animal Snoopy dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 42),
(43, 2, 'animal', 'Animal Series', 'Boneka Animal Koala', 'boneka-animal-koala-43', 'https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Koala-20cm-scaled.jpg', '', NULL, 'Koleksi Boneka Animal Koala dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.', 0, 0, 43),
(44, 4, 'bantal', 'Bantal Custom', 'Bantal Leher U Animal', 'bantal-leher-u-animal-44', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Leher-U-01.png', '', NULL, 'Bantal Leher U Animal dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 44),
(45, 4, 'bantal', 'Bantal Custom', 'Bantal Donut 03', 'bantal-donut-03-45', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Donut-03.png', '', NULL, 'Bantal Donut 03 dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 45),
(46, 4, 'bantal', 'Bantal Custom', 'Bantal Donut 02', 'bantal-donut-02-46', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Donut-02.png', '', NULL, 'Bantal Donut 02 dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 46),
(47, 4, 'bantal', 'Bantal Custom', 'Bantal Leher U Custom', 'bantal-leher-u-custom-47', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Leher-U-03.png', '', NULL, 'Bantal Leher U Custom dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 47),
(48, 4, 'bantal', 'Bantal Custom', 'Bantal Leher', 'bantal-leher-48', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Leher-02.png', '', NULL, 'Bantal Leher dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 48),
(49, 4, 'bantal', 'Bantal Custom', 'Bantal', 'bantal-49', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-06.png', '', NULL, 'Bantal dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 49),
(50, 4, 'bantal', 'Bantal Custom', 'Bantal Sofa', 'bantal-sofa-50', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Sofa-02.png', '', NULL, 'Bantal Sofa dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 50),
(51, 4, 'bantal', 'Bantal Custom', 'Bantal Donut', 'bantal-donut-51', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Donut.png', '', NULL, 'Bantal Donut dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 51),
(52, 4, 'bantal', 'Bantal Custom', 'Bantal Leher U', 'bantal-leher-u-52', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Leher-U-02.png', '', NULL, 'Bantal Leher U dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 52),
(53, 4, 'bantal', 'Bantal Custom', 'Bantal Leher U Printing', 'bantal-leher-u-printing-53', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-04.png', '', NULL, 'Bantal Leher U Printing dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 53),
(54, 4, 'bantal', 'Bantal Custom', 'Bantal Love Velboa', 'bantal-love-velboa-54', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-03.png', '', NULL, 'Bantal Love Velboa dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 54),
(55, 4, 'bantal', 'Bantal Custom', 'Bantal Leher Dog Bones/Bantal Tulang', 'bantal-leher-dog-bones-bantal-tulang-55', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Leher-Dog-Bones.png', '', NULL, 'Bantal Leher Dog Bones/Bantal Tulang dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 55),
(56, 4, 'bantal', 'Bantal Custom', 'Bantal Love Yelvo', 'bantal-love-yelvo-56', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-02.png', '', NULL, 'Bantal Love Yelvo dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 56),
(57, 4, 'bantal', 'Bantal Custom', 'Bantal 02', 'bantal-02-57', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Tidur.png', '', NULL, 'Bantal 02 dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.', 0, 0, 57),
(58, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom', 'boneka-custom-58', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Boneka-Custom-3.jpeg', '', NULL, 'Boneka Custom diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 58),
(59, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom', 'boneka-custom-59', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Boneka-Custom.jpeg', '', NULL, 'Boneka Custom diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 59),
(60, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom', 'boneka-custom-60', 'https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.42-AM-1.jpeg', '', NULL, 'Boneka Custom diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 60),
(61, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 13', 'boneka-custom-13-61', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-13.png', '', NULL, 'Boneka Custom 13 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 61),
(62, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 12', 'boneka-custom-12-62', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-12.png', '', NULL, 'Boneka Custom 12 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 62),
(63, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 11', 'boneka-custom-11-63', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-11a.png', '', NULL, 'Boneka Custom 11 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 63),
(64, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 10', 'boneka-custom-10-64', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-10.png', '', NULL, 'Boneka Custom 10 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 64),
(65, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 09', 'boneka-custom-09-65', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-09.png', '', NULL, 'Boneka Custom 09 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 65),
(66, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 08', 'boneka-custom-08-66', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-08.png', '', NULL, 'Boneka Custom 08 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 66),
(67, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 07', 'boneka-custom-07-67', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-07.png', '', NULL, 'Boneka Custom 07 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 67),
(68, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 06', 'boneka-custom-06-68', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-06.png', '', NULL, 'Boneka Custom 06 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 68),
(69, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 05', 'boneka-custom-05-69', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Boneka-Costum-06a.png', '', NULL, 'Boneka Custom 05 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 69),
(70, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom -Bear 01', 'boneka-custom-bear-01-70', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Custom-05.png', '', NULL, 'Boneka Custom -Bear 01 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 70),
(71, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 01', 'boneka-custom-01-71', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Boneka-Custom-04.png', '', NULL, 'Boneka Custom 01 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 71),
(72, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 02', 'boneka-custom-02-72', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Boneka-Custom-03.png', '', NULL, 'Boneka Custom 02 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 72),
(73, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 03', 'boneka-custom-03-73', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-boneka-Custom-02.png', '', NULL, 'Boneka Custom 03 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 73),
(74, 5, 'boneka-custom', 'Boneka Custom', 'Boneka Custom 04', 'boneka-custom-04-74', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Boneka-Custom-01.png', '', NULL, 'Boneka Custom 04 diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 74),
(75, 5, 'boneka-custom', 'Boneka Custom', 'Graduation Series', 'graduation-series-75', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-11.png', '', NULL, 'Graduation Series diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.', 0, 0, 75),
(76, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Salman Bear', 'salman-bear-76', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Salman-Bear.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 76),
(77, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Jason Bear', 'jason-bear-77', 'https://bonekaku.co.id/wp-content/uploads/2020/08/2-1.jpg', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 77),
(78, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Jesslyn Bear', 'jesslyn-bear-78', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Jeslyn-Bear.jpg', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 78),
(79, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Vico Bear', 'vico-bear-79', 'https://bonekaku.co.id/wp-content/uploads/2020/08/3.jpg', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 79),
(80, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Arnold Bear', 'arnold-bear-80', 'https://bonekaku.co.id/wp-content/uploads/2020/08/4.jpg', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 80),
(81, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Boneka Souvenir - Classic Bear 01', 'boneka-souvenir-classic-bear-01-81', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Boneka-Classic-Bear_.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 81),
(82, 3, 'boneka-sovenir', 'Boneka Souvenir', 'FF Bear (Forever Friends ) Bear', 'ff-bear-forever-friends-bear-82', 'https://bonekaku.co.id/wp-content/uploads/2018/06/Image-FF-Bear-Forever-Friends-Bear.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 82),
(83, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Bobby Bear (02)', 'bobby-bear-02-83', 'https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Bobby-Bear-2.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 83),
(84, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Jeslyn Bear', 'jeslyn-bear-84', 'https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Jeslyn-Bear.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 84),
(85, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Mayna Bear', 'mayna-bear-85', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Mayna-Bear.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 85),
(86, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Vico Bear Sol Micro', 'vico-bear-sol-micro-86', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Vico-Bear-Sol-Micro.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 86),
(87, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Vico Bear', 'vico-bear-87', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Vico-Bear.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 87),
(88, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Boneka Souvenir - Classic Bear', 'boneka-souvenir-classic-bear-88', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Boneka-Souvenir-Classic-Bear.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 88),
(89, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Bobby Bear', 'bobby-bear-89', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Bobby-Bear.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 89),
(90, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Archie Bear', 'archie-bear-90', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Archie-Bear.png', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 90),
(91, 3, 'boneka-sovenir', 'Boneka Souvenir', 'Kempinski Bear', 'kempinski-bear-91', 'https://bonekaku.co.id/wp-content/uploads/2020/08/3-1.jpg', '', NULL, 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.', 0, 0, 91),
(92, 6, 'graduation', 'Graduation Series', 'Owl Graduation Series', 'owl-graduation-series-92', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Owl-Graduation.png', '', NULL, 'Owl Graduation Series edisi wisuda lengkap dengan atribut toga dan jubah kelulusan. Pilihan kenang-kenangan paling berkesan untuk momen kelulusan sahabat atau kerabat.', 0, 0, 92),
(93, 6, 'graduation', 'Graduation Series', 'Graduation series - Jeslyn Bear', 'graduation-series-jeslyn-bear-93', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Graduation-series.png', '', NULL, 'Graduation series - Jeslyn Bear edisi wisuda lengkap dengan atribut toga dan jubah kelulusan. Pilihan kenang-kenangan paling berkesan untuk momen kelulusan sahabat atau kerabat.', 0, 0, 93),
(94, 6, 'graduation', 'Graduation Series', 'Graduation series - Bobby/Bonnie', 'graduation-series-bobby-bonnie-94', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Graduation-series-02.png', '', NULL, 'Graduation series - Bobby/Bonnie edisi wisuda lengkap dengan atribut toga dan jubah kelulusan. Pilihan kenang-kenangan paling berkesan untuk momen kelulusan sahabat atau kerabat.', 0, 0, 94),
(95, 6, 'graduation', 'Graduation Series', 'Graduation series - Vico Bear', 'graduation-series-vico-bear-95', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Graduation-series-04.png', '', NULL, 'Graduation series - Vico Bear edisi wisuda lengkap dengan atribut toga dan jubah kelulusan. Pilihan kenang-kenangan paling berkesan untuk momen kelulusan sahabat atau kerabat.', 0, 0, 95),
(96, 6, 'graduation', 'Graduation Series', 'Graduation series -Mery/Kempin Bear', 'graduation-series-mery-kempin-bear-96', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Graduation-series-04_.png', '', NULL, 'Graduation series -Mery/Kempin Bear edisi wisuda lengkap dengan atribut toga dan jubah kelulusan. Pilihan kenang-kenangan paling berkesan untuk momen kelulusan sahabat atau kerabat.', 0, 0, 96),
(97, 6, 'graduation', 'Graduation Series', 'Graduation Series', 'graduation-series-97', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Boneka-Custom-2.jpeg', '', NULL, 'Graduation Series edisi wisuda lengkap dengan atribut toga dan jubah kelulusan. Pilihan kenang-kenangan paling berkesan untuk momen kelulusan sahabat atau kerabat.', 0, 0, 97),
(98, 6, 'graduation', 'Graduation Series', 'Graduation Series', 'graduation-series-98', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Boneka-Custom.jpeg', '', NULL, 'Graduation Series edisi wisuda lengkap dengan atribut toga dan jubah kelulusan. Pilihan kenang-kenangan paling berkesan untuk momen kelulusan sahabat atau kerabat.', 0, 0, 98),
(99, 7, 'maskot', 'Maskot / Badut', 'Badut 01', 'badut-01-99', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Badut-01a.png', '', NULL, 'Kami juga menerima pemesanan maskot / badut untuk media promosi. Dengan bahan dan rangka yang kokoh.', 0, 0, 99),
(100, 8, 'masker', 'Masker', 'Masker', 'masker-100', 'https://bonekaku.co.id/wp-content/uploads/2021/02/Masker-Custom.jpeg', '', NULL, 'Kami juga menyediakan masker sebagai souvenir dan media promosi yang efektif.', 0, 0, 100);

-- ------------------------------------------------------------
-- Table: articles
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `original_url` varchar(255) DEFAULT NULL,
  `cover_image` text DEFAULT NULL,
  `date_formatted` varchar(100) DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `author` varchar(100) NOT NULL DEFAULT 'Bonekaku Admin',
  `status` varchar(50) NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `articles` (`id`, `title`, `slug`, `original_url`, `cover_image`, `date_formatted`, `excerpt`, `content`, `author`, `status`) VALUES
(1, 'Bantal Merchandise, Kenyamanan yang Membekas untuk Customer Anda', 'bantal-merchandise-kenyamanan-yang-membekas-untuk-customer-anda', 'https://bonekaku.co.id/2021/06/15/bantal-merchandise-kenyamanan-yang-membekas-untuk-customer-anda/', 'https://bonekaku.co.id/wp-content/uploads/2021/06/b1.jpg', '15 Juni 2021', 'Industri boneka kini sudah semakin luas mengembangkan sayapnya. Tidak hanya memproduksi mainan anak, tetapi juga bantal merchandise fungsional untuk branding bisnis.', '<p>Industri boneka kini sudah semakin luas mengembangkan sayapnya. Tidak hanya sebatas memproduksi boneka anak-anak, tetapi kini bantal merchandise telah menjadi salah satu instrumen branding paling dicari oleh perusahaan multinasional, startup, maupun instansi pemerintahan.</p>\n<h2>Mengapa Bantal Merchandise Sangat Efektif?</h2>\n<p>Memberikan cinderamata yang bernilai guna tinggi akan membuat penerima merasa dihargai. Berbeda dengan brosur kertas yang sering kali dibuang, bantal memiliki fungsi nyata sehari-hari:</p>\n<ul>\n  <li><b>Fungsional dan Tahan Lama:</b> Bantal leher (neck pillow) atau bantal sofa sering diletakkan di mobil, ruang kerja, hingga kursi pesawat saat traveling.</li>\n  <li><b>Eksposur Brand Berulang:</b> Setiap kali customer menggunakannya untuk istirahat atau bersandar, logo dan pesan merek Anda akan selalu terlihat.</li>\n  <li><b>Kesan Nyaman dan Hangat:</b> Tekstur kain yang lembut mengasosiasikan brand Anda dengan rasa nyaman dan kepedulian.</li>\n</ul>\n<blockquote>"Merchandise yang baik bukan sekadar mencantumkan logo, melainkan memberikan solusi kenyamanan yang melekat di ingatan pelanggan Anda."</blockquote>\n<h3>Pilihan Material dan Teknik Cetak</h3>\n<p>Di <b>Bonekaku.co.id</b>, kami menyediakan aneka pilihan kain bantal mulai dari bahan <i>Velboa</i> yang lembut, <i>Yelvo</i> bertekstur elastis sutra, hingga bahan katun kanvas. Untuk pencetakan logo, kami menyediakan opsi bordir komputer presisi tinggi maupun cetak sublimasi full color anti luntur.</p>', 'Bonekaku Admin', 'published'),
(2, 'Peranan Maskot Boneka bagi Sebuah Perusahaan', 'peranan-maskot-boneka-bagi-sebuah-perusahaan', 'https://bonekaku.co.id/2021/05/19/peranan-maskot-boneka-bagi-sebuah-perusahaan/', 'https://bonekaku.co.id/wp-content/uploads/2021/05/Bonekaku-artikel-mei-2.jpg', '19 Mei 2021', 'Anda pasti sudah tidak asing dengan maskot, bukan? Maskot perusahaan mampu menghidupkan citra brand dan mempererat ikatan emosional dengan konsumen.', '<p>Anda pasti sudah tidak asing dengan maskot, bukan? Maskot perusahaan telah terbukti menjadi salah satu strategi branding paling berhasil di era visual modern. Karakter unik dengan kepribadian ramah mampu menjembatani hubungan emosional antara sebuah korporasi dengan masyarakat luas.</p>\n<h2>1. Memanusiakan Identitas Brand (Brand Personification)</h2>\n<p>Sebuah korporasi sering kali dipandang kaku dan formal. Melalui kehadiran maskot boneka berwujud karakter lucu, persepsi konsumen dapat berubah menjadi lebih akrab, hangat, dan bersahabat.</p>\n<h2>2. Meningkatkan Daya Ingat Konsumen (Brand Recall)</h2>\n<p>Penelitian visual membuktikan bahwa otak manusia 60.000 kali lebih cepat memproses karakter gambar dibandingkan teks tulisan biasa. Maskot yang ikonik akan membuat nama perusahaan Anda langsung teringat di benak audiens saat membutuhkan layanan Anda.</p>\n<h3>Penerapan Maskot dalam Berbagai Format</h3>\n<ol>\n  <li><b>Boneka Mini Souvenir:</b> Diberikan sebagai hadiah apresiasi nasabah atau konsumen saat pameran.</li>\n  <li><b>Kostum Badut / Human Mascot:</b> Menjadi daya tarik utama dalam launching produk, roadshow promosi, dan acara perayaan kantor.</li>\n  <li><b>Merchandise Eksklusif:</b> Dijadikan hadiah promosi berhadiah (gimmick purchase) yang memacu penjualan produk utama.</li>\n</ol>\n<p>Bonekaku siap membantu merealisasikan gambar 2D maskot Anda menjadi wujud boneka 3D dengan akurasi bentuk dan proporsi yang sempurna.</p>', 'Bonekaku Admin', 'published'),
(3, 'Mencuci Boneka dengan Mesin Cuci, Ini Tips dan Trik nya!', 'mencuci-boneka-dengan-mesin-cuci-ini-tips-dan-trik-nya', 'https://bonekaku.co.id/2021/05/19/mencuci-boneka-dengan-mesin-cuci-ini-tips-dan-trik-nya/', 'https://bonekaku.co.id/wp-content/uploads/2021/05/Bonekaku-artikel-mei-1.jpg', '19 Mei 2021', 'Bagi Anda yang hobi mengoleksi boneka, simak tips praktis mencuci boneka menggunakan mesin cuci tanpa merusak jahitan atau menggumpalkan isian kapasnya.', '<p>Bagi Anda yang hobi mengoleksi boneka atau memiliki buah hati di rumah, menjaga kebersihan boneka dari debu, tungau, dan kuman adalah hal yang sangat esensial. Namun, banyak orang khawatir mencuci dengan mesin cuci dapat membuat boneka kempis atau robek.</p>\n<h2>Langkah Praktis Mencuci Boneka</h2>\n<ol>\n  <li><b>Periksa Label Perawatan:</b> Pastikan boneka tidak mengandung baterai, kotak musik, atau aksesoris logam yang tidak bisa dilepas.</li>\n  <li><b>Gunakan Laundry Bag (Jaring Cuci):</b> Masukkan boneka ke dalam kantong cuci jaring untuk melindungi bulu dan mata boneka dari gesekan tabung mesin.</li>\n  <li><b>Pilih Putaran Halus (Delicate / Gentle Cycle):</b> Gunakan pengaturan putaran paling pelan dengan air dingin atau suam kuku.</li>\n  <li><b>Pilih Deterjen Lembut:</b> Gunakan deterjen cair khusus pakaian bayi yang tidak mengandung pemutih keras.</li>\n</ol>\n<blockquote><b>Penting:</b> Jangan mengeringkan boneka di mesin pengering panas (dryer) karena panas tinggi dapat melelehkan serat bulu sintetis. Cukup diangin-anginkan di tempat teduh yang memiliki sirkulasi udara baik.</blockquote>', 'Bonekaku Admin', 'published'),
(4, 'Bonekaku Sebagai Produsen Beanbag di Jabodetabek', 'bonekaku-sebagai-produsen-beanbag-di-jabodetabek', 'https://bonekaku.co.id/2021/01/04/bonekaku-sebagai-produsen-beanbag-di-jabodetabek/', 'https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.40-AM-2.jpeg', '4 Januari 2021', 'Kini Bonekaku resmi memproduksi beanbag santai berbagai model dan ukuran untuk kafe, co-working space, kantor kekinian, maupun rumah tinggal.', '<p>Halo sobat pencinta boneka dan dekorasi interior! Kini <b>Bonekaku.co.id</b> tidak hanya fokus pada aneka boneka souvenir, melainkan telah memperluas lini produksinya sebagai salah satu produsen beanbag terdepan di wilayah Jakarta, Bogor, Depok, Tangerang, dan Bekasi.</p>\n<h2>Kelebihan Beanbag Produksi Bonekaku</h2>\n<p>Kami merancang setiap beanbag dengan mengutamakan standar kenyamanan ergonomis dan keawetan material:</p>\n<ul>\n  <li><b>Jahitan Ganda Kuat:</b> Menggunakan benang nilon berkualitas dengan jahitan double stitch sehingga tidak mudah sobek saat diduduki orang dewasa.</li>\n  <li><b>Sistem Resleting Ganda (Double Zipper):</b> Lapisan luar dan inner bag terpisah, memudahkan saat ingin mencuci cover luar serta mencegah butiran sterofoam tercecer.</li>\n  <li><b>Butiran EPS Styrofoam Premium:</b> Menggunakan butiran styrofoam padat berkerapatan tinggi yang tidak cepat kempes meski dipakai secara intensif.</li>\n</ul>\n<p>Kami melayani pemesanan beanbag satuan untuk rumah pribadi maupun pesanan partai besar untuk hotel, resort, kafe estetik, dan open-space office.</p>', 'Bonekaku Admin', 'published'),
(5, 'Cara Mudah Memilih Bean Bag Yang Berkualitas Agar Tidak salah Pilih', 'cara-mudah-memilih-bean-bag-yang-berkualitas-agar-tidak-salah-pilih', 'https://bonekaku.co.id/2020/12/23/3-cara-memilih-bean-bag-yang-berkualitas-agar-tidak-salah-pilih/', 'https://bonekaku.co.id/wp-content/uploads/2020/12/bean-bag-kantor.jpg', '23 Desember 2020', 'Jangan tertipu harga murah! Pelajari faktor penting dalam menentukan kualitas bean bag, mulai dari jenis bahan kain hingga kerapatan butiran pengisinya.', '<p>Jauh sebelum tren bean bag menjamur seperti sekarang, tempat duduk santai ini dikenal karena kemampuannya mengikuti kontur tubuh penggunanya secara sempurna. Namun, di pasaran saat ini banyak beredar bean bag dengan harga murah yang cepat rusak dan kempes dalam hitungan minggu.</p>\n<h2>Panduan Memilih Bean Bag Berkualitas</h2>\n<h3>1. Kenali Kebutuhan Indoor vs Outdoor</h3>\n<p>Jika bean bag akan diletakkan di teras, tepi kolam renang, atau kafe outdoor, pilihlah bahan kain waterproof seperti polyester taslan atau kanvas tebal tahan air. Untuk ruangan indoor, bahan katun atau velvet memberikan sentuhan lebih sejuk dan nyaman.</p>\n<h3>2. Perhatikan Inner Pouch (Kantung Dalam)</h3>\n<p>Bean bag berkualitas wajib memiliki kantung dalam untuk menampung butiran styrofoam. Hal ini sangat penting agar sarung luar dapat dilepas dan dicuci sewaktu-waktu tanpa repot mengeluarkan butiran styrofoam satu per satu.</p>\n<h3>3. Ukuran yang Proporsional</h3>\n<p>Pilihlah ukuran sesuai postur tubuh dan luas ruangan. Ukuran Sedang (90x120 cm) adalah ukuran paling ideal dan laris untuk bersantai santai membaca buku maupun bekerja dengan laptop.</p>', 'Bonekaku Admin', 'published'),
(6, '3 Cafe Yang Memiliki Maskot Boneka, Unik dan Bikin Betah', '3-cafe-yang-memiliki-maskot-boneka-unik-dan-bikin-betah', 'https://bonekaku.co.id/2020/12/08/3-cafe-yang-memiliki-maskot-boneka-unik-dan-bikin-betah/', 'https://bonekaku.co.id/wp-content/uploads/2020/12/Kafe-doraemon.jpg', '8 Desember 2020', 'Kini kafe kekinian tidak hanya menjual racikan kopi nikmat, namun juga menghadirkan maskot boneka raksasa sebagai daya tarik visual untuk foto media sosial.', '<p>Boneka ternyata bukan hanya menemani Anda di kamar tidur saja. Di industri kuliner dan pariwisata kekinian, boneka raksasa telah menjadi strategi jitu untuk menciptakan spot foto Instagramable yang viral di kalangan pengunjung muda.</p>\n<h2>Daya Tarik Maskot Boneka di Kafe</h2>\n<p>Banyak kafe bertema karakter seperti tema kartun atau boneka beruang raksasa (Giant Teddy Bear) yang mendudukkan boneka di meja kosong. Selain mempercantik ruangan, keberadaan boneka ini membuat pelanggan merasa ditemani saat sedang nongkrong sendirian.</p>\n<p>Inspirasi ini membuktikan bahwa investasi pada boneka dekoratif berukuran besar mampu mendatangkan traffic organik lewat unggahan foto para pengunjung di TikTok dan Instagram.</p>', 'Bonekaku Admin', 'published'),
(7, '5 Tempat Penyimpanan Boneka Agar Terlihat Rapih', '5-tempat-penyimpanan-boneka-agar-terlihat-rapih', 'https://bonekaku.co.id/2020/10/10/5-tempat-penyimpanan-boneka-agar-terlihat-rapih/', 'https://bonekaku.co.id/wp-content/uploads/2020/10/Boneka-di-kasur2.jpg', '10 Oktober 2020', 'Punya banyak koleksi boneka tapi ruangan terasa sempit dan berantakan? Simak 5 ide kreatif menata dan menyimpan boneka kesayangan Anda agar tetap bersih.', '<p>Tak dipungkiri bahwa terkadang boneka yang sudah kita beli atau kumpulkan selama bertahun-tahun bisa menumpuk dan membuat kamar tampak penuh. Berikut 5 solusi praktis merapikan koleksi boneka Anda:</p>\n<ul>\n  <li><b>Rak Dinding Melayang (Floating Shelves):</b> Tata boneka berdasarkan ukuran dari yang terkecil hingga terbesar di rak dinding untuk menghemat ruang lantai.</li>\n  <li><b>Kantung Gantung Pintu (Hanging Organizer):</b> Sangat efisien untuk menyimpan puluhan gantungan kunci boneka dan boneka mini ukuran 10-15 cm.</li>\n  <li><b>Kotak Penyimpanan Transparan (Storage Box):</b> Menjaga boneka tetap bebas debu sekaligus mudah dilihat saat ingin dimainkan.</li>\n  <li><b>Hammock / Jaring Sudut:</b> Manfaatkan sudut kamar kosong dengan memasang jaring anyaman untuk menampung boneka-boneka berukuran sedang.</li>\n  <li><b>Bantal Bean Bag Organizer:</b> Sarung bean bag khusus yang bagian dalamnya diisi dengan koleksi boneka, sehingga sekaligus berfungsi ganda sebagai tempat duduk santai!</li>\n</ul>', 'Bonekaku Admin', 'published'),
(8, 'Cara Merawat dan Mencuci Boneka', 'cara-merawat-dan-mencuci-boneka', 'https://bonekaku.co.id/2020/09/25/cara-merawat-dan-mencuci-boneka/', 'https://bonekaku.co.id/wp-content/uploads/2020/09/a1.jpg', '25 September 2020', 'Walau tidak terlihat kotor dari luar, boneka kesayangan juga perlu dirawat dan dibersihkan secara rutin agar bulunya tetap halus dan higienis.', '<p>Walau tidak terlihat kotor, boneka kesayangan tetap perlu dibersihkan secara berkala. Apalagi jika boneka sering dipeluk saat tidur atau dimainkan balita. Keringat, minyak alami kulit, dan debu halus dapat menempel di sela-sela serat bulu.</p>\n<h2>Tips Perawatan Harian</h2>\n<p>Gunakan rol pembersih serat pakaian (lint roller) atau sikat berbulu halus untuk mengangkat debu permukaan seminggu sekali. Jika ada noda cairan yang baru tumpah, segera tepuk-tepuk dengan kain mikrofiber lembap yang diberi sedikit sabun cair lembut tanpa menggosoknya terlalu keras.</p>\n<p>Jemur boneka di tempat yang terkena hembusan angin segar agar isian dacron di dalamnya mengembang kembali secara alami.</p>', 'Bonekaku Admin', 'published'),
(9, 'Product Baru Bonekaku Disaat Pandemi', 'product-baru-bonekaku-disaat-pandemi', 'https://bonekaku.co.id/2020/09/25/product-baru-bonekaku-disaat-pandemi/', 'https://bonekaku.co.id/wp-content/uploads/2020/09/20.jpg', '25 September 2020', 'Menghadapi tantangan pandemi, Bonekaku berinovasi meluncurkan produk masker kain bordir custom dan paket souvenir higienis untuk korporasi.', '<p>Halo sahabat bonekaku salam bahagia! Semoga selalu dilimpahkan kesehatan dan keberkahan. Menghadapi era adaptasi kebiasaan baru di masa pandemi, Bonekaku terus berinovasi menjawab kebutuhan masyarakat dengan menghadirkan lini produk masker kain non-medis bermutu tinggi.</p>\n<p>Masker kami dirancang 3 ply sesuai anjuran kesehatan, menggunakan bahan katun lembut yang nyaman bernapas, serta dapat dicetak atau dibordir dengan logo instansi perusahaan untuk kebutuhan seragam kerja karyawan.</p>', 'Bonekaku Admin', 'published'),
(10, 'Inspirasi Boneka Sebagai Objek Usaha', 'inspirasi-boneka-sebagai-objek-usaha', 'https://bonekaku.co.id/2020/08/27/inspirasi-boneka-sebagai-objek-usaha/', 'https://bonekaku.co.id/wp-content/uploads/2020/08/cafe-boneka.jpg', '27 Agustus 2020', 'Peluang bisnis souvenir boneka dan bantal custom terus terbuka lebar. Simak bagaimana para reseller dan UMKM mendulang keuntungan dari industri ini.', '<p>Beberapa pengusaha muda di kota-kota besar kini melirik potensi bisnis boneka kustom sebagai ladang bisnis yang sangat menjanjikan. Pasar boneka tidak pernah mati karena selalu berkaitan dengan momen perayaan manusia: kelahiran bayi (baby shower), ulang tahun, wisuda sarjana, pernikahan, hingga festival perusahaan.</p>\n<h2>Mengapa Berbisnis Boneka Bersama Bonekaku?</h2>\n<ul>\n  <li><b>Margin Keuntungan Menarik:</b> Harga produksi langsung dari konveksi tangan pertama memungkinkan reseller memperoleh margin yang kompetitif.</li>\n  <li><b>Custom Desain Sesuai Permintaan:</b> Anda bisa membuat brand karakter sendiri tanpa harus memiliki pabrik sendiri (maklon / OEM).</li>\n  <li><b>Dukungan Sampel Prototipe:</b> Kami membantu membuatkan sampel fisik sebelum proses produksi massal dijalankan.</li>\n</ul>', 'Bonekaku Admin', 'published'),
(11, 'Jangan Remehkan Manfaat Anak Bermain Boneka', 'jangan-remehkan-manfaat-anak-bermain-boneka', 'https://bonekaku.co.id/2020/08/26/jangan-remehkan-manfaat-anak-bermain-boneka/', 'https://bonekaku.co.id/wp-content/uploads/2020/08/Bear.jpg', '26 Agustus 2020', 'Bagi anak perempuan maupun laki-laki, bermain boneka ternyata merangsang kecerdasan emosional, empati, dan keterampilan komunikasi sosial.', '<p>Bagi anak-anak, boneka bukan sekadar mainan diam. Melalui interaksi bermain peran (pretend play) bersama boneka, anak belajar mengenali emosi, berlatih mengekspresikan rasa kasih sayang, dan membangun empati terhadap makhluk lain.</p>\n<p>Psikolog anak menegaskan bahwa berbicara dengan boneka membantu memperkaya kosakata bahasa serta melatih rasa tanggung jawab anak saat mereka berpura-pura memberi makan atau merawat bonekanya.</p>', 'Bonekaku Admin', 'published'),
(12, 'Peran Maskot untuk Perusahaan.', 'peran-maskot-untuk-perusahaan', 'https://bonekaku.co.id/2020/07/20/peran-maskot-untuk-perusahaan/', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Badut-01a.png', '20 Juli 2020', 'Pembuatan maskot bagi perusahaan atau UMKM merupakan strategi branding jangka panjang yang membangun kedekatan unik dengan pasar sasaran.', '<p>Pembuatan maskot bagi perusahaan atau UMKM merupakan sebuah strategi branding yang sangat cerdas. Di tengah maraknya persaingan bisnis serupa, maskot memberikan keunikan visual yang membedakan produk Anda dari kompetitor.</p>\n<p>Maskot yang bersahabat dapat hadir di media sosial, materi iklan televisi, packaging produk, hingga wujud boneka souvenir nyata yang dibawa pulang oleh konsumen ke rumah mereka.</p>', 'Bonekaku Admin', 'published'),
(13, 'Alasan kenapa harus memberikan Boneka sebagai merchandise.', 'alasan-kenapa-harus-memberikan-boneka-sebagai-merchandise', 'https://bonekaku.co.id/2020/07/20/alasan-kenapa-harus-memberikan-boneka-sebagai-merchandise/', 'https://bonekaku.co.id/wp-content/uploads/2018/06/Boneka_Custome.png', '20 Juli 2020', 'Dalam memberikan kenang-kenangan bagi pelanggan, boneka custom memiliki daya tahan simpan puluhan tahun dan nilai sentimental yang tidak tergantikan.', '<p>Dalam memberikan kenang-kenangan atau merchandise bagi pelanggan, boneka memiliki keunggulan yang tidak dimiliki oleh merchandise konvensional seperti pulpen atau kalender:</p>\n<ol>\n  <li><b>Masa Simpan Sangat Panjang:</b> Boneka bisa bertahan 5 hingga 10 tahun bahkan lebih di lemari pajangan atau meja kerja.</li>\n  <li><b>Nilai Sentimental Tinggi:</b> Penerima souvenir sering kali memberikan boneka tersebut kepada anak atau orang terkasih, melipatgandakan dampak positif brand Anda.</li>\n  <li><b>Desain Sangat Fleksibel:</b> Dapat disesuaikan dengan seragam perusahaan, logo bordir, maupun atribut khas acara.</li>\n</ol>', 'Bonekaku Admin', 'published'),
(14, 'Kain Boneka terbaik untuk di produksi masal', 'kain-boneka-terbaik-untuk-di-produksi-masal', 'https://bonekaku.co.id/2020/07/20/kain-boneka-terbaik-untuk-di-produksi-masal/', 'https://bonekaku.co.id/wp-content/uploads/2020/07/Bahan-Rasfur-2-1030x560-1.png', '20 Juli 2020', 'Memilih bahan kain yang tepat adalah kunci keberhasilan produksi massal boneka. Ketahui karakteristik Velboa, Yelvo, Nylex, dan Rasfur.', '<p>Dalam memproduksi boneka dengan jumlah yang banyak, Bonekaku tidak serta merta hanya memilih bahan yang murah. Kami sangat selektif menentukan kain yang tidak mudah rontok, tidak memicu alergi pada anak, dan memiliki konsistensi warna yang seragam antar roll kain.</p>\n<h2>Perbandingan Kain Populer</h2>\n<ul>\n  <li><b>Velboa:</b> Bahan paling serbaguna dengan bulu pendek rapat, sangat cocok untuk boneka karakter presisi tinggi dan sablon/bordir.</li>\n  <li><b>Yelvo:</b> Kain sintetis impor bertekstur sangat lembut dan elastis, memberikan sensasi mewah seperti boneka standar internasional.</li>\n  <li><b>Rasfur:</b> Memiliki serat bulu panjang yang lebat, ideal untuk boneka beruang (teddy bear) klasik.</li>\n  <li><b>Nylex:</b> Kain tipis bertekstur rapat tanpa bulu panjang, sangat ekonomis untuk maskot berukuran kecil atau gantungan kunci.</li>\n</ul>', 'Bonekaku Admin', 'published'),
(15, 'Produksi Boneka Partai Besar dengan Kualitas Material Terjamin dari Bonekaku.', 'produksi-boneka-partai-besar', 'https://bonekaku.co.id/2020/07/20/produksi-boneka-partai-besar/', 'https://bonekaku.co.id/wp-content/uploads/2019/09/Bears-4-2.png', '20 Juli 2020', 'Bonekaku Store didukung puluhan penjahit ahli dan mesin bordir otomatis berkapasitas ribuan pcs per minggu dengan quality control ketat.', '<p>Bonekaku Store telah berpengalaman menangani pesanan boneka partai besar hingga puluhan ribu unit untuk institusi perbankan, BUMN, instansi pemerintah, dan brand FMCG nasional.</p>\n<h2>Standar Quality Control Kami</h2>\n<p>Setiap boneka melewati tahap inspeksi ganda: mulai dari pengecekan ketegasan jahitan, simetri potongan pola, penimbangan kepadatan isian kapas silikon, hingga pembersihan sisa benang dan uji detektor logam untuk memastikan keamanan dari patahan jarum jahit.</p>', 'Bonekaku Admin', 'published'),
(16, 'Apa itu Boneka Souvenir atau Promosi ??', 'apa-itu-boneka-souvenir-atau-promosi', 'https://bonekaku.co.id/2018/05/10/mengenal-jenis-jenis-bahan-boneka-2-2-2-2-2/', 'https://bonekaku.co.id/wp-content/uploads/2018/05/IMG_0190-scaled.jpg', '10 Mei 2018', 'Boneka souvenir atau promosi adalah boneka yang dirancang khusus sebagai media komunikasi branding perusahaan dengan sentuhan unik dan bersahabat.', '<p>Boneka souvenir atau promosi adalah boneka yang dibuat khusus dengan menyematkan identitas visual suatu merek, perusahaan, komunitas, atau acara tertentu. Berbeda dengan boneka retail di supermarket yang bersifat umum, boneka promosi memiliki tujuan strategis:</p>\n<ul>\n  <li>Meningkatkan loyalitas pelanggan lama.</li>\n  <li>Memikat pelanggan baru melalui program hadiah pembelian.</li>\n  <li>Menjadi simbol apresiasi bagi karyawan berprestasi.</li>\n</ul>\n<p>Bonekaku siap mewujudkan ide souvenir boneka Anda dengan berbagai kustomisasi aksesoris seperti kaos mini sablon, topi wisuda, selempang bordir, hingga kemasan kotak mika elegan.</p>', 'Bonekaku Admin', 'published'),
(17, 'Mengenal Jenis – Jenis Bahan Boneka', 'mengenal-jenis-jenis-bahan-boneka', 'https://bonekaku.co.id/2018/05/08/mengenal-jenis-jenis-bahan-boneka-2/', 'https://bonekaku.co.id/wp-content/uploads/2018/05/Bahan-Rasfur-1.png', '8 Mei 2018', 'Panduan lengkap memahami aneka ragam kain boneka: Rasfur, Velboa, Yelvo, Nylex, Snail, hingga isian silikon dacron kualitas nomor satu.', '<p>Bagi Anda yang berencana memesan boneka secara custom, mengenal jenis bahan dasar kain dan isian adalah langkah pertama yang sangat penting agar hasil produksi sesuai dengan ekspektasi dan anggaran Anda.</p>\n<h2>1. Kain Luar (Outer Fabric)</h2>\n<p>Ada beberapa jenis kain boneka yang lazim digunakan di industri garmen boneka Indonesia:</p>\n<ul>\n  <li><b>Bahan Velboa:</b> Tekstur bulunya pendek, halus, dan warnanya cerah. Sangat disukai karena tidak mudah kotor dan mudah dibersihkan.</li>\n  <li><b>Bahan Rasfur:</b> Memiliki bulu-bulu panjang menyerupai bulu domba atau beruang liar. Memberikan kesan empuk dan mengembang.</li>\n  <li><b>Bahan Yelvo:</b> Kain dengan serat sintetis rapat yang sangat lembut, fleksibel (stretchable), dan memberi kesan mewah kelas premium.</li>\n  <li><b>Bahan Snail (Mawar):</b> Memiliki pola bulu keriting melingkar menyerupai cangkang keong atau bunga mawar mekar.</li>\n</ul>\n<h2>2. Isian Dalam (Filling)</h2>\n<p>Kami menggunakan <b>100% Silikon Dacron HCS (Hollow Conjugated Siliconized)</b> murni berwarna putih bersih tanpa campuran limbah busa giling. Isian ini sangat elastis, ringan, empuk, dan dapat kembali ke bentuk semula meski dicuci berkali-kali.</p>', 'Bonekaku Admin', 'published');

-- ------------------------------------------------------------
-- Table: article_comments
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `article_comments`;
CREATE TABLE `article_comments` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `article_slug` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email_or_url` varchar(255) DEFAULT NULL,
  `comment` text NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `article_comments_article_slug_index` (`article_slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `article_comments` (`id`, `article_slug`, `name`, `email_or_url`, `comment`, `is_admin`) VALUES
(1, 'bantal-merchandise-kenyamanan-yang-membekas-untuk-customer-anda', 'Dewi Fitriani', '', 'Artikelnya sangat informatif dan membuka wawasan mengenai pemilihan jenis bahan bantal souvenir berkualitas.', 0),
(2, 'peranan-maskot-boneka-bagi-sebuah-perusahaan', 'Bonekaku Admin', 'https://bonekaku.co.id', 'Terima kasih telah membaca. Kami siap membantu konsultasi desain 3D maskot untuk perusahaan Anda.', 1);

-- ------------------------------------------------------------
-- Table: bean_bag_prices
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `bean_bag_prices`;
CREATE TABLE `bean_bag_prices` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `size_label` varchar(100) NOT NULL,
  `dimensions` varchar(100) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `price` varchar(100) NOT NULL,
  `is_popular` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `bean_bag_prices` (`id`, `size_label`, `dimensions`, `material`, `price`, `is_popular`) VALUES
(1, 'Kecil (S)', '70 x 90 cm', 'Polyester / Katun / Canvas', 'Rp 175.000', 0),
(2, 'Sedang (M)', '90 x 120 cm', 'Polyester / Katun / Canvas', 'Rp 275.000', 1),
(3, 'Besar (L)', '110 x 140 cm', 'Polyester / Katun / Canvas', 'Rp 375.000', 0),
(4, 'Jumbo (XL)', '125 x 150 cm', 'Polyester / Katun / Canvas', 'Rp 475.000', 0);

-- ------------------------------------------------------------
-- Table: testimonials
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `quote` text NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `testimonials` (`id`, `name`, `role`, `company`, `avatar`, `quote`, `rating`) VALUES
(1, 'Rina Sasmita', 'Marketing Lead', 'PT Telkom Indonesia', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80', 'Puas banget sama hasil boneka maskotnya! Jahitan rapi, detail sesuai mock-up 3D, dan pengiriman tepat waktu untuk event tahunan kami.', 5),
(2, 'Budi Hartono', 'Event Organizer', 'Jakarta Wedding Expo', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80', 'Sudah 3 kali repeat order souvenir boneka pengantin. Tamu undangan selalu kagum dengan kualitas bahan velboa yang lembut dan kemasan premium.', 5),
(3, 'Dewi Lestari', 'HR & GA Manager', 'Bank Mandiri', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80', 'Pelayanan cepat dan komunikasi sangat responsif. Revisi sample cepat diselesaikan sampai manajemen kami puas dengan hasilnya.', 5);

-- ------------------------------------------------------------
-- Table: clients
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `clients`;
CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `logo_url` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `clients` (`id`, `name`, `logo_url`, `sort_order`) VALUES
(1, 'Telkomsel', 'https://bonekaku.co.id/wp-content/uploads/2019/09/Telkomsel.png', 1),
(2, 'Bank Mandiri', 'https://bonekaku.co.id/wp-content/uploads/2019/09/Mandiri.png', 2),
(3, 'Dipostar', 'https://bonekaku.co.id/wp-content/uploads/2019/09/Dipostar.png', 3),
(4, 'Toyota', 'https://bonekaku.co.id/wp-content/uploads/2019/09/Toyota.png', 4),
(5, 'Indofood', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Indofood.png', 5),
(6, 'Astra Daihatsu', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Astra-Daihatsu.png', 6),
(7, 'Ibis Hotel', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Ibis-Hotel.png', 7),
(8, 'Rumah Sakit Siloam', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Rumah-Sakit-Siloam.png', 8),
(9, 'Rumah Sakit Haji', 'https://bonekaku.co.id/wp-content/uploads/2019/10/Rumah-Sakit-Haji.png', 9),
(10, 'BNI', 'https://bonekaku.co.id/wp-content/uploads/2019/09/BNI.png', 10);

-- ------------------------------------------------------------
-- Table: services
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `services` (`id`, `title`, `slug`, `description`, `icon`, `sort_order`) VALUES
(1, 'Boneka Souvenir', 'boneka-souvenir', 'Pembuatan aneka boneka souvenir untuk pernikahan, ulang tahun, gathering, dan promosi bisnis dalam jumlah banyak dengan harga bersahabat.', 'gift', 1),
(2, 'Boneka Maskot & Badut', 'boneka-maskot-badut', 'Maskot perusahaan, maskot instansi pemerintah, dan kostum badut berkualitas tinggi dengan bahan adem dan rangka ergonomis.', 'user', 2),
(3, 'Bantal Custom', 'bantal-custom', 'Bantal leher, bantal foto, bantal sofa promosi, dan bantal karakter unik dengan print sublim full color anti luntur.', 'heart', 3),
(4, 'Bean Bag Berkualitas', 'bean-bag-berkualitas', 'Bean bag santai berbagai ukuran dan motif cover, cocok untuk kafe, co-working space, kantor kekinian, maupun rumah pribadi.', 'coffee', 4),
(5, 'Boneka Wisuda', 'boneka-wisuda', 'Boneka wisuda lengkap dengan toga, selempang nama bordir, logo universitas, dan kemasan mika eksklusif.', 'award', 5),
(6, 'Gantungan Kunci Boneka', 'gantungan-kunci-boneka', 'Gantungan kunci mini plush dan aksesoris tas karakter dengan jahitan presisi dan gantungan besi anti karat.', 'key', 6);

-- ------------------------------------------------------------
-- Table: settings
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `settings` (`key`, `value`) VALUES
('site_title', 'Bonekaku – Pusat Souvenir dan Boneka Terlengkap'),
('site_tagline', 'Semua tentang boneka bisa dibuat di sini'),
('site_description', 'Pusat pembuatan souvenir boneka custom, bantal, maskot dan badut promosi terpercaya sejak 2018.'),
('whatsapp_number', '6281385508611'),
('whatsapp_number_2', '62817204188'),
('email', 'marketingbonekaku@gmail.com'),
('address_1', 'Jl. Katelia Raya Blok AS-3 No. 35, Jatisampurna, Bekasi, Jawa Barat 17433'),
('address_2', 'Jln. Bogor-Bekasi No.61 Ciketing Udik, Bantar Gebang, Bekasi');

-- ------------------------------------------------------------
-- Table: contacts
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
