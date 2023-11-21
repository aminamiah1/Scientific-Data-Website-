import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function loadAnnualHeatDemandLSOA(filename) {
  try {
    const csvFilePath = filename;
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        const dataArray = Object.values(data);
        results.push(dataArray);
      })
      .on('end', async () => {
        for (const row of results) {
          await prisma.annualHeatDemandLSOA.create({
            data: {
              LSOA11CD: row[0],
              Area: parseFloat(row[1]),

              // Avg After
              AvgAfterDetachedBiomassBoiler: parseFloat(row[2]),
              AvgAfterDetachedGasBoiler: parseFloat(row[3]),
              AvgAfterDetachedOilBoiler: parseFloat(row[4]),
              AvgAfterDetachedResistanceHeating: parseFloat(row[5]),

              AvgAfterFlatBiomassBoiler: parseFloat(row[6]),
              AvgAfterFlatGasBoiler: parseFloat(row[7]),
              AvgAfterFlatOilBoiler: parseFloat(row[8]),
              AvgAfterFlatResistanceHeating: parseFloat(row[9]),

              AvgAfterSemiBiomassBoiler: parseFloat(row[10]),
              AvgAfterSemiGasBoiler: parseFloat(row[11]),
              AvgAfterSemiOilBoiler: parseFloat(row[12]),
              AvgAfterSemiResistanceHeating: parseFloat(row[13]),

              AvgAfterTerracedBiomassBoiler: parseFloat(row[14]),
              AvgAfterTerracedGasBoiler: parseFloat(row[15]),
              AvgAfterTerracedOilBoiler: parseFloat(row[16]),
              AvgAfterTerracedResistanceHeating: parseFloat(row[17]),

              // Avg Before
              AvgBeforeDetachedBiomassBoiler: parseFloat(row[18]),
              AvgBeforeDetachedGasBoiler: parseFloat(row[19]),
              AvgBeforeDetachedOilBoiler: parseFloat(row[20]),
              AvgBeforeDetachedResistanceHeating: parseFloat(row[21]),

              AvgBeforeFlatBiomassBoiler: parseFloat(row[22]),
              AvgBeforeFlatGasBoiler: parseFloat(row[23]),
              AvgBeforeFlatOilBoiler: parseFloat(row[24]),
              AvgBeforeFlatResistanceHeating: parseFloat(row[25]),

              AvgBeforeSemiBiomassBoiler: parseFloat(row[26]),
              AvgBeforeSemiGasBoiler: parseFloat(row[27]),
              AvgBeforeSemiOilBoiler: parseFloat(row[28]),
              AvgBeforeSemiResistanceHeating: parseFloat(row[29]),

              AvgBeforeTerracedBiomassBoiler: parseFloat(row[30]),
              AvgBeforeTerracedGasBoiler: parseFloat(row[31]),
              AvgBeforeTerracedOilBoiler: parseFloat(row[32]),
              AvgBeforeTerracedResistanceHeating: parseFloat(row[33]),

              // Years
              LocalAuthorityPrevious: row[34],
              LocalAuthorityCurrent: row[35],

              // No. (Detached)
              NoOfDetachedBiomassBoilers: parseInt(row[36]),
              NoOfDetachedGasBoilers: parseInt(row[37]),
              NoOfDetachedOilBoilers: parseInt(row[38]),
              NoOfDetachedResistanceHeaters: parseInt(row[39]),

              // No. (Flat)
              NoOfFlatBiomassBoilers: parseInt(row[40]),
              NoOfFlatGasBoilers: parseInt(row[41]),
              NoOfFlatOilBoilers: parseInt(row[42]),
              NoOfFlatResistanceHeaters: parseInt(row[43]),

              // No. (Semi)
              NoOfSemiBiomassBoilers: parseInt(row[44]),
              NoOfSemiGasBoilers: parseInt(row[45]),
              NoOfSemiOilBoilers: parseInt(row[46]),
              NoOfSemiResistanceHeaters: parseInt(row[47]),

              // No. (Terraced)
              NoOfTerracedBiomassBoilers: parseInt(row[48]),
              NoOfTerracedGasBoilers: parseInt(row[49]),
              NoOfTerracedOilBoilers: parseInt(row[50]),
              NoOfTerracedResistanceHeaters: parseInt(row[51]),

              RoadLength: parseFloat(row[52]),
              Rurality: row[53],

              // Totals
              TotalHeatDemandBefore: parseInt(row[54]),
              TotalHeatDemandAfter: parseInt(row[55])
            },
          });
        }

        console.log('Annual Heat Demand LSOA CSV data loaded into the database.');
      });
  } catch (error) {
    console.error('Error loading CSV data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function loadEnergyEfficiencyImprovementCosts(filename) {
  try {
    const csvFilePath = filename;
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        const dataArray = Object.values(data);
        results.push(dataArray);
      })
      .on('end', async () => {
        for (const row of results) {
          await prisma.energyEfficiencyImprovementsCostsLA.create({
            data: {
              LocalAuthority: row[0],

              AvgImpCostDetachedGasBoiler: parseFloat(row[1]),
              AvgImpCostDetachedOilBoiler: parseFloat(row[2]),
              AvgImpCostDetachedResistanceHeater: parseFloat(row[3]),
              AvgImpCostDetachedBiomassBoiler: parseFloat(row[4]),

              AvgImpCostFlatGasBoiler: parseFloat(row[5]),
              AvgImpCostFlatOilBoiler: parseFloat(row[6]),
              AvgImpCostFlatResistanceHeater: parseFloat(row[7]),
              AvgImpCostFlatBiomassBoiler: parseFloat(row[8]),

              AvgImpCostSemiGasBoiler: parseFloat(row[9]),
              AvgImpCostSemiOilBoiler: parseFloat(row[10]),
              AvgImpCostSemiResistanceHeater: parseFloat(row[11]),
              AvgImpCostSemiBiomassBoiler: parseFloat(row[12]),

              AvgImpCostTerracedGasBoiler: parseFloat(row[13]),
              AvgImpCostTerracedOilBoiler: parseFloat(row[14]),
              AvgImpCostTerracedResistanceHeater: parseFloat(row[15]),
              AvgImpCostTerracedBiomassBoiler: parseFloat(row[16]),

              NoOfDetachedGasBoilers: parseInt(row[17]),
              NoOfDetachedResistanceHeaters: parseInt(row[18]),
              NoOfDetachedOilBoilers: parseInt(row[19]),
              NoOfDetachedBiomassBoilers: parseInt(row[20]),

              NoOfSemiGasBoilers: parseInt(row[21]),
              NoOfSemiResistanceHeaters: parseInt(row[22]),
              NoOfSemiOilBoilers: parseInt(row[23]),
              NoOfSemiBiomassBoilers: parseInt(row[24]),

              NoOfTerracedGasBoilers: parseInt(row[25]),
              NoOfTerracedResistanceHeaters: parseInt(row[26]),
              NoOfTerracedOilBoilers: parseInt(row[27]),
              NoOfTerracedBiomassBoilers: parseInt(row[28]),

              NoOfFlatGasBoilers: parseInt(row[29]),
              NoOfFlatResistanceHeaters: parseInt(row[30]),
              NoOfFlatOilBoilers: parseInt(row[31]),
              NoOfFlatBiomassBoilers: parseInt(row[32]),

              TotalImprovementCosts: parseFloat(row[33])
            },
          });
        }

        console.log('Energy Efficiency Improvement Costs CSV data loaded into the database.');
      });
  } catch (error) {
    console.error('Error loading CSV data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function loadHalfHourlyProfilesOfHeatingTechnologies(filename) {
  try {
    const csvFilePath = filename;
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        const dataArray = Object.values(data);
        results.push(dataArray);
      })
      .on('end', async () => {
        for (const row of results) {
          await prisma.halfHourlyProfilesOfHeatingTechnologies.create({
            data: {
              Index: new Date(row[0]),
              NormalisedASHPHeat: parseFloat(row[1]),
              NormalisedASHPElec: parseFloat(row[2]),
              NormalisedGSHPHeat: parseFloat(row[3]),
              NormalisedGSHPElec: parseFloat(row[4]),
              NormalisedResistanceHeaterHeat: parseFloat(row[5]),
              NormalisedResistanceHeaterElec: parseFloat(row[6]),
              NormalisedGasBoilerHeat: parseFloat(row[7]),
              NormalisedGasBoilerGas: parseFloat(row[8]),
              UKDailyAverageOAT: parseFloat(row[9])
            },
          });
        }

        console.log('Half-Hourly Profiles Of Heating Technologies CSV data loaded into the database.');
      });
  } catch (error) {
    console.error('Error loading CSV data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
