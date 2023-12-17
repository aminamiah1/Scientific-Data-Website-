/*
  Warnings:

  - You are about to drop the `verificationtokens` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `role` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `verificationtokens`;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Country` (
    `ctry11cd` VARCHAR(191) NOT NULL,
    `ctry11nm` VARCHAR(191) NOT NULL,
    `ctry11nmw` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Country_ctry11cd_key`(`ctry11cd`),
    PRIMARY KEY (`ctry11cd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `rgn22cd` VARCHAR(191) NOT NULL,
    `rgn22nm` VARCHAR(191) NOT NULL,
    `rgn22nmw` VARCHAR(191) NULL,
    `countryId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Region_rgn22cd_key`(`rgn22cd`),
    PRIMARY KEY (`rgn22cd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LocalAuthorityDistrict` (
    `lad19cd` VARCHAR(191) NOT NULL,
    `lad19nm` VARCHAR(191) NOT NULL,
    `lad19nmw` VARCHAR(191) NULL,
    `regionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LocalAuthorityDistrict_lad19cd_key`(`lad19cd`),
    UNIQUE INDEX `LocalAuthorityDistrict_lad19nm_key`(`lad19nm`),
    PRIMARY KEY (`lad19cd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LowerLayerSuperOutputArea` (
    `lsoa11cd` VARCHAR(191) NOT NULL,
    `lsoa11nm` VARCHAR(191) NOT NULL,
    `lsoa11nmw` VARCHAR(191) NULL,
    `districtId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LowerLayerSuperOutputArea_lsoa11cd_key`(`lsoa11cd`),
    PRIMARY KEY (`lsoa11cd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HHPoHT` (
    `Index` DATETIME(3) NOT NULL,
    `NormalisedASHPHeat` DOUBLE NOT NULL,
    `NormalisedASHPElec` DOUBLE NOT NULL,
    `NormalisedGSHPHeat` DOUBLE NOT NULL,
    `NormalisedGSHPElec` DOUBLE NOT NULL,
    `NormalisedResistanceHeaterHeat` DOUBLE NOT NULL,
    `NormalisedResistanceHeaterElec` DOUBLE NOT NULL,
    `NormalisedGasBoilerHeat` DOUBLE NOT NULL,
    `NormalisedGasBoilerGas` DOUBLE NOT NULL,
    `UKDailyAverageOAT` DOUBLE NOT NULL,

    UNIQUE INDEX `HHPoHT_Index_key`(`Index`),
    PRIMARY KEY (`Index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AHDLSOA` (
    `lsoa11cd` VARCHAR(191) NOT NULL,
    `Area` DOUBLE NOT NULL,
    `AvgAfterDetachedBiomassBoiler` DOUBLE NOT NULL,
    `AvgAfterDetachedGasBoiler` DOUBLE NOT NULL,
    `AvgAfterDetachedOilBoiler` DOUBLE NOT NULL,
    `AvgAfterDetachedResistanceHeating` DOUBLE NOT NULL,
    `AvgAfterFlatBiomassBoiler` DOUBLE NOT NULL,
    `AvgAfterFlatGasBoiler` DOUBLE NOT NULL,
    `AvgAfterFlatOilBoiler` DOUBLE NOT NULL,
    `AvgAfterFlatResistanceHeating` DOUBLE NOT NULL,
    `AvgAfterSemiBiomassBoiler` DOUBLE NOT NULL,
    `AvgAfterSemiGasBoiler` DOUBLE NOT NULL,
    `AvgAfterSemiOilBoiler` DOUBLE NOT NULL,
    `AvgAfterSemiResistanceHeating` DOUBLE NOT NULL,
    `AvgAfterTerracedBiomassBoiler` DOUBLE NOT NULL,
    `AvgAfterTerracedGasBoiler` DOUBLE NOT NULL,
    `AvgAfterTerracedOilBoiler` DOUBLE NOT NULL,
    `AvgAfterTerracedResistanceHeating` DOUBLE NOT NULL,
    `AvgBeforeDetachedBiomassBoiler` DOUBLE NOT NULL,
    `AvgBeforeDetachedGasBoiler` DOUBLE NOT NULL,
    `AvgBeforeDetachedOilBoiler` DOUBLE NOT NULL,
    `AvgBeforeDetachedResistanceHeating` DOUBLE NOT NULL,
    `AvgBeforeFlatBiomassBoiler` DOUBLE NOT NULL,
    `AvgBeforeFlatGasBoiler` DOUBLE NOT NULL,
    `AvgBeforeFlatOilBoiler` DOUBLE NOT NULL,
    `AvgBeforeFlatResistanceHeating` DOUBLE NOT NULL,
    `AvgBeforeSemiBiomassBoiler` DOUBLE NOT NULL,
    `AvgBeforeSemiGasBoiler` DOUBLE NOT NULL,
    `AvgBeforeSemiOilBoiler` DOUBLE NOT NULL,
    `AvgBeforeSemiResistanceHeating` DOUBLE NOT NULL,
    `AvgBeforeTerracedBiomassBoiler` DOUBLE NOT NULL,
    `AvgBeforeTerracedGasBoiler` DOUBLE NOT NULL,
    `AvgBeforeTerracedOilBoiler` DOUBLE NOT NULL,
    `AvgBeforeTerracedResistanceHeating` DOUBLE NOT NULL,
    `lad11nm` VARCHAR(191) NOT NULL,
    `lad19nm` VARCHAR(191) NOT NULL,
    `NoOfDetachedBiomassBoilers` INTEGER NOT NULL,
    `NoOfDetachedGasBoilers` INTEGER NOT NULL,
    `NoOfDetachedOilBoilers` INTEGER NOT NULL,
    `NoOfDetachedResistanceHeaters` INTEGER NOT NULL,
    `NoOfFlatBiomassBoilers` INTEGER NOT NULL,
    `NoOfFlatGasBoilers` INTEGER NOT NULL,
    `NoOfFlatOilBoilers` INTEGER NOT NULL,
    `NoOfFlatResistanceHeaters` INTEGER NOT NULL,
    `NoOfSemiBiomassBoilers` INTEGER NOT NULL,
    `NoOfSemiGasBoilers` INTEGER NOT NULL,
    `NoOfSemiOilBoilers` INTEGER NOT NULL,
    `NoOfSemiResistanceHeaters` INTEGER NOT NULL,
    `NoOfTerracedBiomassBoilers` INTEGER NOT NULL,
    `NoOfTerracedGasBoilers` INTEGER NOT NULL,
    `NoOfTerracedOilBoilers` INTEGER NOT NULL,
    `NoOfTerracedResistanceHeaters` INTEGER NOT NULL,
    `RoadLength` DOUBLE NOT NULL,
    `Rurality` VARCHAR(191) NOT NULL,
    `TotalHeatDemandBefore` DOUBLE NOT NULL,
    `TotalHeatDemandAfter` DOUBLE NOT NULL,

    UNIQUE INDEX `AHDLSOA_lsoa11cd_key`(`lsoa11cd`),
    PRIMARY KEY (`lsoa11cd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EEICLA` (
    `lad19nm` VARCHAR(191) NOT NULL,
    `AvgImpCostDetachedGasBoiler` DOUBLE NOT NULL,
    `AvgImpCostDetachedOilBoiler` DOUBLE NOT NULL,
    `AvgImpCostDetachedResistanceHeating` DOUBLE NOT NULL,
    `AvgImpCostDetachedBiomassBoiler` DOUBLE NOT NULL,
    `AvgImpCostFlatGasBoiler` DOUBLE NOT NULL,
    `AvgImpCostFlatOilBoiler` DOUBLE NOT NULL,
    `AvgImpCostFlatResistanceHeating` DOUBLE NOT NULL,
    `AvgImpCostFlatBiomassBoiler` DOUBLE NOT NULL,
    `AvgImpCostSemiGasBoiler` DOUBLE NOT NULL,
    `AvgImpCostSemiOilBoiler` DOUBLE NOT NULL,
    `AvgImpCostSemiResistanceHeating` DOUBLE NOT NULL,
    `AvgImpCostSemiBiomassBoiler` DOUBLE NOT NULL,
    `AvgImpCostTerracedGasBoiler` DOUBLE NOT NULL,
    `AvgImpCostTerracedOilBoiler` DOUBLE NOT NULL,
    `AvgImpCostTerracedResistanceHeating` DOUBLE NOT NULL,
    `AvgImpCostTerracedBiomassBoiler` DOUBLE NOT NULL,
    `NoOfDetachedGasBoilers` INTEGER NOT NULL,
    `NoOfDetachedResistanceHeaters` INTEGER NOT NULL,
    `NoOfDetachedOilBoilers` INTEGER NOT NULL,
    `NoOfDetachedBiomassBoilers` INTEGER NOT NULL,
    `NoOfSemiGasBoilers` INTEGER NOT NULL,
    `NoOfSemiResistanceHeaters` INTEGER NOT NULL,
    `NoOfSemiOilBoilers` INTEGER NOT NULL,
    `NoOfSemiBiomassBoilers` INTEGER NOT NULL,
    `NoOfTerracedGasBoilers` INTEGER NOT NULL,
    `NoOfTerracedResistanceHeaters` INTEGER NOT NULL,
    `NoOfTerracedOilBoilers` INTEGER NOT NULL,
    `NoOfTerracedBiomassBoilers` INTEGER NOT NULL,
    `NoOfFlatGasBoilers` INTEGER NOT NULL,
    `NoOfFlatResistanceHeaters` INTEGER NOT NULL,
    `NoOfFlatOilBoilers` INTEGER NOT NULL,
    `NoOfFlatBiomassBoilers` INTEGER NOT NULL,
    `TotalImprovementCosts` DOUBLE NOT NULL,

    UNIQUE INDEX `EEICLA_lad19nm_key`(`lad19nm`),
    PRIMARY KEY (`lad19nm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Region` ADD CONSTRAINT `Region_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`ctry11cd`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LocalAuthorityDistrict` ADD CONSTRAINT `LocalAuthorityDistrict_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`rgn22cd`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LowerLayerSuperOutputArea` ADD CONSTRAINT `LowerLayerSuperOutputArea_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `LocalAuthorityDistrict`(`lad19cd`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AHDLSOA` ADD CONSTRAINT `AHDLSOA_lsoa11cd_fkey` FOREIGN KEY (`lsoa11cd`) REFERENCES `LowerLayerSuperOutputArea`(`lsoa11cd`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EEICLA` ADD CONSTRAINT `EEICLA_lad19nm_fkey` FOREIGN KEY (`lad19nm`) REFERENCES `LocalAuthorityDistrict`(`lad19nm`) ON DELETE RESTRICT ON UPDATE CASCADE;
