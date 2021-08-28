SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `myDb`
--
CREATE DATABASE IF NOT EXISTS `myDb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `myDb`;

-- --------------------------------------------------------

--
-- Table structure for table `spaceWar`
--

CREATE TABLE `spaceWar` (
  `Id` int(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `spaceWar`
--

INSERT INTO `spaceWar` (`Id`, `userName`, `password`) VALUES
(1, 'Anjali', 'hello2021');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `spaceWar`
--
ALTER TABLE `spaceWar`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `spaceWar`
--
ALTER TABLE `spaceWar`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
