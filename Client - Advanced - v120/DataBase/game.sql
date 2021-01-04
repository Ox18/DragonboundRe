-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2020 at 10:10 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `Id` int(11) NOT NULL,
  `Email` varchar(120) DEFAULT NULL,
  `Name` varchar(120) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `PinUser` int(5) NOT NULL,
  `Salt` varchar(10) DEFAULT NULL,
  `Session` varchar(45) DEFAULT NULL,
  `views` int(10) NOT NULL,
  `IsOnline` int(11) DEFAULT NULL,
  `Birthday` timestamp NULL DEFAULT NULL,
  `facebook_id` varchar(70) DEFAULT '0',
  `Username` varchar(50) DEFAULT NULL,
  `IP` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`Id`, `Email`, `Name`, `Password`, `PinUser`, `Salt`, `Session`, `views`, `IsOnline`, `Birthday`, `facebook_id`, `Username`, `IP`) VALUES
(1, '', 'wilmer', 'wilmer', 1234, ':', '446a1f7005f3a5f3b8be4ed5764975b3', 4, 5, '2020-06-29 09:53:33', '0', 'wilmer', '1'),
(2, '', 'wdqwqwqddq', 'qwdqwqdw', 1321, ':', '16d62aab333752cfbcacf26fd49eea25', 0, 0, '2020-06-29 10:08:39', '0', 'wdqwqwqddq', '1'),
(3, '', 'fdbeebwb', 'ewbeweew', 4121, ':', '91afef5d55ea5c9ab041a2e8f98a8d02', 0, 0, '2020-06-29 19:38:14', '0', 'fdbeebwb', '1'),
(4, '', 'wilmer2', 'wilmer', 1234, ':', '6ae438a8732bc9e3225ee6fde28acded', 1, 0, '2020-07-01 02:44:05', '0', 'wilmer2', '1'),
(5, '', 'gaaaaaaaaaa', 'gaaaaaaaaaaa', 1234, ':', 'b42117e551912a95c2470ebf2ed1ea47', 0, 1, '2020-07-01 02:48:09', '0', 'gaaaaaaaaaa', '1'),
(6, '', 'eqqefwefwefweqw', 'efwqwqwefqew', 1231, ':', 'aeb14a3fbfd74a37854700c39a85b8d5', 0, 0, '2020-07-01 02:50:24', '0', 'eqqefwefwefweqw', '1'),
(7, '', '12211321212', '1231212123', 1212, ':', '45e9e92da221c1b5f20e68df4e489f7f', 0, 0, '2020-07-01 02:52:25', '0', '12211321212', '1'),
(8, '', 'tewqqewew', 'wqtewewqe', 1121, ':', '0fa325fe1745f67da2e733b7c4ca4053', 0, 0, '2020-07-02 19:13:17', '0', 'tewqqewew', '1'),
(9, '', 'gr443434', 'g44343g443', 3244, ':', 'b86fef228f895c37ef0520a07f62ba64', 11, 0, '2020-07-03 02:48:14', '0', 'gr443434', '1'),
(10, '', 'Alex', '123456', 1234, ':', '6d667ed3a227a7c08cce2c249913931b', 4, 6, '2020-07-03 05:03:46', '0', 'lnferno', '1'),
(11, '', 'qdwqwdqwqwdqwd', 'qdwqwqdw', 9999, ':', 'd497666cc2a9333a1986f6a5b9802071', 0, 3, '2020-07-04 05:51:22', '0', 'qdwqwdqwqwdqwd', '1'),
(12, '', 'qdwqwqdwdwqwqdq', 'qdwqwdqwqw', 9999, ':', '1406fe273219954e42b74b2de35231c5', 0, 0, '2020-07-04 05:51:56', '0', 'qdwqwqdwdwqwqdq', '1'),
(13, '', 'xddd', 'xdd', 9999, ':', 'a0430ab96bf0b223ceca30fbb742506f', 0, 3, '2020-07-04 06:08:57', '0', 'xddd', '1'),
(14, '', 'adfsdasf', 'dafsads', 9999, ':', '47b12b87b4fb4615954421b7303064d3', 0, 3, '2020-07-04 06:11:47', '0', 'adfsdasf', '1'),
(15, '', 'chupetin', '56assad', 9999, ':', '00781d1a69eec6cdabcd42108803f7d5', 0, 0, '2020-07-04 06:15:14', '0', 'chupetin', '1'),
(16, '', 'asdas', '1231223132s', 9999, ':', '066e4a975e01b3364e3a05eaf749e6f9', 0, 0, '2020-07-04 06:23:20', '0', 'asdas', '1'),
(17, '', '2wdqw', '22321321d', 0, ':', '4917f5553ca699e424bd4543d39bf184', 1, 0, '2020-07-04 06:29:38', '0', '2wdqw', '1'),
(18, '', '315665', '315665e323d', 0, ':', '47758576b506480cce180f8ad7c6eacb', 1, 0, '2020-07-04 06:56:34', '0', '315665', '1'),
(19, '', 'xdsadfds', 'dfssd', 0, ':', 'a6b60854001a70406424112574da0323', 0, 0, '2020-07-04 07:00:11', '0', 'xdsadfds', '1'),
(20, '', 'chapulin', 'wilmer', 0, ':', '665df3d6731c330b1f5ec4248dd7f073', 0, 0, '2020-07-04 07:13:01', '0', 'chapulin', '1'),
(21, '', 'sadfewfewefw', 'fewefwefw', 0, ':', 'd468f9070506c6234a163e61e1ca0ce5', 0, 6, '2020-07-05 19:50:12', '0', 'sadfewfewefw', '1'),
(22, '', 'wrewqqerweqrw', 'erweqwwerqwe', 0, ':', '9b604ec0e0b10a6bcb132c093416b9a1', 0, 0, '2020-07-05 20:44:54', '0', 'wrewqqerweqrw', '1'),
(23, '', 'Admin', 'wilmer2', 0, ':', '6066c8c4877f3197b41d64b6e88ff562', 29, 0, '2020-07-05 20:52:17', '0', 'Wilmercito', '179.6.207.92'),
(24, '', 'efwqewqewfew', 'wefweew', 0, ':', 'daa1155872d81d80f7fbec1b03e5e8f7', 0, 0, '2020-07-06 23:35:28', '0', 'efwqewqewfew', '1'),
(25, '', 'dswefeww', 'ewfwefewewweew', 0, ':', '193bf24657c7ed149852fd98d5e4f8e0', 0, 0, '2020-07-06 23:45:29', '0', 'dswefeww', '1'),
(26, '', 'rewegerwe', 'ergge', 0, ':', 'baf2b066064ebd1f4ca778fca0e148ff', 1, 3, '2020-07-07 00:49:41', '0', 'rewegerwe', '1'),
(27, '', 'dsfewfeewew', 'efwefww', 0, ':', 'ca4d826900a10b58320c9a7d9ca58d7f', 1, 0, '2020-07-07 00:52:03', '0', 'dsfewfeewew', '1'),
(28, '', 'qwkdqwklqw', 'dqwkljqw', 0, ':', '8ae2da72820c95b9848bf14cce0342d1', 1, 0, '2020-07-07 00:56:47', '0', 'qwkdqwklqw', '1'),
(29, '', 'wqdqwqw', 'qwdqwqwqw', 0, ':', '1b932b40c38adc9aa28241a6dd0efb8e', 2, 0, '2020-07-07 01:03:37', '0', 'wqdqwqw', '1'),
(30, '', 'dqwqwhqdwkqwd', 'djkljqwlkqw', 0, ':', '74eac8f79aa1dea96fcc25413c29e900', 1, 0, '2020-07-07 01:06:21', '0', 'dqwqwhqdwkqwd', '1'),
(31, '', 'enriquelol', 'magnun', 0, ':', 'cfe98fc4142998d2b0500232fea0eaed', 0, 3, '2020-07-07 02:05:42', '0', 'enriquelol', '1'),
(32, '', 'enrique', 'enrique2', 0, ':', 'fc6f7a27afa1461df92b12ef0dae9307', 3, 5, '2020-07-08 02:31:20', '0', 'enrique', '190.236.255.20'),
(33, '', 'testeo', 'wilmer2', 0, ':', '0193247faa159170489a48041814914f', 4, 0, '2020-07-08 02:36:58', '0', 'testeo', '179.7.49.207'),
(34, '', 'Alexiz', 'alex', 0, ':', 'a862dc78079e6875eb71a9751ea55d79', 0, 0, '2020-07-08 03:31:16', '0', 'Alexiz', '179.7.49.207'),
(35, '', 'holamundo', 'wilmer', 0, ':', '08d6b3fb650916e8632141ffe26f7268', 0, 0, '2020-07-08 03:41:14', '0', 'holamundo', '179.6.207.92'),
(36, '', 'ldskdslkfl', 'lekf;lwe', 0, ':', '08ff3fb841f50eb0438320d8ce86debb', 0, 0, '2020-07-08 04:03:58', '0', 'ldskdslkfl', '179.6.207.92');

