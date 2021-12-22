-- MariaDB dump 10.19  Distrib 10.6.5-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: nutrition
-- ------------------------------------------------------
-- Server version 10.6.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Nutrients`
--

DROP TABLE IF EXISTS `Nutrients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Nutrients` (
  `ean` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_on` datetime NOT NULL DEFAULT current_timestamp(),
  `by` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'system',
  `codigo` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ingredients` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nutricional_info` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nível_1` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nível_2` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nivel_3` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kcal_Energia` float DEFAULT NULL,
  `kJ_Energia` float DEFAULT NULL,
  `kJ_Lípidos` float DEFAULT NULL,
  `g_Ácidos_gordos_saturados` float DEFAULT NULL,
  `g_Ácidos_gordos_monoinsaturados` float DEFAULT NULL,
  `g_Ácidos_gordos_polinsaturados` float DEFAULT NULL,
  `g_Ácido_linoleico` float DEFAULT NULL,
  `g_Ácidos_gordos_trans` float DEFAULT NULL,
  `g_Hidratos_de_carbono` float DEFAULT NULL,
  `g_Açúcares` float DEFAULT NULL,
  `g_Oligossacáridos` float DEFAULT NULL,
  `g_Amido` float DEFAULT NULL,
  `g_Fibra` float DEFAULT NULL,
  `g_Proteínas` float DEFAULT NULL,
  `g_Sal` float DEFAULT NULL,
  `g_Álcool` float DEFAULT NULL,
  `g_Água` float DEFAULT NULL,
  `g_Ácidos_orgânicos` float DEFAULT NULL,
  `g_Colesterol` float DEFAULT NULL,
  `mg_Vitamina_A` float DEFAULT NULL,
  `µg_Caroteno` float DEFAULT NULL,
  `µg_Vitamina_D` float DEFAULT NULL,
  `µg_alfa-tocoferol` float DEFAULT NULL,
  `mg_Tiamina` float DEFAULT NULL,
  `mg_Riboflavina` float DEFAULT NULL,
  `mg_Niacina` float DEFAULT NULL,
  `mg_Equivalentes_de_niacina` float DEFAULT NULL,
  `mg_Triptofano-60` float DEFAULT NULL,
  `mg_Vitamina_B6` float DEFAULT NULL,
  `mg_Vitamina_B12` float DEFAULT NULL,
  `µg_Vitamina_C` float DEFAULT NULL,
  `mg_Folatos` float DEFAULT NULL,
  `µg_Cinza` float DEFAULT NULL,
  `g_Sódio` float DEFAULT NULL,
  `mg_Potássio` float DEFAULT NULL,
  `mg_Cálcio` float DEFAULT NULL,
  `mg_Fósforo` float DEFAULT NULL,
  `mg_Magnésio` float DEFAULT NULL,
  `mg_Ferro` float DEFAULT NULL,
  `mg_Zinco` float DEFAULT NULL,
  PRIMARY KEY (`ean`),
  CONSTRAINT `Nutrients_ibfk_1` FOREIGN KEY (`ean`) REFERENCES `Product` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Product` (
  `code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `brands` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categorias` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoria_principal` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_preview` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ingredients_preivew` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nutrition_preview` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `porFIR`
--

DROP TABLE IF EXISTS `porFIR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `porFIR` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nível_1` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nível_2` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nivel_3` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kcal_Energia` float DEFAULT NULL,
  `kJ_Energia` float DEFAULT NULL,
  `kJ_Lípidos` float DEFAULT NULL,
  `g_Ácidos_gordos_saturados` float DEFAULT NULL,
  `g_Ácidos_gordos_monoinsaturados` float DEFAULT NULL,
  `g_Ácidos_gordos_polinsaturados` float DEFAULT NULL,
  `g_Ácido_linoleico` float DEFAULT NULL,
  `g_Ácidos_gordos_trans` float DEFAULT NULL,
  `g_Hidratos_de_carbono` float DEFAULT NULL,
  `g_Açúcares` float DEFAULT NULL,
  `g_Oligossacáridos` float DEFAULT NULL,
  `g_Amido` float DEFAULT NULL,
  `g_Fibra` float DEFAULT NULL,
  `g_Proteínas` float DEFAULT NULL,
  `g_Sal` float DEFAULT NULL,
  `g_Álcool` float DEFAULT NULL,
  `g_Água` float DEFAULT NULL,
  `g_Ácidos_orgânicos` float DEFAULT NULL,
  `g_Colesterol` float DEFAULT NULL,
  `mg_Vitamina_A` float DEFAULT NULL,
  `µg_Caroteno` float DEFAULT NULL,
  `µg_Vitamina_D` float DEFAULT NULL,
  `µg_alfa-tocoferol` float DEFAULT NULL,
  `mg_Tiamina` float DEFAULT NULL,
  `mg_Riboflavina` float DEFAULT NULL,
  `mg_Niacina` float DEFAULT NULL,
  `mg_Equivalentes_de_niacina` float DEFAULT NULL,
  `mg_Triptofano-60` float DEFAULT NULL,
  `mg_Vitamina_B6` float DEFAULT NULL,
  `mg_Vitamina_B12` float DEFAULT NULL,
  `µg_Vitamina_C` float DEFAULT NULL,
  `mg_Folatos` float DEFAULT NULL,
  `µg_Cinza` float DEFAULT NULL,
  `g_Sódio` float DEFAULT NULL,
  `mg_Potássio` float DEFAULT NULL,
  `mg_Cálcio` float DEFAULT NULL,
  `mg_Fósforo` float DEFAULT NULL,
  `mg_Magnésio` float DEFAULT NULL,
  `mg_Ferro` float DEFAULT NULL,
  `mg_Zinco` float DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-14 20:35:58
