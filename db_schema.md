CREATE SCHEMA `project5` DEFAULT CHARACTER SET utf8;
USE `project5`;
CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `surName` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;