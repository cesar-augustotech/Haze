-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: haze
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `haze`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `haze` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `haze`;

--
-- Table structure for table `avaliacoes_imagens`
--

DROP TABLE IF EXISTS `avaliacoes_imagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes_imagens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `imagem_id` int NOT NULL,
  `nota` tinyint NOT NULL,
  `data_avaliacao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`,`imagem_id`),
  KEY `imagem_id` (`imagem_id`),
  CONSTRAINT `avaliacoes_imagens_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `avaliacoes_imagens_ibfk_2` FOREIGN KEY (`imagem_id`) REFERENCES `imagens_mural` (`id`),
  CONSTRAINT `avaliacoes_imagens_chk_1` CHECK ((`nota` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes_imagens`
--

LOCK TABLES `avaliacoes_imagens` WRITE;
/*!40000 ALTER TABLE `avaliacoes_imagens` DISABLE KEYS */;
INSERT INTO `avaliacoes_imagens` VALUES (1,4,5,5,'2025-06-01 18:26:55'),(2,4,22,5,'2025-06-01 18:33:10'),(3,4,23,5,'2025-06-01 18:33:13'),(4,4,18,5,'2025-06-01 18:33:18');
/*!40000 ALTER TABLE `avaliacoes_imagens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `conteudo` text NOT NULL,
  `data_comentario` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagens_mural`
--

DROP TABLE IF EXISTS `imagens_mural`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagens_mural` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `url_imagem` text NOT NULL,
  `descricao` text,
  `data_envio` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `imagens_mural_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagens_mural`
--

LOCK TABLES `imagens_mural` WRITE;
/*!40000 ALTER TABLE `imagens_mural` DISABLE KEYS */;
INSERT INTO `imagens_mural` VALUES (1,1,'/assets/mural/27c6ab70d752bb81511d3f6c90f88747d7c2bb0c7e681f3f6cf12f1c89e1b731956ad9b839bb97d1c7714969d07c40682add58c7c38a74cb37ef49f30fdd922c.jpg','Expedition 33','2025-06-01 18:07:28'),(2,1,'/assets/mural/635eb95c7b8968c47764aebb088d44a4726671b9ae019610c0a5dfd06a77fe1be21606467693ce592e39b264db65316d9573fa99004c161f05337e883d4fc451.png','Clair','2025-06-01 18:07:55'),(3,1,'/assets/mural/bc085a276b34e1fbe294b68aefb35bc455cd46416939dc05f5532ba9bb669fa7eb76b15903a510e5b6426c36188c4a9554741ace1fbdb4e1528cc9e03a48afb6.png','Obscur','2025-06-01 18:08:05'),(4,1,'/assets/mural/3575ff65c9ab411c171347614c25352ed2ec335f73bc4d05af473e490cc7444086d086d3945161af9ac0c373206d94553fddc94e2f929e0302370c6b2091139c.jpg','Arthur Morgan','2025-06-01 18:08:29'),(5,1,'/assets/mural/7aee82c8e2faaf3fde22333a81454632d1bb6a8730327a01b928eed68f2e8ddb799c799b6d89ceb6c4ff6b2603cd1f20ac9549a2bdc4c5841e71341bdaca6260.jpg','Red Dead Redemption 2','2025-06-01 18:08:48'),(7,1,'/assets/mural/dc4f18a01bf7f9f8ceece117183a24f73614b1f45d93d958ccc56ac3e162eb1f50c5e119638780b816b310e8f4845b24ad5373d5c94e94329d711de0ef3c7fa1.jpg','Sekiro','2025-06-01 18:09:23'),(10,1,'/assets/mural/d706aeecd4d4753857e8d6f46b024337f6c72137b005f85e1a7173884bd8b42077181be38404ade8fec86877a7cfebdd5254b1d818cd198834d38a8adda90706.png','Hades Characters','2025-06-01 18:10:08'),(12,1,'/assets/mural/c5fb120c5fe25c1856ca546eb5f7943eca968ea079af9ae85062edb8a506de795f339aa8578225d64259c31a21fe219061b14943a135ced7d68b89e9120e3395.avif','','2025-06-01 18:11:14'),(14,1,'/assets/mural/b90b99b35a63416ed463f8fc782e35f7b78d7e989396efc233f2f5c648676d678674b65d7e9fe5c2793519fcbe41e68c73c6ed49c5f1b6f66d40c719c440ee84.jpg','','2025-06-01 18:11:41'),(15,2,'/assets/mural/8cccc0989ccb6b4797c671039d672317dc36b0cd43d34f60701df08ea0200ef28ffe756cf4a7516e328d82295fcde4e66e9bd2df32f99f71475f386d2a36e46d.webp','','2025-06-01 18:13:48'),(16,2,'/assets/mural/cecb5274e786c6978ea128662c209423376b3ee13e7958d4bab20d291ebfe007f60c1479faa1cb6183bb69ff8ba7278e45e5a774b74a71b4824811d52efc2a67.jpg','','2025-06-01 18:14:03'),(18,2,'/assets/mural/478c2a64354764ebd524187c1b4fc6e0a9f838081ee77bc8d886125cb478beb878c0b9cc06446107c532a4f2be363613aa3d785f6e8e99306f9ec69c9ffc4dc5.png','','2025-06-01 18:14:25'),(20,2,'/assets/mural/45dc178c1e75eb7a1945029b4bc7ddeb115f8c0db2bf69ef8446693bea875d0ce7fd6450b5973dc74da301e8793d6ae13f14c1c2a9c66656201cd78d8b64c313.jpg','Desenho Beinho','2025-06-01 18:15:04'),(22,2,'/assets/mural/f92b5a7c3e105cbb98af23157496e474331f494d6f5fb34db61be0bc09df41d9f5e947f05cd9ebf963dc6f27f020750699d6e1ffd49b3353e15dc2a728b276ff.png','','2025-06-01 18:15:28'),(23,2,'/assets/mural/bc6a8dac484db6235f3fd76dec57018a254037c457ad916f5534bf34b06ffcfcc6e2345cd1450b077ce658a53d58c660a9995765992311eb90aea7251a834edb.png','','2025-06-01 18:15:36'),(25,3,'/assets/mural/53e307fa526b56a041ade16353027d51d3086f87435f5c0bcba5976e5d246f9de5b61b640a8b97b552c89f7e8c54d0cdff87759c37b100e5616bb70e76133133.jpg','','2025-06-01 18:16:59'),(27,5,'/assets/mural/039f56020c0667c57241968aa0f99d7551f775e9fff0421e456532b7c275a3506009633d8a3b2d7a3bd0ac2ccbd5e94b300c278c7844923e78110cb3cd45a151.avif','','2025-06-01 18:19:08'),(28,5,'/assets/mural/4d69ff92d40141d02f1cf904d6966d9c84fec4c046997b9da1fb85c953a96155a1cf4b81772dea1f38889aaf574ffd66e2db6008fc967170642fc63569fde44b.png','','2025-06-01 18:19:16'),(30,5,'/assets/mural/30bdf98e1b59d37b7b0b26e36815bcc428c4d5bd979947458a8ef29f735532350923cbd0409152496036a08d77162e337c4fdcaf0cd512a2851719db6f0f052a.avif','','2025-06-01 18:21:07'),(31,6,'/assets/mural/e87bae03cd89aadea581163a2957e55a00140eecc799cd5d7d92c3667b9d2d298304ecc272d2aa538c7ec00f1a2b068a475c51f6900fa9df44e49aabcb1c64e5.png','','2025-06-01 18:22:33'),(32,6,'/assets/mural/4aea0bef89f03a5f3028e566c2f3aac4a31b51ddb7dc7d11ec1e5f5a2a8373b25ad38cf63ff37073f28960e24570fa759026478f6323c01d9c77f047ad28a5dc.jpg','','2025-06-01 18:23:05'),(33,6,'/assets/mural/4e4b00ebcc951b51643e5f6d4c67922e543819c332133daea79d883ac01056d2e13b59a844f9183a0ff40e940b3c7cdb837a842b642d15c231b95c12222e1920.jpg','','2025-06-01 18:23:18'),(34,6,'/assets/mural/63610097ed7b3eb10618c301ab6661a56ecf93706921a1663132f754b889763c010784321a92fe87f4a592720329534f7bf67ef235b5718755e802b03f65bcdd.jpg','','2025-06-01 18:23:25'),(35,4,'/assets/mural/aa82bcad464c6839bf62ead754a52fb63300e6407c8545214c5c2b96554a4d0624a7480b7a56dfd23128e1c7c593f79dad3c663795168da6484633cdd8be0a09.webp','','2025-06-01 18:25:39'),(36,4,'/assets/mural/52b53a34bb9ae5673ec55911de1126b9ae3c07c565adc70cbddac7b2fcd24329c994c0d8d60a46e096af370f7316c95ebc51ad164f372a99fc6469b2611995ff.webp','','2025-06-01 18:25:45'),(37,4,'/assets/mural/0456dcbc9cf6c4057fe579e99f941cf895742bfbd2afd048a713b41f5ab870fb005dba8735e944ca6abd77bb5ee169af3407b0210aa65e1395c06d36312f7a01.webp','','2025-06-01 18:25:59'),(39,4,'/assets/mural/4ecce58402eeee97a4529314cc1f560163c49c5b9adf539e89f16bf7374dd765c1c10e84941bf21f918d6cc28b62e81dd4843fe69aed6c8cbcc548195051a64f.png','','2025-06-01 18:26:48');
/*!40000 ALTER TABLE `imagens_mural` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pontuacoes_jogo`
--

DROP TABLE IF EXISTS `pontuacoes_jogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pontuacoes_jogo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `pontuacao` int NOT NULL,
  `tempo_segundos` float DEFAULT NULL,
  `data_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pontuacoes_jogo_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pontuacoes_jogo`
--

LOCK TABLES `pontuacoes_jogo` WRITE;
/*!40000 ALTER TABLE `pontuacoes_jogo` DISABLE KEYS */;
/*!40000 ALTER TABLE `pontuacoes_jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `conteudo` text NOT NULL,
  `data_postagem` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,4,'Preciso de ajuda','Preciso de pessoas que queiram jogar BloxFruit comigo!!','2025-06-01 18:27:44');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `bio` varchar(300) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `avatar_url` varchar(255) DEFAULT '/assets/pfp/default.png',
  `steamId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Binho','Meu nome é César Augusto, sou o criador desse ambiente e enxergo os jogos como uma forma de arte, onde desenvolvedores e jogadores podem se expressar em mundos novos','cesar@email.com','Sptech#2024','/assets/pfp/771268ddd90438b26e5b7954ec202be1',''),(2,'Mayumi','Docinho <3','sarah.mayumi@email.com','123456','/assets/pfp/5de6ba6357003c3b2b28be138f4e61d9',''),(3,'SaraHaras','','sarah.merli@email.com','123456','/assets/pfp/65185d349aa6392de95b0b3be2e2b1f7',''),(4,'KaminariRx','','leonardo@email.com','123456','/assets/pfp/711f3828310b4e7c3966f92cceeb7a8e',''),(5,'EmptyNamer','','ana@email.com','123456','/assets/pfp/ea208ded6aada42ce8e27178f1ba4dd3',''),(6,'LunaTK','Oh Guuh','gustavo@email.com','123456','/assets/pfp/3c662dad24ad1a3660dbf87bc285943e',''),(7,'Pemzord',NULL,'pedro@email.com','123456','/assets/pfp/default.png','');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-01 18:44:03
