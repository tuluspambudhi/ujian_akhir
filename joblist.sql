-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: jobList
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `salary` varchar(100) DEFAULT NULL,
  `job_detail` text,
  `publish_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `profile_image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,2,'','','','','','2019-09-30 03:57:54',NULL,''),(2,2,'','','','','','2019-09-30 04:00:01',NULL,''),(3,2,'','','','','','2019-09-30 04:04:38',NULL,''),(4,2,'','','','','','2019-09-30 04:10:21',NULL,''),(5,2,'','','','','','2019-09-30 04:11:35',NULL,''),(6,2,'','','','','','2019-09-30 04:18:24',NULL,''),(7,2,'','','','','','2019-09-30 04:20:38',NULL,''),(8,2,'','','','','','2019-09-30 04:21:44',NULL,''),(9,2,'','','','','','2019-09-30 04:22:28',NULL,''),(10,2,'','','','','','2019-09-30 04:23:28',NULL,'');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name_on_card` varchar(255) DEFAULT NULL,
  `card_number` int(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,1,2,'Waiting Confirmation','/post/images/POS1569790698421.jpg',300,NULL,NULL,NULL),(2,2,2,'Waiting Confirmation','/post/images/POS1569790812610.jpg',300,NULL,NULL,NULL),(3,3,2,'Waiting Confirmation','/post/images/POS1569791093113.jpg',300,NULL,NULL,NULL),(4,4,2,'Waiting Confirmation','/post/images/POS1569791432774.jpg',300,NULL,NULL,NULL),(5,5,2,'Waiting Confirmation','/post/images/POS1569791507758.jpg',300,NULL,NULL,NULL),(6,6,2,'Waiting Confirmation','/post/images/POS1569791942559.jpg',300,NULL,NULL,NULL),(7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,8,2,'Waiting Confirmation','/post/images/POS1569792116678.jpg',NULL,NULL,NULL,NULL),(9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,10,2,'Waiting Confirmation','/post/images/POS1569792220626.jpg',300,NULL,NULL,NULL);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `register_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'tulus','pambudhi','contactlexvard@gmail.com','80c034aac453213cb6557cae3134dc470beff46e18427da4737aae2bc8dde9a8','pambudhi',1,'2019-09-26 21:29:08','Verified'),(2,'ryan','reynolds','tynebeats@gmail.com','2e6d91ba939ac24512095fcde0fc94a279ba3bf3664ee69c9ec529b71b7d2108','ryanreynolds',NULL,'2019-09-26 21:32:49','Verified'),(3,'Sainrama','Archimada','jatipambudhi@gmail.com','80c034aac453213cb6557cae3134dc470beff46e18427da4737aae2bc8dde9a8','Sainrama',NULL,'2019-09-29 22:43:58','Verified');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-30  7:37:26
