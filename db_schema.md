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

CREATE TABLE `rating` (
  `ratingID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `tvshowID` int NOT NULL,
  `rating` int NOT NULL,
  PRIMARY KEY (`ratingID`),
  UNIQUE KEY `ratingID_UNIQUE` (`ratingID`),
  KEY `fkUsersRating` (`userID`),
  CONSTRAINT `fkUsersRating` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;