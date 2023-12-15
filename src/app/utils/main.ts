import { ISVGData } from "../interfaces/ISVGData";
import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import fs from 'fs';
import { Prisma } from "@prisma/client";
import { IDensityData } from "../interfaces/IDensityData";
import { Feature } from "geojson";
const app = express();
const port: number = 4001;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
dotenv.config();
app.use(express.json());
app.listen(port, () => {
    console.log(`App running on port ${port} `);
});

const filePrefix: string = '2_LAD-optimised-6dp';
const fileName: string = `./src/app/utils/${filePrefix}.geojson`;
const geoJsonData: ISVGData = JSON.parse(fs.readFileSync(fileName, 'utf8'));
const svgJson = {
    id: filePrefix,
    svgData: geoJsonData,
};

interface ISvgFeature extends Feature {
    properties: {
        density: number;
        lad19cd: string;
    }
};

const getLADdata = async (): Promise<void> => {
    try {
        const densityData: IDensityData[] = await prisma.$queryRaw(
            Prisma.sql`SELECT l.districtId AS lad19cd, SUM(a.AvgAfterDetachedBiomassBoiler) 
            AS densityData
            FROM lowerlayersuperoutputarea l
            JOIN ahdlsoa a ON l.lsoa11cd = a.lsoa11cd
            GROUP BY l.districtId;`
        );

        const densityArray = densityData.map(item => item.densityData);

        svgJson.svgData['densityRange'] = {
            'max': Math.max(...densityArray),
            'min': Math.min(...densityArray)
        }
        const densityDataMap: { [key: string]: number } = {};
        densityData.forEach((data: IDensityData) => {
            densityDataMap[data.lad19cd] = data.densityData;
        });

        Object.values(svgJson.svgData.features).forEach((item: ISvgFeature) => {
            const lad19cd = item.properties?.lad19cd;
            densityDataMap.hasOwnProperty(lad19cd) && (item.properties.density = densityDataMap[lad19cd]);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        await prisma.$disconnect();
    }
};

getLADdata();

app.get('/api/svg', (req: Request, res: Response) => {
    res.end(JSON.stringify(svgJson))
});
