-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: game
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_sessions`
--

DROP TABLE IF EXISTS `account_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_sessions` (
  `session_id` varchar(120) NOT NULL,
  `expires_time` varchar(80) DEFAULT NULL,
  `data_acc` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_sessions`
--

LOCK TABLES `account_sessions` WRITE;
/*!40000 ALTER TABLE `account_sessions` DISABLE KEYS */;
INSERT INTO `account_sessions` VALUES ('3-w0PnIwdMdgNz0HY5aGB97rmNqsmzAe','1610400363','{\"cookie\":{\"originalMaxAge\":-611693,\"expires\":\"2021-01-11T21:26:02.581Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('3zjCDDiRLTc_wcVARtBlttclGZjwFQ5a','1610487541','{\"cookie\":{\"originalMaxAge\":86399970,\"expires\":\"2021-01-12T21:39:01.102Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":45,\"rank\":26,\"acc_session\":\"6d667ed3a227a7c08cce2c249913931b\",\"game_id\":\"Alex\"}'),('6APZs0ng7oxIgo28b7ngWLVaH0OZv1tZ','1610400363','{\"cookie\":{\"originalMaxAge\":-611253,\"expires\":\"2021-01-11T21:26:02.716Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('aBYrzRJe6AJWaoMzw8HQwyFXV-Fcc3C-','1610400363','{\"cookie\":{\"originalMaxAge\":-611670,\"expires\":\"2021-01-11T21:26:02.590Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('CVCfUu20N8C8rbEGrTn8vZVYOLizetU_','1610414961','{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2021-01-12T01:29:20.617Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":47,\"rank\":0,\"acc_session\":\"2a18dd62777637b3de4017eb886869a7\",\"game_id\":\"Zamy\"}'),('DJL-b8Cce27Moi9fYMluL4tCyGlhIM8k','1610417300','{\"cookie\":{\"originalMaxAge\":86399997,\"expires\":\"2021-01-12T02:08:20.355Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":47,\"rank\":0,\"acc_session\":\"2a18dd62777637b3de4017eb886869a7\",\"game_id\":\"Zamy\"}'),('dYOY_PvurNltm8-pBX4QVVb5Fg-vHNyT','1610412985','{\"cookie\":{\"originalMaxAge\":86399997,\"expires\":\"2021-01-12T00:56:25.134Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":47,\"rank\":0,\"acc_session\":\"2a18dd62777637b3de4017eb886869a7\",\"game_id\":\"Zamy\"}'),('eqQnd6C5Obndh9fwOIJM6XG22sh2jAZl','1610400363','{\"cookie\":{\"originalMaxAge\":-612388,\"expires\":\"2021-01-11T21:26:02.574Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('FK8t_awlgikS8dvh07PS6-qMSHK3LtDd','1610400363','{\"cookie\":{\"originalMaxAge\":-611664,\"expires\":\"2021-01-11T21:26:02.594Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('hKCD6Ls3qBSdKWrR_3XnB3F5L6FU6XzT','1610400363','{\"cookie\":{\"originalMaxAge\":-611659,\"expires\":\"2021-01-11T21:26:02.598Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('HLxicaDGH0EdGKJ1mAssGnsrYYGmA9ZI','1610400363','{\"cookie\":{\"originalMaxAge\":-612035,\"expires\":\"2021-01-11T21:26:02.573Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('iJOyPgMFT3VadlDun70D9tRIhWtZfMEo','1610408716','{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-01-11T23:45:15.912Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":47,\"rank\":0,\"acc_session\":\"2a18dd62777637b3de4017eb886869a7\",\"game_id\":\"Zamy\"}'),('iLbPcBeL5jDQpt0rERfagk-GxZ31Pq1H','1610414521','{\"cookie\":{\"originalMaxAge\":86399998,\"expires\":\"2021-01-12T01:22:01.479Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":47,\"rank\":0,\"acc_session\":\"2a18dd62777637b3de4017eb886869a7\",\"game_id\":\"Zamy\"}'),('lG5kqakLBUB4QJuIl-Ksg3z_Kwt_WczW','1610400363','{\"cookie\":{\"originalMaxAge\":-612414,\"expires\":\"2021-01-11T21:26:02.574Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('LIYQB8JTsn9oylfsp24xeBOJHHB30cSW','1610400363','{\"cookie\":{\"originalMaxAge\":-611680,\"expires\":\"2021-01-11T21:26:02.591Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('nMi3zCmQlwHwWZAN8hS6GJRytRNFGMoe','1610400363','{\"cookie\":{\"originalMaxAge\":-612417,\"expires\":\"2021-01-11T21:26:02.574Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('oPZ9u8AunSo4i2UoOoGowExU5iEoN65o','1610406579','{\"cookie\":{\"originalMaxAge\":86399986,\"expires\":\"2021-01-11T23:09:38.946Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":45,\"rank\":26,\"acc_session\":\"6d667ed3a227a7c08cce2c249913931b\",\"game_id\":\"Alex\"}'),('P9PP3zqvk3qu2UDlStDcTXB9aitMOY-z','1610400363','{\"cookie\":{\"originalMaxAge\":-611677,\"expires\":\"2021-01-11T21:26:02.589Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('slfzx5fpMqf2FQjSwMafHefB_AYtDstB','1610400363','{\"cookie\":{\"originalMaxAge\":-612980,\"expires\":\"2021-01-11T21:26:02.572Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('UvWpXi6blPBUqUD2ak0uTo-k2bolFL9u','1610413979','{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2021-01-12T01:12:58.787Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":47,\"rank\":0,\"acc_session\":\"2a18dd62777637b3de4017eb886869a7\",\"game_id\":\"Zamy\"}'),('vpCndHa184LhH9iz4KKub72aql6Y9GVc','1610400363','{\"cookie\":{\"originalMaxAge\":-612423,\"expires\":\"2021-01-11T21:26:02.572Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('vwICo4TnyHaGNQ9etyUX6OyEMLmlVOWB','1610400363','{\"cookie\":{\"originalMaxAge\":-612397,\"expires\":\"2021-01-11T21:26:02.573Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('wYHASF4Oql4pHM9uBjkyQ3Nmguy5GajN','1610416546','{\"cookie\":{\"originalMaxAge\":86399996,\"expires\":\"2021-01-12T01:55:46.417Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":47,\"rank\":0,\"acc_session\":\"2a18dd62777637b3de4017eb886869a7\",\"game_id\":\"Zamy\"}'),('WZglwE_EWC2eXpkIBLa-IlQ1QusXhDbA','1610400363','{\"cookie\":{\"originalMaxAge\":-611672,\"expires\":\"2021-01-11T21:26:02.592Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),('xyzTnVHZUP-Ku8FDqAJEcQJF6PZbl735','1610400363','{\"cookie\":{\"originalMaxAge\":-612044,\"expires\":\"2021-01-11T21:26:02.571Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `account_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(120) DEFAULT NULL,
  `Name` varchar(120) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `PinUser` int(5) NOT NULL DEFAULT '0',
  `Salt` varchar(10) DEFAULT NULL,
  `Session` varchar(45) DEFAULT NULL,
  `views` int(10) NOT NULL DEFAULT '0',
  `IsOnline` int(11) DEFAULT NULL,
  `Birthday` timestamp NULL DEFAULT NULL,
  `facebook_id` varchar(70) DEFAULT '0',
  `Username` varchar(50) DEFAULT NULL,
  `IP` varchar(30) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'','wilmer','wilmer',1234,':','446a1f7005f3a5f3b8be4ed5764975b3',350,5,'2020-06-29 09:53:33','0','wilmer','1'),(2,'','wdqwqwqddq','qwdqwqdw',1321,':','16d62aab333752cfbcacf26fd49eea25',0,0,'2020-06-29 10:08:39','0','wdqwqwqddq','1'),(3,'','fdbeebwb','ewbeweew',4121,':','91afef5d55ea5c9ab041a2e8f98a8d02',0,0,'2020-06-29 19:38:14','0','fdbeebwb','1'),(4,'','wilmer2','wilmer',1234,':','6ae438a8732bc9e3225ee6fde28acded',1,0,'2020-07-01 02:44:05','0','wilmer2','1'),(5,'','gaaaaaaaaaa','gaaaaaaaaaaa',1234,':','b42117e551912a95c2470ebf2ed1ea47',0,1,'2020-07-01 02:48:09','0','gaaaaaaaaaa','1'),(6,'','eqqefwefwefweqw','efwqwqwefqew',1231,':','aeb14a3fbfd74a37854700c39a85b8d5',0,0,'2020-07-01 02:50:24','0','eqqefwefwefweqw','1'),(7,'','12211321212','1231212123',1212,':','45e9e92da221c1b5f20e68df4e489f7f',0,0,'2020-07-01 02:52:25','0','12211321212','1'),(8,'','tewqqewew','wqtewewqe',1121,':','0fa325fe1745f67da2e733b7c4ca4053',0,0,'2020-07-02 19:13:17','0','tewqqewew','1'),(9,'','gr443434','g44343g443',3244,':','b86fef228f895c37ef0520a07f62ba64',11,0,'2020-07-03 02:48:14','0','gr443434','1'),(10,'','Alex','123456',1234,':','6d667ed3a227a7c08cce2c249913931b',4,6,'2020-07-03 05:03:46','0','lnferno','1'),(11,'','qdwqwdqwqwdqwd','qdwqwqdw',9999,':','d497666cc2a9333a1986f6a5b9802071',0,3,'2020-07-04 05:51:22','0','qdwqwdqwqwdqwd','1'),(12,'','qdwqwqdwdwqwqdq','qdwqwdqwqw',9999,':','1406fe273219954e42b74b2de35231c5',0,0,'2020-07-04 05:51:56','0','qdwqwqdwdwqwqdq','1'),(13,'','xddd','xdd',9999,':','a0430ab96bf0b223ceca30fbb742506f',0,3,'2020-07-04 06:08:57','0','xddd','1'),(14,'','adfsdasf','dafsads',9999,':','47b12b87b4fb4615954421b7303064d3',0,3,'2020-07-04 06:11:47','0','adfsdasf','1'),(15,'','chupetin','56assad',9999,':','00781d1a69eec6cdabcd42108803f7d5',0,0,'2020-07-04 06:15:14','0','chupetin','1'),(16,'','asdas','1231223132s',9999,':','066e4a975e01b3364e3a05eaf749e6f9',0,0,'2020-07-04 06:23:20','0','asdas','1'),(17,'','2wdqw','22321321d',0,':','4917f5553ca699e424bd4543d39bf184',1,0,'2020-07-04 06:29:38','0','2wdqw','1'),(18,'','315665','315665e323d',0,':','47758576b506480cce180f8ad7c6eacb',1,0,'2020-07-04 06:56:34','0','315665','1'),(19,'','xdsadfds','dfssd',0,':','a6b60854001a70406424112574da0323',0,0,'2020-07-04 07:00:11','0','xdsadfds','1'),(20,'','chapulin','wilmer',0,':','665df3d6731c330b1f5ec4248dd7f073',0,0,'2020-07-04 07:13:01','0','chapulin','1'),(21,'','sadfewfewefw','fewefwefw',0,':','d468f9070506c6234a163e61e1ca0ce5',0,6,'2020-07-05 19:50:12','0','sadfewfewefw','1'),(22,'','wrewqqerweqrw','erweqwwerqwe',0,':','9b604ec0e0b10a6bcb132c093416b9a1',0,0,'2020-07-05 20:44:54','0','wrewqqerweqrw','1'),(23,'','Admin','wilmer2',0,':','6066c8c4877f3197b41d64b6e88ff562',88,0,'2020-07-05 20:52:17','0','Wilmercito','179.6.207.92'),(24,'','efwqewqewfew','wefweew',0,':','daa1155872d81d80f7fbec1b03e5e8f7',0,0,'2020-07-06 23:35:28','0','efwqewqewfew','1'),(25,'','dswefeww','ewfwefewewweew',0,':','193bf24657c7ed149852fd98d5e4f8e0',0,0,'2020-07-06 23:45:29','0','dswefeww','1'),(26,'','rewegerwe','ergge',0,':','baf2b066064ebd1f4ca778fca0e148ff',1,3,'2020-07-07 00:49:41','0','rewegerwe','1'),(27,'','dsfewfeewew','efwefww',0,':','ca4d826900a10b58320c9a7d9ca58d7f',1,0,'2020-07-07 00:52:03','0','dsfewfeewew','1'),(28,'','qwkdqwklqw','dqwkljqw',0,':','8ae2da72820c95b9848bf14cce0342d1',1,0,'2020-07-07 00:56:47','0','qwkdqwklqw','1'),(29,'','wqdqwqw','qwdqwqwqw',0,':','1b932b40c38adc9aa28241a6dd0efb8e',2,0,'2020-07-07 01:03:37','0','wqdqwqw','1'),(30,'','dqwqwhqdwkqwd','djkljqwlkqw',0,':','74eac8f79aa1dea96fcc25413c29e900',1,0,'2020-07-07 01:06:21','0','dqwqwhqdwkqwd','1'),(31,'','enriquelol','magnun',0,':','cfe98fc4142998d2b0500232fea0eaed',0,3,'2020-07-07 02:05:42','0','enriquelol','1'),(32,'','enrique','enrique2',0,':','fc6f7a27afa1461df92b12ef0dae9307',3,5,'2020-07-08 02:31:20','0','enrique','190.236.255.20'),(33,'','testeo','wilmer2',0,':','0193247faa159170489a48041814914f',4,0,'2020-07-08 02:36:58','0','testeo','179.7.49.207'),(34,'','Alexiz','alex',0,':','a862dc78079e6875eb71a9751ea55d79',0,0,'2020-07-08 03:31:16','0','Alexiz','179.7.49.207'),(35,'','holamundo','wilmer',0,':','08d6b3fb650916e8632141ffe26f7268',2,0,'2020-07-08 03:41:14','0','holamundo','179.6.207.92'),(36,'','ldskdslkfl','lekf;lwe',0,':','08ff3fb841f50eb0438320d8ce86debb',0,0,'2020-07-08 04:03:58','0','ldskdslkfl','179.6.207.92'),(37,'','fqeweqwew','qfeweqw',0,':','22f09d22a85d8632f7793ef99e63c6d4',0,0,'2021-01-07 19:43:11','0','fqeweqwew','1'),(38,'','wilmer13213','qfewe1234qw',0,':','987c3ae2e74cfefd6940229b2b07a4ae',0,0,'2021-01-07 19:44:26','0','wilmer13213','1'),(39,'','thepatan123','qfewe1234qw',0,':','f49825b734b6e01363f9005066f63ce7',0,0,'2021-01-07 19:45:16','0','thepatan123','1'),(40,'','thepatan1232','qfewe1234qw',0,':','d1900e8b05aa70aa6bcb4dab24bf99d8',0,0,'2021-01-07 19:46:07','0','thepatan1232','1'),(41,'','thepatan12322','qfewe1234qw',0,':','acf1966d8bc4593d5222e06c12085575',0,0,'2021-01-07 19:46:50','0','thepatan12322','1'),(42,'','thepatan123222','qfewe1234qw',0,':','de250c505bc8a54f85685e12680a6a87',0,0,'2021-01-07 19:47:18','0','thepatan123222','1'),(43,'','wilmer231231221','delgado',0,':','4668b3949877f6157c24ce5926561f94',0,0,'2021-01-07 19:52:09','0','wilmer231231221','1'),(44,'','qfeqewfwe','123456',0,':','5645b8f516cc3440c6502703afd294f8',46,0,'2021-01-07 20:01:21','0','qfeqewfwe','1'),(45,'','Alex','wilmer',0,':','6d667ed3a227a7c08cce2c249913931b',206,0,'2021-01-10 20:26:44','0','Alex','1'),(46,'','qewfqweqewwq','qewfqew',0,':','4be6f36e09f5e81b7baffc6fad61d9fa',0,0,'2021-01-10 23:44:45','0','qewfqweqewwq','1'),(47,'','Zamy','wilmer',0,':','2a18dd62777637b3de4017eb886869a7',6,0,'2021-01-10 23:44:52','0','Zamy','1');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banned`
--

DROP TABLE IF EXISTS `banned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banned` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `razon` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `date` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm_id` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banned`
--

LOCK TABLES `banned` WRITE;
/*!40000 ALTER TABLE `banned` DISABLE KEYS */;
/*!40000 ALTER TABLE `banned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_reseller`
--

DROP TABLE IF EXISTS `chat_reseller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_reseller` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `reseller_sms` varchar(150) CHARACTER SET utf8 NOT NULL,
  `date_sms` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_reseller`
--

LOCK TABLES `chat_reseller` WRITE;
/*!40000 ALTER TABLE `chat_reseller` DISABLE KEYS */;
INSERT INTO `chat_reseller` VALUES (1,3,'Bienvenidos :)','1566524616442'),(2,5,'Welcome :)','1567102782940'),(3,3,'Si deseas recargar cash, clickea en la imagen Cash for Sale.','1567141572548'),(4,97,'Welcome :D','1567607077935');
/*!40000 ALTER TABLE `chat_reseller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commands`
--

DROP TABLE IF EXISTS `commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commands` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `comando` varchar(10) CHARACTER SET utf8 NOT NULL,
  `gift` int(10) NOT NULL,
  `cash` varchar(10) CHARACTER SET utf8 NOT NULL,
  `text` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm` varchar(30) CHARACTER SET utf8 NOT NULL,
  `user` varchar(30) CHARACTER SET utf8 NOT NULL,
  `user_id` int(30) NOT NULL,
  `time` varchar(100) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commands`
--

LOCK TABLES `commands` WRITE;
/*!40000 ALTER TABLE `commands` DISABLE KEYS */;
/*!40000 ALTER TABLE `commands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_game`
--

DROP TABLE IF EXISTS `event_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_game` (
  `Server_Id` int(10) NOT NULL AUTO_INCREMENT,
  `historychat` varchar(300) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `date` bigint(100) NOT NULL,
  `time` int(50) NOT NULL,
  `tipo` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `server_tournament_state` int(5) NOT NULL,
  `holiday` int(10) NOT NULL,
  PRIMARY KEY (`Server_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_game`
--

LOCK TABLES `event_game` WRITE;
/*!40000 ALTER TABLE `event_game` DISABLE KEYS */;
INSERT INTO `event_game` VALUES (1,'Eber',1594184145272,60,'Casamiento',1,304);
/*!40000 ALTER TABLE `event_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_log`
--

DROP TABLE IF EXISTS `event_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_log` (
  `Id` int(11) NOT NULL,
  `Event1` bigint(50) DEFAULT '0',
  `Event2` bigint(50) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_log`
--

LOCK TABLES `event_log` WRITE;
/*!40000 ALTER TABLE `event_log` DISABLE KEYS */;
INSERT INTO `event_log` VALUES (10,0,0),(21,0,1594065055565),(23,1593998430499,1594069594742),(30,0,1594170483063),(32,1594190390126,1594261910077),(33,1594194082001,1594264314906);
/*!40000 ALTER TABLE `event_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_yo` int(11) NOT NULL,
  `id_amigo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5),(6,6,6),(7,7,7),(8,8,8),(9,9,9),(10,10,10),(11,11,11),(12,12,12),(13,13,13),(14,14,14),(15,15,15),(16,16,16),(17,17,17),(18,18,18),(19,19,19),(20,20,20),(21,21,21),(22,22,22),(23,23,23),(24,24,24),(25,25,25),(26,26,26),(27,27,27),(28,28,28),(29,29,29),(30,30,30),(31,31,31),(34,31,23),(35,23,31),(36,32,32),(37,33,33),(38,34,34),(39,35,35),(40,32,23),(41,23,32),(42,36,36),(43,33,23),(44,23,33),(45,42,42),(46,43,43),(47,44,44),(48,45,45),(49,46,46),(50,47,47);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `check_ip` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guild`
--

DROP TABLE IF EXISTS `guild`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guild` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `points` int(10) NOT NULL,
  `members` int(100) NOT NULL,
  `rank` int(10) NOT NULL,
  `img` varchar(200) NOT NULL DEFAULT '/static/images/your-logo-here.png',
  `fondo` varchar(200) NOT NULL DEFAULT '/static/images/aqua_bg.jpg',
  `about` varchar(460) NOT NULL,
  `website` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guild`
--

LOCK TABLES `guild` WRITE;
/*!40000 ALTER TABLE `guild` DISABLE KEYS */;
INSERT INTO `guild` VALUES (1,'GM',0,1410,0,'/static/images/your-logo-here.png','/static/images/aqua_bg.jpg','','');
/*!40000 ALTER TABLE `guild` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guild_coins`
--

DROP TABLE IF EXISTS `guild_coins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guild_coins` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `guild_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `time_coin` varchar(30) CHARACTER SET utf8 NOT NULL,
  `date_coin` varchar(40) CHARACTER SET utf8 NOT NULL,
  `coin_img` varchar(32) CHARACTER SET utf8 NOT NULL DEFAULT '/static/images/guild_coin22.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guild_coins`
--

LOCK TABLES `guild_coins` WRITE;
/*!40000 ALTER TABLE `guild_coins` DISABLE KEYS */;
INSERT INTO `guild_coins` VALUES (1,1,3,'2019-08-22 20:38:09.676','Promoted to SemiLeader','/static/images/guild_coin22.png'),(2,1,3,'2019-08-22 20:38:23.879','Promoted to SemiLeader','/static/images/guild_coin22.png'),(3,1,1,'2019-08-23 00:03:27.843','Promoted to SemiLeader','/static/images/guild_coin22.png'),(4,1,1,'2019-08-23 00:03:32.078','Promoted to SemiLeader','/static/images/guild_coin22.png'),(5,1,1,'2019-08-23 00:03:36.906','Promoted to SemiLeader','/static/images/guild_coin22.png'),(6,69,511,'2019-09-05 10:01:13.422','Promoted to SemiLeader','/static/images/guild_coin22.png'),(9,69,246,'2019-09-12 15:01:38.747','Promoted to SemiLeader','/static/images/guild_coin22.png'),(11,41,281,'2019-09-19 19:30:23.344','Promoted to SemiLeader','/static/images/guild_coin22.png');
/*!40000 ALTER TABLE `guild_coins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guild_member`
--

DROP TABLE IF EXISTS `guild_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guild_member` (
  `rowsec` int(10) NOT NULL AUTO_INCREMENT,
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Job` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`rowsec`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guild_member`
--

LOCK TABLES `guild_member` WRITE;
/*!40000 ALTER TABLE `guild_member` DISABLE KEYS */;
INSERT INTO `guild_member` VALUES (1,1,23,1);
/*!40000 ALTER TABLE `guild_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_tournament`
--

DROP TABLE IF EXISTS `info_tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `info_tournament` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tournament_server` int(10) NOT NULL,
  `tournament_start_time` varchar(70) NOT NULL,
  `tournament_end_time` varchar(70) NOT NULL,
  `tournament_gifts_users` int(100) NOT NULL,
  `tournament_state_server` varchar(100) NOT NULL,
  `tournament_check` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_tournament`
--

LOCK TABLES `info_tournament` WRITE;
/*!40000 ALTER TABLE `info_tournament` DISABLE KEYS */;
INSERT INTO `info_tournament` VALUES (1,5,'1569700800000','1569708000000',0,'0','0');
/*!40000 ALTER TABLE `info_tournament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ip_user_banned`
--

DROP TABLE IF EXISTS `ip_user_banned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ip_user_banned` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) NOT NULL,
  `razon` varchar(120) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `IdGM` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ip_user_banned`
--

LOCK TABLES `ip_user_banned` WRITE;
/*!40000 ALTER TABLE `ip_user_banned` DISABLE KEYS */;
/*!40000 ALTER TABLE `ip_user_banned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_payments`
--

DROP TABLE IF EXISTS `my_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_payments` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `Name` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Date` int(30) NOT NULL,
  `cash` int(10) NOT NULL,
  `Info` varchar(60) CHARACTER SET utf8 NOT NULL,
  `Reseller` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_payments`
--

LOCK TABLES `my_payments` WRITE;
/*!40000 ALTER TABLE `my_payments` DISABLE KEYS */;
INSERT INTO `my_payments` VALUES (1,444,'Will',1567835939,70000,'Pin Code','Eber'),(2,10,'Alex',1593841462,10000,'Pin Code','lnferno'),(3,10,'Alex',1593841504,10200,'Pin Code','lnferno'),(4,32,'enrique',1594175714,10000,'Pin Code','DN'),(5,23,'DN',1594179401,50000,'Pin Code','DN'),(6,23,'DN',1594179602,55555,'Pin Code','DN'),(7,33,'testeo',1594179604,20000,'Pin Code','DN');
/*!40000 ALTER TABLE `my_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pin_code`
--

DROP TABLE IF EXISTS `pin_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pin_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pin` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `seller` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gm_id` int(10) NOT NULL,
  `used_by` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rode` varchar(11) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `state` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `date_time` int(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pin_code`
--

LOCK TABLES `pin_code` WRITE;
/*!40000 ALTER TABLE `pin_code` DISABLE KEYS */;
INSERT INTO `pin_code` VALUES (1,'ff10-71JW-1QPU-1WNO','lnferno','lnferno',10,'10','10000','OFF',1593841462),(2,'re10-K3GD-5Y8Y-F4IS','Alex','lnferno',10,'10','10200','OFF',1593841504),(3,'DD10-NPL3-7PWA-MQ3W','lnferno','DN',23,'32','10000','OFF',1594175714),(4,'ND15-8VRA-2UYV-R7KC','DN','DN',23,'','15000','ON',0),(5,'DN20-Y26A-9HBV-WX20','delgado','DN',23,'33','20000','OFF',1594179604),(6,'ND50-HBQC-PGBX-ODYW','DN','DN',23,'23','50000','OFF',1594179401),(7,'ND55-Z4AE-G2W2-G9GW','delgado','DN',23,'23','55555','OFF',1594179602);
/*!40000 ALTER TABLE `pin_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rankspecial`
--

DROP TABLE IF EXISTS `rankspecial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rankspecial` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdAcc` int(11) NOT NULL,
  `game_id` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `rank` int(5) NOT NULL,
  `cash` int(11) NOT NULL,
  `time` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rankspecial`
--

LOCK TABLES `rankspecial` WRITE;
/*!40000 ALTER TABLE `rankspecial` DISABLE KEYS */;
INSERT INTO `rankspecial` VALUES (3,96,'Jose',30,0,'1570427761951');
/*!40000 ALTER TABLE `rankspecial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship`
--

DROP TABLE IF EXISTS `relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationship` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `relationship_status` varchar(3) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 's',
  `relationship_with_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship`
--

LOCK TABLES `relationship` WRITE;
/*!40000 ALTER TABLE `relationship` DISABLE KEYS */;
INSERT INTO `relationship` VALUES (1,1,'s',0),(2,2,'s',0),(3,3,'s',0),(4,4,'s',0),(5,5,'s',0),(6,6,'s',0),(7,7,'s',0),(8,8,'s',0),(9,9,'s',0),(10,10,'s',0),(11,11,'s',0),(12,12,'s',0),(13,13,'s',0),(14,14,'s',0),(15,15,'s',0),(16,16,'s',0),(17,17,'s',0),(18,18,'s',0),(19,19,'s',0),(20,20,'s',0),(21,21,'s',0),(22,22,'s',0),(23,23,'m',33),(24,24,'s',0),(25,25,'s',0),(26,26,'s',0),(27,27,'s',0),(28,28,'s',0),(29,29,'s',0),(30,30,'s',0),(31,31,'s',0),(32,32,'s',0),(33,33,'m',23),(34,34,'s',0),(35,35,'s',0),(36,36,'s',0),(37,42,'s',0),(38,43,'s',0),(39,44,'s',0),(40,45,'s',0),(41,46,'s',0),(42,47,'s',0);
/*!40000 ALTER TABLE `relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screenshot_game`
--

DROP TABLE IF EXISTS `screenshot_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screenshot_game` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `screenshot_letters` varchar(20) NOT NULL,
  `partida_screenshot` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screenshot_game`
--

LOCK TABLES `screenshot_game` WRITE;
/*!40000 ALTER TABLE `screenshot_game` DISABLE KEYS */;
INSERT INTO `screenshot_game` VALUES (1,'4jk2tyyx','\"[1,1593984150698,3,1,1,4,6,1,0,1,3,[[0,23,\\\"DN\\\",26,10,100,0],[1,60002,\\\"Vizcarra\\\",27,50,250,1],[3,60003,\\\"Cov-19\\\",27,50,250,1],[5,60004,\\\"Faraon Love Shady\\\",27,50,250,1]]]\"'),(2,'na02sjge','\"[1,1594180086383,1,1,0,8,9,0,0,0,4,[[0,23,\\\"DN\\\",26,50,250,0],[1,33,\\\"testeo\\\",19,10,100,0]]]\"');
/*!40000 ALTER TABLE `screenshot_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servidores`
--

DROP TABLE IF EXISTS `servidores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servidores` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  `Tipo` int(11) DEFAULT '0',
  `Puerto` int(4) DEFAULT NULL,
  `minUser` int(11) DEFAULT '0',
  `maxUser` int(11) DEFAULT '0',
  `minRank` int(11) DEFAULT '0',
  `maxRank` int(11) DEFAULT '0',
  `timeStart` float DEFAULT NULL,
  `timeEnd` float DEFAULT NULL,
  `Active` int(11) DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servidores`
--

LOCK TABLES `servidores` WRITE;
/*!40000 ALTER TABLE `servidores` DISABLE KEYS */;
INSERT INTO `servidores` VALUES (1,'High Ranks',0,9001,0,3000,9,24,0,0,1),(3,'Mid Ranks',0,9002,0,3000,7,17,0,0,1),(4,'Beginners',0,9003,0,5000,0,6,0,0,1),(5,'All',0,9004,0,3000,0,0,0,0,1),(6,'All',0,9005,0,2500,0,0,0,0,1),(7,'Bunge.',1,9006,0,3000,0,0,0,0,1),(8,'All.',0,9007,0,3000,0,0,0,0,1),(9,'All.',0,9008,0,3000,0,0,0,0,1),(10,'Aduka.',1,9009,0,3000,0,0,0,0,1),(11,'All',0,9010,0,3000,0,0,0,0,1),(12,'All',0,9011,0,3000,0,0,0,0,1),(13,'All',0,9012,0,4000,0,0,0,0,1),(14,'Avatar On.',1,9013,0,4000,0,0,0,0,1),(15,'Avatar Off.',1,9014,0,3000,0,0,0,0,1);
/*!40000 ALTER TABLE `servidores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_avatar_equiped`
--

DROP TABLE IF EXISTS `user_avatar_equiped`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_avatar_equiped` (
  `Id` int(11) NOT NULL,
  `head` int(11) DEFAULT NULL,
  `body` int(11) DEFAULT NULL,
  `eyes` int(11) DEFAULT NULL,
  `flag` int(11) DEFAULT NULL,
  `background` int(11) DEFAULT NULL,
  `foreground` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_avatar_equiped`
--

LOCK TABLES `user_avatar_equiped` WRITE;
/*!40000 ALTER TABLE `user_avatar_equiped` DISABLE KEYS */;
INSERT INTO `user_avatar_equiped` VALUES (1,1,2,0,0,0,0),(2,1,2,0,0,0,0),(3,1,2,0,0,0,0),(4,1,2,0,0,0,0),(5,1,2,0,0,0,0),(6,1,2,0,0,0,0),(7,1,2,0,0,0,0),(8,1,2,0,0,0,0),(9,1,2,0,0,0,0),(10,2756,2,0,0,0,0),(11,1,2,0,0,0,0),(12,1,2,0,0,0,0),(13,1,2,0,0,0,0),(14,1,2,0,0,0,0),(15,1,2,0,0,0,0),(16,3,4,0,0,0,0),(17,1,2,0,0,0,0),(18,1,2,0,0,0,0),(19,1,2,0,0,0,0),(20,1,2,0,0,0,0),(21,1,2,0,0,0,0),(22,1,2,0,0,0,0),(23,3113,3115,3217,0,2994,0),(24,1,2,0,0,0,0),(25,1,2,0,0,0,0),(26,1,2,0,0,0,0),(27,1,2,0,0,0,0),(28,1,2,0,0,0,0),(29,1,2,0,0,0,0),(30,1,2,0,0,0,0),(31,3117,2,0,0,0,0),(32,842,841,840,866,0,0),(33,3117,2,0,0,0,0),(34,1,2,0,0,0,0),(35,1,2,0,0,0,0),(36,1,2,0,0,0,0),(37,1,2,0,0,0,0),(38,1,2,0,0,0,0),(39,1,2,0,0,0,0),(40,1,2,0,0,0,0),(41,1,2,0,0,0,0),(42,1,2,0,0,0,0);
/*!40000 ALTER TABLE `user_avatar_equiped` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_avatars`
--

DROP TABLE IF EXISTS `user_avatars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_avatars` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `aId` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `expire` datetime DEFAULT NULL,
  `is_cash` int(2) DEFAULT '0',
  `is_gift` int(2) DEFAULT '0',
  `gift_sent_by` int(10) NOT NULL,
  `amount` int(11) DEFAULT '0',
  `expire_time` bigint(40) DEFAULT '0',
  `date_ava_time` bigint(50) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_avatars`
--

LOCK TABLES `user_avatars` WRITE;
/*!40000 ALTER TABLE `user_avatars` DISABLE KEYS */;
INSERT INTO `user_avatars` VALUES (1,10,2756,0,NULL,1,0,0,0,1594445482839,1593840682839),(2,10,4817,0,NULL,0,1,10,0,0,1593841372449),(3,10,4817,0,NULL,0,1,10,0,0,1593841402396),(4,23,3193,0,NULL,1,0,0,0,0,1593983606009),(5,23,3113,0,NULL,1,0,0,0,0,1593983626004),(6,23,3115,1,NULL,1,0,0,0,0,1593983631175),(7,23,3217,2,NULL,1,0,0,0,0,1593983640618),(8,23,2994,4,NULL,0,0,0,0,0,1593983699344),(9,23,2991,5,NULL,1,0,0,0,1594588526834,1593983726834),(10,31,3117,0,NULL,1,0,0,0,1594692607067,1594087807068),(15,23,4983,0,NULL,0,1,23,0,0,1594175467428),(16,32,3129,0,NULL,0,0,0,0,1596767741294,1594175741294),(17,33,894,6,NULL,1,0,0,0,1594780774122,1594175974122),(18,32,3117,0,NULL,1,1,33,0,1594780804454,1594176004454),(19,32,893,6,NULL,1,0,0,0,1594780864895,1594176064895),(20,32,464,6,NULL,1,0,0,0,1594780896239,1594176096239),(21,32,2319,6,NULL,1,0,0,0,1594781891863,1594177091863),(22,33,3129,0,NULL,0,0,0,0,0,1594177619686),(23,23,2319,6,NULL,1,0,0,0,1596770043193,1594178043193),(24,23,1223,6,NULL,1,0,0,0,1594783119665,1594178319665),(25,32,3137,0,NULL,0,0,0,0,1594783411103,1594178611103),(26,32,3138,1,NULL,0,0,0,0,1594783417510,1594178617510),(27,32,4983,0,NULL,0,1,23,0,0,1594179322311),(28,32,2826,0,NULL,1,0,0,0,0,1594179468006),(29,32,842,0,NULL,1,0,0,0,1594784319695,1594179519695),(30,32,841,1,NULL,1,0,0,0,1594784334929,1594179534929),(31,32,840,2,NULL,1,0,0,0,1594784354634,1594179554634),(32,32,866,3,NULL,1,0,0,0,1594784392076,1594179592076),(33,33,3117,0,NULL,1,1,35,0,1594784576316,1594179776332),(34,23,4817,0,NULL,0,1,23,0,0,1594179832475),(35,32,4983,0,NULL,0,1,23,0,0,1594179848381),(36,33,4983,0,NULL,0,1,23,0,0,1594179864053),(37,23,895,6,NULL,1,0,0,0,1594785235566,1594180435566),(38,32,2319,6,NULL,1,0,0,0,1594785241566,1594180441566),(39,32,895,6,NULL,1,0,0,0,1594785246769,1594180446769),(42,32,1063,6,NULL,1,0,0,0,0,1594180476286),(48,23,464,6,NULL,1,0,0,0,1596773007165,1594181007165),(50,33,1064,6,NULL,1,0,0,0,0,1594182066317),(51,33,1065,6,NULL,1,0,0,0,0,1594182073442);
/*!40000 ALTER TABLE `user_avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_post`
--

DROP TABLE IF EXISTS `user_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_post` (
  `post_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_de` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `user_para` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `texto` varchar(900) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=72 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_post`
--

LOCK TABLES `user_post` WRITE;
/*!40000 ALTER TABLE `user_post` DISABLE KEYS */;
INSERT INTO `user_post` VALUES (1,'10','10','Hola wilmer!','1593840732'),(2,'10','10','Abrazuka\r\n','1593847112'),(4,'23','23','Hello everyone and welcome to my page. :)','1593982873'),(5,'33','33','Chupetin','1594177931'),(6,'23','23','test','1594181665'),(7,'23','23','hola mundo!','1594181685'),(16,'44','44','w','1610137063'),(17,'44','44','dqew','1610137110'),(37,'45','1','we','1610319130'),(28,'44','1','hi\r\n','1610193452'),(29,'44','1','hi','1610193546'),(35,'45','1','1212','1610318925'),(36,'45','1','w','1610318972'),(46,'47','23','hola','1610322301'),(71,'47','45','wefe','1610330781'),(61,'45','1','ewfe','1610328204'),(64,'47','23','qwef\r\n','1610328535');
/*!40000 ALTER TABLE `user_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_post_comment`
--

DROP TABLE IF EXISTS `user_post_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_post_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `texto` varchar(150) DEFAULT '',
  `fecha` varchar(900) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_post_comment`
--

LOCK TABLES `user_post_comment` WRITE;
/*!40000 ALTER TABLE `user_post_comment` DISABLE KEYS */;
INSERT INTO `user_post_comment` VALUES (5,7,45,'feqw','1610322260'),(6,46,47,'fqwe','1610322311'),(10,47,47,'eqfw','1610326248'),(23,71,47,'hola','1610330898');
/*!40000 ALTER TABLE `user_post_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
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
  `win` int(11) DEFAULT '0',
  `loss` int(11) DEFAULT '0',
  `gm` int(2) DEFAULT '0',
  `banned` int(5) NOT NULL DEFAULT '0',
  `prixw` int(11) NOT NULL DEFAULT '0',
  `probability` int(10) NOT NULL DEFAULT '0',
  `IdAcc` int(11) NOT NULL,
  `bg_url` varchar(200) DEFAULT '/static/images/aqua_bg.jpg',
  `IP` varchar(20) NOT NULL,
  `block_friend` int(2) NOT NULL DEFAULT '0',
  `CashCharger` int(11) NOT NULL DEFAULT '0',
  `report` int(100) NOT NULL DEFAULT '0',
  `post_type` int(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `FKUserAcc_idx` (`IdAcc`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'wilmer',22,557880,500000,30000,'m',0,'',0,0,0,0,'BOT',0,0,0,'0',0,0,0,0,0,0,1,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(2,'wdqwqwqddq',4,1995,498500,30000,'m',0,'',0,0,0,0,'BOT',0,0,0,'0',0,1,0,0,0,0,2,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(3,'fdbeebwb',0,995,498500,30000,'m',0,'',0,0,0,0,'BOT',0,0,0,'0',0,1,0,0,0,0,3,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(4,'wilmer2',0,990,497000,30000,'m',0,'',0,0,0,0,'BOT',0,0,0,'0',0,2,0,0,0,0,4,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(5,'gaaaaaaaaaa',0,1000,500000,30000,'m',0,'',0,0,0,0,'BOT',0,0,0,'0',0,0,0,0,0,0,5,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(6,'eqqefwefwefweqw',0,1000,500000,30000,'m',0,'',0,0,0,0,'BOT',0,0,0,'0',0,0,0,0,0,0,6,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(7,'12211321212',0,1000,500000,30000,'m',0,'',0,0,0,0,'BOT',0,0,0,'0',0,0,0,0,0,0,7,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(8,'tewqqewew',0,990,497000,30000,'m',0,'',0,0,0,0,'BOT',0,0,0,'0',0,2,0,0,0,0,8,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(9,'gr443434',0,995,498500,30000,'m',0,'https://pasionporelcine.net/wp-content/uploads/2019/11/V-de-vedetta-Cr%C3%ADtica-pel%C3%ADcula-2006-960x576.jpg',0,0,0,0,'BOT',0,0,0,'0',0,1,0,0,0,0,9,'https://oswallpapers.com/wp-content/uploads/2018/10/warty-final-ubuntu.jpg','1',0,0,0,0),(10,'lnferno',26,1045,487150,158700,'m',0,'',1,0,0,0,'BOT',0,0,0,'0',1,13,1,0,0,0,10,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,3,0,0),(11,'qdwqwdqwqwdqwd',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,11,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(12,'qdwqwqdwdwqwqdq',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,12,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(13,'xddd',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,13,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(14,'adfsdasf',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,14,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(15,'chupetin',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,15,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(16,'asdas',0,1000,500000,30000,'f',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,16,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(17,'2wdqw',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,17,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(18,'315665',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,18,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(19,'xdsadfds',0,995,498500,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,1,0,0,0,0,19,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(20,'chapulin',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,20,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(21,'sadfewfewefw',0,1055,499850,31000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',1,2,0,0,0,0,21,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(22,'wrewqqerweqrw',0,995,498500,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,1,0,0,0,0,22,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(23,'DN',26,2250,2147244747,2147320348,'m',0,'https://media2.giphy.com/media/Zb0asRm15HqCbgShD4/giphy.gif',0,1,0,0,'PE',0,1,0,'0',21,43,1,0,0,0,23,'https://i.imgur.com/4NphpEi.jpg','179.6.207.92',0,2,0,0),(24,'efwqewqewfew',0,990,497000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,2,0,0,0,0,24,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(25,'dswefeww',0,970,491000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,6,0,0,0,0,25,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(26,'rewegerwe',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,26,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(27,'dsfewfeewew',0,995,498500,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,1,0,0,0,0,27,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(28,'qwkdqwklqw',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,28,'https://image.prntscr.com/image/b1951ace8fbe48a383165b53955cee02.png','1',0,0,0,0),(29,'wqdqwqw',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,29,NULL,'1',0,0,0,0),(30,'dqwqwhqdwkqwd',0,995,499500,31000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,1,0,0,0,0,30,'/static/images/aqua_bg.jpg','1',0,0,0,0),(31,'enriquelol',0,1000,500000,27000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,31,'/static/images/aqua_bg.jpg','1',0,0,0,0),(32,'enrique',0,525,275450,910011,'m',0,'',0,1,1,0,'PE',0,0,0,'0',10,8,0,0,0,0,32,'/static/images/aqua_bg.jpg','190.236.255.20',0,2,0,0),(33,'testeo',21,400375,3050,50300,'m',0,'',0,0,0,0,'PE',0,0,29,'0',2,4,0,0,0,0,33,'/static/images/aqua_bg.jpg','179.7.49.207',0,1,0,0),(34,'Alexiz',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,34,'/static/images/aqua_bg.jpg','179.7.49.207',0,0,0,0),(35,'holamundo',21,450000,500000,27000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,35,'/static/images/aqua_bg.jpg','179.6.207.92',0,0,0,0),(36,'ldskdslkfl',0,1000,500000,30000,'m',0,'',0,0,0,0,'PE',0,0,0,'0',0,0,0,0,0,0,36,'/static/images/aqua_bg.jpg','179.6.207.92',0,0,0,0),(37,'thepatan123222',0,1000,500000,30000,'m',0,'',0,0,0,0,'EU',0,0,0,'0',0,0,0,0,0,0,42,'/static/images/aqua_bg.jpg','1',0,0,0,0),(38,'wilmer231231221',0,1000,500000,30000,'m',0,'',0,0,0,0,'EU',0,0,0,'0',0,0,0,0,0,0,43,'/static/images/aqua_bg.jpg','1',0,0,0,0),(39,'qfeqewfwe',0,1000,500000,30000,'m',0,'',0,0,0,0,'EU',0,0,0,'0',0,0,0,0,0,0,44,'/static/images/aqua_bg.jpg','1',0,0,0,0),(40,'Alex',26,1000,500000,30000,'m',0,'',0,0,0,0,'EU',0,0,0,'0',0,0,0,0,0,0,45,'/static/images/aqua_bg.jpg','1',0,0,0,0),(41,'qewfqweqewwq',0,1000,500000,30000,'m',0,'',0,0,0,0,'EU',0,0,0,'0',0,0,0,0,0,0,46,'/static/images/aqua_bg.jpg','1',0,0,0,0),(42,'Zamy',0,1000,500000,30000,'m',0,'',0,0,0,0,'EU',0,0,0,'0',0,0,0,0,0,0,47,'/static/images/aqua_bg.jpg','1',0,0,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'game'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-13 15:59:50
