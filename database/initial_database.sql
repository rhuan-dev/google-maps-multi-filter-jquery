-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.6.35 - MySQL Community Server (GPL)
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para googlemaps
CREATE DATABASE IF NOT EXISTS `googlemaps` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `googlemaps`;

-- Copiando estrutura para tabela googlemaps.marcadores
CREATE TABLE IF NOT EXISTS `marcadores` (
  `marker_id` int(11) NOT NULL AUTO_INCREMENT,
  `marker_lat` float DEFAULT NULL,
  `marker_long` float DEFAULT NULL,
  `marker_title` varchar(50) DEFAULT NULL,
  `marker_icon` varchar(50) DEFAULT NULL,
  `marker_content` text,
  `marker_dh_register` float DEFAULT NULL,
  KEY `marker_id` (`marker_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela googlemaps.marcadores: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `marcadores` DISABLE KEYS */;
/*!40000 ALTER TABLE `marcadores` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