-- --------------------------------------------------------

--
-- Table structure for table `account_sessions`
--

CREATE TABLE `account_sessions` (
  `session_id` varchar(120) NOT NULL,
  `expires_time` varchar(80) DEFAULT NULL,
  `data_acc` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account_sessions`
--

INSERT INTO `account_sessions` (`session_id`, `expires_time`, `data_acc`) VALUES
('2Ar0Q9pRzotQIdy9XXAKGVqGdi1EMcwF', '1594264332', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T03:12:11.640Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":33,\"rank\":21,\"acc_session\":\"0193247faa159170489a48041814914f\",\"game_id\":\"testeo\"}'),
('4nht_1edJzqsmJbCZU7_0n_nzehKRodO', '1594268498', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T04:21:37.536Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":33,\"rank\":21,\"acc_session\":\"0193247faa159170489a48041814914f\",\"game_id\":\"testeo\"}'),
('AxOKVCDG9bffm8FareoiO0MvhSMsA-SH', '1594183106', '{\"cookie\":{\"originalMaxAge\":-12307374,\"expires\":\"2020-07-08T04:38:26.141Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('c8Eapz23hVtie9LWxfs0db837sGzSpk6', '1594261461', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T02:24:21.330Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":23,\"rank\":26,\"acc_session\":\"6066c8c4877f3197b41d64b6e88ff562\",\"game_id\":\"DN\"}'),
('cBHqb8gZtUgohJaivlKwV1Zus3xi20j7', '1594267538', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T04:05:37.863Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":32,\"rank\":14,\"acc_session\":\"fc6f7a27afa1461df92b12ef0dae9307\",\"game_id\":\"enrique\"}'),
('d4z19xb7IDL8LlVY5AtcLeN47GIwOCQJ', '1594264300', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T03:11:40.342Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":33,\"rank\":21,\"acc_session\":\"0193247faa159170489a48041814914f\",\"game_id\":\"testeo\"}'),
('HcfkIu5hSCnjJVaXZOcJH13wvfjXw5RP', '1594262446', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T02:40:45.627Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":33,\"rank\":19,\"acc_session\":\"0193247faa159170489a48041814914f\",\"game_id\":\"testeo\"}'),
('ILmW2zs3ie3o4_6Dvuz456oLLxOCFHWQ', '1594265196', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T03:26:35.612Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":33,\"rank\":21,\"acc_session\":\"0193247faa159170489a48041814914f\",\"game_id\":\"testeo\"}'),
('jIQbcc5-pgHyGA0DpZUDKZLEgUSvqUyv', '1594267533', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T04:05:32.722Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":23,\"rank\":26,\"acc_session\":\"6066c8c4877f3197b41d64b6e88ff562\",\"game_id\":\"DN\"}'),
('McCBTZbt7KthQX-fFae_7vRlRZxYWZXE', '1594262555', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T02:42:34.930Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":32,\"rank\":0,\"acc_session\":\"fc6f7a27afa1461df92b12ef0dae9307\",\"game_id\":\"enrique\"}'),
('qx7u9zuQIFHgAgWZ-Fb8735D5UIo5-KN', '1594264240', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T03:10:40.432Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":33,\"rank\":21,\"acc_session\":\"0193247faa159170489a48041814914f\",\"game_id\":\"testeo\"}'),
('RZZNwRkdWWBuVFFgCfcycVQknHqB7JfY', '1594261417', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T02:23:36.887Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":23,\"rank\":26,\"acc_session\":\"6066c8c4877f3197b41d64b6e88ff562\",\"game_id\":\"DN\"}'),
('TsMgtxhsNg-kpwXWNP44gZD8QcoYxlX5', '1594263112', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T02:51:51.763Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":23,\"rank\":26,\"acc_session\":\"6066c8c4877f3197b41d64b6e88ff562\",\"game_id\":\"DN\"}'),
('Vu6U82oBnrwSdTNegQoCdqMiqLr6kl9U', '1594263512', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T02:58:31.643Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":23,\"rank\":26,\"acc_session\":\"6066c8c4877f3197b41d64b6e88ff562\",\"game_id\":\"DN\"}'),
('VvuJrsLbqGoVSaRL5pM3ZbqAyWy6DPFW', '1594268735', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T04:25:34.911Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":33,\"rank\":21,\"acc_session\":\"0193247faa159170489a48041814914f\",\"game_id\":\"testeo\"}'),
('_4MDQpMjq5uumkQws-W5v-UyEoq59Sbd', '1594261185', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-07-09T02:19:44.907Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":23,\"rank\":26,\"acc_session\":\"6066c8c4877f3197b41d64b6e88ff562\",\"game_id\":\"DN\"}');

-- --------------------------------------------------------

--
-- Table structure for table `banned`
--

CREATE TABLE `banned` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `razon` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `date` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `chat_reseller`
--

CREATE TABLE `chat_reseller` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `reseller_sms` varchar(150) CHARACTER SET utf8 NOT NULL,
  `date_sms` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_reseller`
--

INSERT INTO `chat_reseller` (`id`, `user_id`, `reseller_sms`, `date_sms`) VALUES
(1, 3, 'Bienvenidos :)', '1566524616442'),
(2, 5, 'Welcome :)', '1567102782940'),
(3, 3, 'Si deseas recargar cash, clickea en la imagen Cash for Sale.', '1567141572548'),
(4, 97, 'Welcome :D', '1567607077935');

-- --------------------------------------------------------

--
-- Table structure for table `commands`
--

CREATE TABLE `commands` (
  `Id` int(10) NOT NULL,
  `comando` varchar(10) CHARACTER SET utf8 NOT NULL,
  `gift` int(10) NOT NULL,
  `cash` varchar(10) CHARACTER SET utf8 NOT NULL,
  `text` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm` varchar(30) CHARACTER SET utf8 NOT NULL,
  `user` varchar(30) CHARACTER SET utf8 NOT NULL,
  `user_id` int(30) NOT NULL,
  `time` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `event_game`
--

CREATE TABLE `event_game` (
  `Server_Id` int(10) NOT NULL,
  `historychat` varchar(300) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `date` bigint(100) NOT NULL,
  `time` int(50) NOT NULL,
  `tipo` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `server_tournament_state` int(5) NOT NULL,
  `holiday` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event_game`
--

INSERT INTO `event_game` (`Server_Id`, `historychat`, `date`, `time`, `tipo`, `server_tournament_state`, `holiday`) VALUES
(1, 'Eber', 1594184145272, 60, 'Casamiento', 1, 304);

-- --------------------------------------------------------

--
-- Table structure for table `event_log`
--

CREATE TABLE `event_log` (
  `Id` int(11) NOT NULL,
  `Event1` bigint(50) DEFAULT 0,
  `Event2` bigint(50) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `event_log`
--

INSERT INTO `event_log` (`Id`, `Event1`, `Event2`) VALUES
(10, 0, 0),
(21, 0, 1594065055565),
(23, 1593998430499, 1594069594742),
(30, 0, 1594170483063),
(32, 1594190390126, 1594261910077),
(33, 1594194082001, 1594264314906);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `id_yo` int(11) NOT NULL,
  `id_amigo` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `id_yo`, `id_amigo`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10),
(11, 11, 11),
(12, 12, 12),
(13, 13, 13),
(14, 14, 14),
(15, 15, 15),
(16, 16, 16),
(17, 17, 17),
(18, 18, 18),
(19, 19, 19),
(20, 20, 20),
(21, 21, 21),
(22, 22, 22),
(23, 23, 23),
(24, 24, 24),
(25, 25, 25),
(26, 26, 26),
(27, 27, 27),
(28, 28, 28),
(29, 29, 29),
(30, 30, 30),
(31, 31, 31),
(34, 31, 23),
(35, 23, 31),
(36, 32, 32),
(37, 33, 33),
(38, 34, 34),
(39, 35, 35),
(40, 32, 23),
(41, 23, 32),
(42, 36, 36),
(43, 33, 23),
(44, 23, 33);

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `id` int(11) NOT NULL,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `check_ip` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guild`
--

CREATE TABLE `guild` (
  `Id` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `points` int(10) NOT NULL,
  `members` int(100) NOT NULL,
  `rank` int(10) NOT NULL,
  `img` varchar(200) NOT NULL DEFAULT '/static/images/your-logo-here.png',
  `fondo` varchar(200) NOT NULL DEFAULT '/static/images/aqua_bg.jpg',
  `about` varchar(460) NOT NULL,
  `website` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `guild`
--

INSERT INTO `guild` (`Id`, `Name`, `points`, `members`, `rank`, `img`, `fondo`, `about`, `website`) VALUES
(1, 'GM', 0, 1410, 0, '/static/images/your-logo-here.png', '/static/images/aqua_bg.jpg', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `guild_coins`
--

CREATE TABLE `guild_coins` (
  `id` int(10) NOT NULL,
  `guild_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `time_coin` varchar(30) CHARACTER SET utf8 NOT NULL,
  `date_coin` varchar(40) CHARACTER SET utf8 NOT NULL,
  `coin_img` varchar(32) CHARACTER SET utf8 NOT NULL DEFAULT '/static/images/guild_coin22.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guild_coins`
--

INSERT INTO `guild_coins` (`id`, `guild_id`, `user_id`, `time_coin`, `date_coin`, `coin_img`) VALUES
(1, 1, 3, '2019-08-22 20:38:09.676', 'Promoted to SemiLeader', '/static/images/guild_coin22.png'),
(2, 1, 3, '2019-08-22 20:38:23.879', 'Promoted to SemiLeader', '/static/images/guild_coin22.png'),
(3, 1, 1, '2019-08-23 00:03:27.843', 'Promoted to SemiLeader', '/static/images/guild_coin22.png'),
(4, 1, 1, '2019-08-23 00:03:32.078', 'Promoted to SemiLeader', '/static/images/guild_coin22.png'),
(5, 1, 1, '2019-08-23 00:03:36.906', 'Promoted to SemiLeader', '/static/images/guild_coin22.png'),
(6, 69, 511, '2019-09-05 10:01:13.422', 'Promoted to SemiLeader', '/static/images/guild_coin22.png'),
(9, 69, 246, '2019-09-12 15:01:38.747', 'Promoted to SemiLeader', '/static/images/guild_coin22.png'),
(11, 41, 281, '2019-09-19 19:30:23.344', 'Promoted to SemiLeader', '/static/images/guild_coin22.png');

-- --------------------------------------------------------

--
-- Table structure for table `guild_member`
--

CREATE TABLE `guild_member` (
  `rowsec` int(10) NOT NULL,
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Job` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `guild_member`
--

INSERT INTO `guild_member` (`rowsec`, `Id`, `UserId`, `Job`) VALUES
(1, 1, 23, 1);

-- --------------------------------------------------------

--
-- Table structure for table `info_tournament`
--

CREATE TABLE `info_tournament` (
  `id` int(10) NOT NULL,
  `tournament_server` int(10) NOT NULL,
  `tournament_start_time` varchar(70) NOT NULL,
  `tournament_end_time` varchar(70) NOT NULL,
  `tournament_gifts_users` int(100) NOT NULL,
  `tournament_state_server` varchar(100) NOT NULL,
  `tournament_check` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `info_tournament`
--

INSERT INTO `info_tournament` (`id`, `tournament_server`, `tournament_start_time`, `tournament_end_time`, `tournament_gifts_users`, `tournament_state_server`, `tournament_check`) VALUES
(1, 5, '1569700800000', '1569708000000', 0, '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `ip_user_banned`
--

CREATE TABLE `ip_user_banned` (
  `Id` int(11) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `razon` varchar(120) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `IdGM` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `my_payments`
--

CREATE TABLE `my_payments` (
  `id` int(20) NOT NULL,
  `user_id` int(10) NOT NULL,
  `Name` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Date` int(30) NOT NULL,
  `cash` int(10) NOT NULL,
  `Info` varchar(60) CHARACTER SET utf8 NOT NULL,
  `Reseller` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `my_payments`
--

INSERT INTO `my_payments` (`id`, `user_id`, `Name`, `Date`, `cash`, `Info`, `Reseller`) VALUES
(1, 444, 'Will', 1567835939, 70000, 'Pin Code', 'Eber'),
(2, 10, 'Alex', 1593841462, 10000, 'Pin Code', 'lnferno'),
(3, 10, 'Alex', 1593841504, 10200, 'Pin Code', 'lnferno'),
(4, 32, 'enrique', 1594175714, 10000, 'Pin Code', 'DN'),
(5, 23, 'DN', 1594179401, 50000, 'Pin Code', 'DN'),
(6, 23, 'DN', 1594179602, 55555, 'Pin Code', 'DN'),
(7, 33, 'testeo', 1594179604, 20000, 'Pin Code', 'DN');

-- --------------------------------------------------------

--
-- Table structure for table `pin_code`
--

CREATE TABLE `pin_code` (
  `id` int(11) NOT NULL,
  `pin` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `seller` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm_id` int(10) NOT NULL,
  `used_by` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rode` varchar(11) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `state` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `date_time` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pin_code`
--

INSERT INTO `pin_code` (`id`, `pin`, `seller`, `gm`, `gm_id`, `used_by`, `rode`, `state`, `date_time`) VALUES
(1, 'ff10-71JW-1QPU-1WNO', 'lnferno', 'lnferno', 10, '10', '10000', 'OFF', 1593841462),
(2, 're10-K3GD-5Y8Y-F4IS', 'Alex', 'lnferno', 10, '10', '10200', 'OFF', 1593841504),
(3, 'DD10-NPL3-7PWA-MQ3W', 'lnferno', 'DN', 23, '32', '10000', 'OFF', 1594175714),
(4, 'ND15-8VRA-2UYV-R7KC', 'DN', 'DN', 23, '', '15000', 'ON', 0),
(5, 'DN20-Y26A-9HBV-WX20', 'delgado', 'DN', 23, '33', '20000', 'OFF', 1594179604),
(6, 'ND50-HBQC-PGBX-ODYW', 'DN', 'DN', 23, '23', '50000', 'OFF', 1594179401),
(7, 'ND55-Z4AE-G2W2-G9GW', 'delgado', 'DN', 23, '23', '55555', 'OFF', 1594179602);

-- --------------------------------------------------------

--
-- Table structure for table `rankspecial`
--

CREATE TABLE `rankspecial` (
  `Id` int(11) NOT NULL,
  `IdAcc` int(11) NOT NULL,
  `game_id` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `rank` int(5) NOT NULL,
  `cash` int(11) NOT NULL,
  `time` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rankspecial`
--

INSERT INTO `rankspecial` (`Id`, `IdAcc`, `game_id`, `rank`, `cash`, `time`) VALUES
(3, 96, 'Jose', 30, 0, '1570427761951');

-- --------------------------------------------------------

--
-- Table structure for table `relationship`
--

CREATE TABLE `relationship` (
  `Id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `relationship_status` varchar(3) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 's',
  `relationship_with_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `relationship`
--

INSERT INTO `relationship` (`Id`, `user_id`, `relationship_status`, `relationship_with_id`) VALUES
(1, 1, 's', 0),
(2, 2, 's', 0),
(3, 3, 's', 0),
(4, 4, 's', 0),
(5, 5, 's', 0),
(6, 6, 's', 0),
(7, 7, 's', 0),
(8, 8, 's', 0),
(9, 9, 's', 0),
(10, 10, 's', 0),
(11, 11, 's', 0),
(12, 12, 's', 0),
(13, 13, 's', 0),
(14, 14, 's', 0),
(15, 15, 's', 0),
(16, 16, 's', 0),
(17, 17, 's', 0),
(18, 18, 's', 0),
(19, 19, 's', 0),
(20, 20, 's', 0),
(21, 21, 's', 0),
(22, 22, 's', 0),
(23, 23, 'm', 33),
(24, 24, 's', 0),
(25, 25, 's', 0),
(26, 26, 's', 0),
(27, 27, 's', 0),
(28, 28, 's', 0),
(29, 29, 's', 0),
(30, 30, 's', 0),
(31, 31, 's', 0),
(32, 32, 's', 0),
(33, 33, 'm', 23),
(34, 34, 's', 0),
(35, 35, 's', 0),
(36, 36, 's', 0);

-- --------------------------------------------------------

--
-- Table structure for table `screenshot_game`
--

CREATE TABLE `screenshot_game` (
  `id` int(10) NOT NULL,
  `screenshot_letters` varchar(20) NOT NULL,
  `partida_screenshot` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `screenshot_game`
--

INSERT INTO `screenshot_game` (`id`, `screenshot_letters`, `partida_screenshot`) VALUES
(1, '4jk2tyyx', '\"[1,1593984150698,3,1,1,4,6,1,0,1,3,[[0,23,\\\"DN\\\",26,10,100,0],[1,60002,\\\"Vizcarra\\\",27,50,250,1],[3,60003,\\\"Cov-19\\\",27,50,250,1],[5,60004,\\\"Faraon Love Shady\\\",27,50,250,1]]]\"'),
(2, 'na02sjge', '\"[1,1594180086383,1,1,0,8,9,0,0,0,4,[[0,23,\\\"DN\\\",26,50,250,0],[1,33,\\\"testeo\\\",19,10,100,0]]]\"');

-- --------------------------------------------------------

--
-- Table structure for table `servidores`
--

CREATE TABLE `servidores` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Tipo` int(11) DEFAULT 0,
  `Puerto` int(4) DEFAULT NULL,
  `minUser` int(11) DEFAULT 0,
  `maxUser` int(11) DEFAULT 0,
  `minRank` int(11) DEFAULT 0,
  `maxRank` int(11) DEFAULT 0,
  `timeStart` float DEFAULT NULL,
  `timeEnd` float DEFAULT NULL,
  `Active` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `servidores`
--

INSERT INTO `servidores` (`Id`, `Nombre`, `Tipo`, `Puerto`, `minUser`, `maxUser`, `minRank`, `maxRank`, `timeStart`, `timeEnd`, `Active`) VALUES
(1, 'High Ranks', 0, 9001, 0, 3000, 9, 24, 0, 0, 1),
(3, 'Mid Ranks', 0, 9002, 0, 3000, 7, 17, 0, 0, 1),
(4, 'Beginners', 0, 9003, 0, 5000, 0, 6, 0, 0, 1),
(5, 'All', 0, 9004, 0, 3000, 0, 0, 0, 0, 1),
(6, 'All', 0, 9005, 0, 2500, 0, 0, 0, 0, 1),
(7, 'Bunge.', 1, 9006, 0, 3000, 0, 0, 0, 0, 1),
(8, 'All.', 0, 9007, 0, 3000, 0, 0, 0, 0, 1),
(9, 'All.', 0, 9008, 0, 3000, 0, 0, 0, 0, 1),
(10, 'Aduka.', 1, 9009, 0, 3000, 0, 0, 0, 0, 1),
(11, 'All', 0, 9010, 0, 3000, 0, 0, 0, 0, 1),
(12, 'All', 0, 9011, 0, 3000, 0, 0, 0, 0, 1),
(13, 'All', 0, 9012, 0, 4000, 0, 0, 0, 0, 1),
(14, 'Avatar On.', 1, 9013, 0, 4000, 0, 0, 0, 0, 1),
(15, 'Avatar Off.', 1, 9014, 0, 3000, 0, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `game_id` varchar(45) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `gp` int(11) DEFAULT NULL,
  `gold` int(11) DEFAULT NULL,
  `cash` int(11) DEFAULT NULL,
  `gender` char(2) DEFAULT NULL,
  `unlock` int(11) DEFAULT NULL,
  `photo_url` varchar(200) DEFAULT NULL,
  `name_changes` int(11) DEFAULT NULL,
  `power_user` int(11) DEFAULT NULL,
  `plus10gp` int(11) DEFAULT NULL,
  `mobile_fox` int(11) DEFAULT NULL,
  `country` varchar(15) DEFAULT NULL,
  `flowers` int(11) DEFAULT NULL,
  `map_pack` int(11) DEFAULT NULL,
  `megaphones` int(11) DEFAULT NULL,
  `is_muted` varchar(15) DEFAULT '0',
  `win` int(11) DEFAULT 0,
  `loss` int(11) DEFAULT 0,
  `gm` int(2) DEFAULT 0,
  `banned` int(5) NOT NULL,
  `prixw` int(11) NOT NULL,
  `probability` int(10) NOT NULL,
  `IdAcc` int(11) NOT NULL,
  `bg_url` varchar(200) DEFAULT '/static/images/aqua_bg.jpg',
  `IP` varchar(20) NOT NULL,
  `block_friend` int(2) NOT NULL,
  `CashCharger` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `game_id`, `rank`, `gp`, `gold`, `cash`, `gender`, `unlock`, `photo_url`, `name_changes`, `power_user`, `plus10gp`, `mobile_fox`, `country`, `flowers`, `map_pack`, `megaphones`, `is_muted`, `win`, `loss`, `gm`, `banned`, `prixw`, `probability`, `IdAcc`, `bg_url`, `IP`, `block_friend`, `CashCharger`) VALUES
(1, 'wilmer', 22, 557880, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'BOT', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 1, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(2, 'wdqwqwqddq', 4, 1995, 498500, 30000, 'm', 0, '', 0, 0, 0, 0, 'BOT', 0, 0, 0, '0', 0, 1, 0, 0, 0, 0, 2, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(3, 'fdbeebwb', 0, 995, 498500, 30000, 'm', 0, '', 0, 0, 0, 0, 'BOT', 0, 0, 0, '0', 0, 1, 0, 0, 0, 0, 3, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(4, 'wilmer2', 0, 990, 497000, 30000, 'm', 0, '', 0, 0, 0, 0, 'BOT', 0, 0, 0, '0', 0, 2, 0, 0, 0, 0, 4, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(5, 'gaaaaaaaaaa', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'BOT', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 5, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(6, 'eqqefwefwefweqw', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'BOT', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 6, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(7, '12211321212', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'BOT', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 7, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(8, 'tewqqewew', 0, 990, 497000, 30000, 'm', 0, '', 0, 0, 0, 0, 'BOT', 0, 0, 0, '0', 0, 2, 0, 0, 0, 0, 8, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(9, 'gr443434', 0, 995, 498500, 30000, 'm', 0, 'https://pasionporelcine.net/wp-content/uploads/2019/11/V-de-vedetta-Cr%C3%ADtica-pel%C3%ADcula-2006-960x576.jpg', 0, 0, 0, 0, 'BOT', 0, 0, 0, '0', 0, 1, 0, 0, 0, 0, 9, 'https://oswallpapers.com/wp-content/uploads/2018/10/warty-final-ubuntu.jpg', '1', 0, 0),
(10, 'lnferno', 26, 1045, 487150, 158700, 'm', 0, '', 1, 0, 0, 0, 'BOT', 0, 0, 0, '0', 1, 13, 1, 0, 0, 0, 10, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 3),
(11, 'qdwqwdqwqwdqwd', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 11, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(12, 'qdwqwqdwdwqwqdq', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 12, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(13, 'xddd', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 13, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(14, 'adfsdasf', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 14, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(15, 'chupetin', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 15, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(16, 'asdas', 0, 1000, 500000, 30000, 'f', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 16, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(17, '2wdqw', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 17, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(18, '315665', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 18, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(19, 'xdsadfds', 0, 995, 498500, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 1, 0, 0, 0, 0, 19, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(20, 'chapulin', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 20, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(21, 'sadfewfewefw', 0, 1055, 499850, 31000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 1, 2, 0, 0, 0, 0, 21, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(22, 'wrewqqerweqrw', 0, 995, 498500, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 1, 0, 0, 0, 0, 22, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(23, 'DN', 26, 2250, 2147244747, 2147320348, 'm', 0, 'https://media2.giphy.com/media/Zb0asRm15HqCbgShD4/giphy.gif', 0, 1, 0, 0, 'PE', 0, 1, 0, '0', 21, 43, 1, 0, 0, 0, 23, 'https://i.imgur.com/4NphpEi.jpg', '179.6.207.92', 0, 2),
(24, 'efwqewqewfew', 0, 990, 497000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 2, 0, 0, 0, 0, 24, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(25, 'dswefeww', 0, 970, 491000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 6, 0, 0, 0, 0, 25, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(26, 'rewegerwe', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 26, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(27, 'dsfewfeewew', 0, 995, 498500, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 1, 0, 0, 0, 0, 27, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(28, 'qwkdqwklqw', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 28, 'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png', '1', 0, 0),
(29, 'wqdqwqw', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 29, NULL, '1', 0, 0),
(30, 'dqwqwhqdwkqwd', 0, 995, 499500, 31000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 1, 0, 0, 0, 0, 30, '/static/images/aqua_bg.jpg', '1', 0, 0),
(31, 'enriquelol', 0, 1000, 500000, 27000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 31, '/static/images/aqua_bg.jpg', '1', 0, 0),
(32, 'enrique', 0, 525, 275450, 910011, 'm', 0, '', 0, 1, 1, 0, 'PE', 0, 0, 0, '0', 10, 8, 0, 0, 0, 0, 32, '/static/images/aqua_bg.jpg', '190.236.255.20', 0, 2),
(33, 'testeo', 21, 400375, 3050, 50300, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 29, '0', 2, 4, 0, 0, 0, 0, 33, '/static/images/aqua_bg.jpg', '179.7.49.207', 0, 1),
(34, 'Alexiz', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 34, '/static/images/aqua_bg.jpg', '179.7.49.207', 0, 0),
(35, 'holamundo', 21, 450000, 500000, 27000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 35, '/static/images/aqua_bg.jpg', '179.6.207.92', 0, 0),
(36, 'ldskdslkfl', 0, 1000, 500000, 30000, 'm', 0, '', 0, 0, 0, 0, 'PE', 0, 0, 0, '0', 0, 0, 0, 0, 0, 0, 36, '/static/images/aqua_bg.jpg', '179.6.207.92', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_avatars`
--

CREATE TABLE `user_avatars` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `aId` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT 0,
  `expire` datetime DEFAULT NULL,
  `is_cash` int(2) DEFAULT 0,
  `is_gift` int(2) DEFAULT 0,
  `gift_sent_by` int(10) NOT NULL,
  `amount` int(11) DEFAULT 0,
  `expire_time` bigint(40) DEFAULT 0,
  `date_ava_time` bigint(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_avatars`
--

INSERT INTO `user_avatars` (`Id`, `UserId`, `aId`, `type`, `expire`, `is_cash`, `is_gift`, `gift_sent_by`, `amount`, `expire_time`, `date_ava_time`) VALUES
(1, 10, 2756, 0, NULL, 1, 0, 0, 0, 1594445482839, 1593840682839),
(2, 10, 4817, 0, NULL, 0, 1, 10, 0, 0, 1593841372449),
(3, 10, 4817, 0, NULL, 0, 1, 10, 0, 0, 1593841402396),
(4, 23, 3193, 0, NULL, 1, 0, 0, 0, 0, 1593983606009),
(5, 23, 3113, 0, NULL, 1, 0, 0, 0, 0, 1593983626004),
(6, 23, 3115, 1, NULL, 1, 0, 0, 0, 0, 1593983631175),
(7, 23, 3217, 2, NULL, 1, 0, 0, 0, 0, 1593983640618),
(8, 23, 2994, 4, NULL, 0, 0, 0, 0, 0, 1593983699344),
(9, 23, 2991, 5, NULL, 1, 0, 0, 0, 1594588526834, 1593983726834),
(10, 31, 3117, 0, NULL, 1, 0, 0, 0, 1594692607067, 1594087807068),
(15, 23, 4983, 0, NULL, 0, 1, 23, 0, 0, 1594175467428),
(16, 32, 3129, 0, NULL, 0, 0, 0, 0, 1596767741294, 1594175741294),
(17, 33, 894, 6, NULL, 1, 0, 0, 0, 1594780774122, 1594175974122),
(18, 32, 3117, 0, NULL, 1, 1, 33, 0, 1594780804454, 1594176004454),
(19, 32, 893, 6, NULL, 1, 0, 0, 0, 1594780864895, 1594176064895),
(20, 32, 464, 6, NULL, 1, 0, 0, 0, 1594780896239, 1594176096239),
(21, 32, 2319, 6, NULL, 1, 0, 0, 0, 1594781891863, 1594177091863),
(22, 33, 3129, 0, NULL, 0, 0, 0, 0, 0, 1594177619686),
(23, 23, 2319, 6, NULL, 1, 0, 0, 0, 1596770043193, 1594178043193),
(24, 23, 1223, 6, NULL, 1, 0, 0, 0, 1594783119665, 1594178319665),
(25, 32, 3137, 0, NULL, 0, 0, 0, 0, 1594783411103, 1594178611103),
(26, 32, 3138, 1, NULL, 0, 0, 0, 0, 1594783417510, 1594178617510),
(27, 32, 4983, 0, NULL, 0, 1, 23, 0, 0, 1594179322311),
(28, 32, 2826, 0, NULL, 1, 0, 0, 0, 0, 1594179468006),
(29, 32, 842, 0, NULL, 1, 0, 0, 0, 1594784319695, 1594179519695),
(30, 32, 841, 1, NULL, 1, 0, 0, 0, 1594784334929, 1594179534929),
(31, 32, 840, 2, NULL, 1, 0, 0, 0, 1594784354634, 1594179554634),
(32, 32, 866, 3, NULL, 1, 0, 0, 0, 1594784392076, 1594179592076),
(33, 33, 3117, 0, NULL, 1, 1, 35, 0, 1594784576316, 1594179776332),
(34, 23, 4817, 0, NULL, 0, 1, 23, 0, 0, 1594179832475),
(35, 32, 4983, 0, NULL, 0, 1, 23, 0, 0, 1594179848381),
(36, 33, 4983, 0, NULL, 0, 1, 23, 0, 0, 1594179864053),
(37, 23, 895, 6, NULL, 1, 0, 0, 0, 1594785235566, 1594180435566),
(38, 32, 2319, 6, NULL, 1, 0, 0, 0, 1594785241566, 1594180441566),
(39, 32, 895, 6, NULL, 1, 0, 0, 0, 1594785246769, 1594180446769),
(42, 32, 1063, 6, NULL, 1, 0, 0, 0, 0, 1594180476286),
(48, 23, 464, 6, NULL, 1, 0, 0, 0, 1596773007165, 1594181007165),
(50, 33, 1064, 6, NULL, 1, 0, 0, 0, 0, 1594182066317),
(51, 33, 1065, 6, NULL, 1, 0, 0, 0, 0, 1594182073442);

-- --------------------------------------------------------

--
-- Table structure for table `user_avatar_equiped`
--

CREATE TABLE `user_avatar_equiped` (
  `Id` int(11) NOT NULL,
  `head` int(11) DEFAULT NULL,
  `body` int(11) DEFAULT NULL,
  `eyes` int(11) DEFAULT NULL,
  `flag` int(11) DEFAULT NULL,
  `background` int(11) DEFAULT NULL,
  `foreground` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_avatar_equiped`
--

INSERT INTO `user_avatar_equiped` (`Id`, `head`, `body`, `eyes`, `flag`, `background`, `foreground`) VALUES
(1, 1, 2, 0, 0, 0, 0),
(2, 1, 2, 0, 0, 0, 0),
(3, 1, 2, 0, 0, 0, 0),
(4, 1, 2, 0, 0, 0, 0),
(5, 1, 2, 0, 0, 0, 0),
(6, 1, 2, 0, 0, 0, 0),
(7, 1, 2, 0, 0, 0, 0),
(8, 1, 2, 0, 0, 0, 0),
(9, 1, 2, 0, 0, 0, 0),
(10, 2756, 2, 0, 0, 0, 0),
(11, 1, 2, 0, 0, 0, 0),
(12, 1, 2, 0, 0, 0, 0),
(13, 1, 2, 0, 0, 0, 0),
(14, 1, 2, 0, 0, 0, 0),
(15, 1, 2, 0, 0, 0, 0),
(16, 3, 4, 0, 0, 0, 0),
(17, 1, 2, 0, 0, 0, 0),
(18, 1, 2, 0, 0, 0, 0),
(19, 1, 2, 0, 0, 0, 0),
(20, 1, 2, 0, 0, 0, 0),
(21, 1, 2, 0, 0, 0, 0),
(22, 1, 2, 0, 0, 0, 0),
(23, 3113, 3115, 3217, 0, 2994, 0),
(24, 1, 2, 0, 0, 0, 0),
(25, 1, 2, 0, 0, 0, 0),
(26, 1, 2, 0, 0, 0, 0),
(27, 1, 2, 0, 0, 0, 0),
(28, 1, 2, 0, 0, 0, 0),
(29, 1, 2, 0, 0, 0, 0),
(30, 1, 2, 0, 0, 0, 0),
(31, 3117, 2, 0, 0, 0, 0),
(32, 842, 841, 840, 866, 0, 0),
(33, 3117, 2, 0, 0, 0, 0),
(34, 1, 2, 0, 0, 0, 0),
(35, 1, 2, 0, 0, 0, 0),
(36, 1, 2, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_post`
--

CREATE TABLE `user_post` (
  `post_id` int(10) NOT NULL,
  `user_de` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `user_para` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `texto` varchar(900) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_post`
--

INSERT INTO `user_post` (`post_id`, `user_de`, `user_para`, `texto`, `fecha`) VALUES
(1, '10', '10', 'Hola wilmer!', '1593840732'),
(2, '10', '10', 'Abrazuka\r\n', '1593847112'),
(4, '23', '23', 'Hello everyone and welcome to my page. :)', '1593982873'),
(5, '33', '33', 'Chupetin', '1594177931'),
(6, '23', '23', 'test', '1594181665'),
(7, '23', '23', 'hola mundo!', '1594181685');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Username_UNIQUE` (`Username`);

--
-- Indexes for table `account_sessions`
--
ALTER TABLE `account_sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `banned`
--
ALTER TABLE `banned`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `chat_reseller`
--
ALTER TABLE `chat_reseller`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commands`
--
ALTER TABLE `commands`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `event_game`
--
ALTER TABLE `event_game`
  ADD PRIMARY KEY (`Server_Id`);

--
-- Indexes for table `event_log`
--
ALTER TABLE `event_log`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guild`
--
ALTER TABLE `guild`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `guild_coins`
--
ALTER TABLE `guild_coins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guild_member`
--
ALTER TABLE `guild_member`
  ADD PRIMARY KEY (`rowsec`);

--
-- Indexes for table `info_tournament`
--
ALTER TABLE `info_tournament`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ip_user_banned`
--
ALTER TABLE `ip_user_banned`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `my_payments`
--
ALTER TABLE `my_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pin_code`
--
ALTER TABLE `pin_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rankspecial`
--
ALTER TABLE `rankspecial`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `relationship`
--
ALTER TABLE `relationship`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `screenshot_game`
--
ALTER TABLE `screenshot_game`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servidores`
--
ALTER TABLE `servidores`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FKUserAcc_idx` (`IdAcc`);

--
-- Indexes for table `user_avatars`
--
ALTER TABLE `user_avatars`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `user_avatar_equiped`
--
ALTER TABLE `user_avatar_equiped`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id_UNIQUE` (`Id`);

--
-- Indexes for table `user_post`
--
ALTER TABLE `user_post`
  ADD PRIMARY KEY (`post_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `banned`
--
ALTER TABLE `banned`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_reseller`
--
ALTER TABLE `chat_reseller`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `commands`
--
ALTER TABLE `commands`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_game`
--
ALTER TABLE `event_game`
  MODIFY `Server_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guild`
--
ALTER TABLE `guild`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `guild_coins`
--
ALTER TABLE `guild_coins`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `guild_member`
--
ALTER TABLE `guild_member`
  MODIFY `rowsec` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `info_tournament`
--
ALTER TABLE `info_tournament`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ip_user_banned`
--
ALTER TABLE `ip_user_banned`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `my_payments`
--
ALTER TABLE `my_payments`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pin_code`
--
ALTER TABLE `pin_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rankspecial`
--
ALTER TABLE `rankspecial`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `relationship`
--
ALTER TABLE `relationship`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `screenshot_game`
--
ALTER TABLE `screenshot_game`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `servidores`
--
ALTER TABLE `servidores`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `user_avatars`
--
ALTER TABLE `user_avatars`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `user_post`
--
ALTER TABLE `user_post`
  MODIFY `post_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
