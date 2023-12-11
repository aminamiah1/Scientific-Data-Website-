import { ISVGData } from "../interfaces/ISVGData";

import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import fs from 'fs';
const app = express();
const port: number = 4001;
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

app.get('/api/svg', (req: Request, res: Response) => {
    res.end(JSON.stringify(svgJson))
});
