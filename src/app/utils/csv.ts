import { ICSVRow } from "@/app/interfaces/ICSVRow";
import { Prisma } from "@prisma/client";
import csv from "csv-parser";
import fs from "fs";
import { CSV, FIELDS } from "./const";
import { lowerCaseFirstLetter } from "./conversions";
import {
    csvColumnToModelField,
    csvHeadersMatchModel,
    getMatchingCSVHeaders,
    prepareCSVData,
    db as prisma,
} from "./data";

function defaultLoadOnEnd(
    rows: Object[],
    model: Prisma.ModelName,
    hasPreparedFieldNames: boolean = false
) {
    return async () => {
        for (const csvRow of rows) {
            const searchForFieldName = !hasPreparedFieldNames;
            // Convert all column names to their respective Prisma
            // field names, and convert all datatypes (only supports
            // string, int, float, and boolean at the moment)
            const data = prepareCSVData(
                csvRow as ICSVRow,
                model,
                searchForFieldName
            );

            // Insert the data into the database
            await (
                prisma[
                    lowerCaseFirstLetter(model) as keyof typeof prisma
                ] as any
            ).create({
                data,
            });
        }

        console.log(`${model} data successfully loaded`);
    };
}

async function loadCSV(
    filename: string,
    model: Prisma.ModelName,
    isResearch: boolean,
    onEnd: (
        rows: Object[],
        model: Prisma.ModelName,
        hasPreparedFieldNames?: boolean
    ) => () => Promise<void> = defaultLoadOnEnd
) {
    try {
        const csvFilePath = filename;
        const columns: string[] = [];
        const rows: Object[] = [];

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on("data", (data) => {
                const shouldGenerateFieldNames = isResearch;
                // Check that we have the correct data for the models
                if (rows.length === 0) {
                    const csvHeaders = Object.keys(data);
                    const modelFields = Object.keys(
                        (
                            prisma[
                                lowerCaseFirstLetter(
                                    model
                                ) as keyof typeof prisma
                            ] as any
                        ).fields
                    );

                    if (
                        !shouldGenerateFieldNames &&
                        !csvHeadersMatchModel(csvHeaders, model)
                    ) {
                        throw new Error(
                            `CSV columns do not match model fields.\nCSV (${csvHeaders.length}): ` +
                                csvHeaders.join(", ") +
                                `\nModel (${modelFields.length}): ` +
                                modelFields.join(", ")
                        );
                    }

                    // Only add the columns we're interested in
                    if (shouldGenerateFieldNames) {
                        FIELDS[model] = {};
                        columns.push(
                            ...csvHeaders.map((x) => {
                                const modelField = x;
                                FIELDS[model]![modelField] = x;
                                return modelField;
                            })
                        );
                    } else {
                        columns.push(
                            ...getMatchingCSVHeaders(Object.keys(data), model)
                        );
                    }
                }

                const row: ICSVRow = {};

                Object.entries(data).map(([k, _]) => {
                    // Trim whitespace from the column name
                    let column = k.trim();

                    if (isResearch) {
                        column = csvColumnToModelField(column);
                        row[column] = data[k];
                        return;
                    }

                    // Only select the columns we're interested in
                    // to minimise memory footprint
                    if (columns.includes(column)) {
                        row[column] = data[k];
                    }
                });

                rows.push(row);
            })
            .on("end", onEnd(rows, model, isResearch));
    } catch (error) {
        console.error("Error loading CSV data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export const loadCountries = async (
    filename: string,
    afterEnd: () => Promise<any>
) => {
    const isResearch = false;
    await loadCSV(
        filename,
        "Country",
        isResearch,
        (rows, model) => async () => {
            await defaultLoadOnEnd(rows, model)();
            if (afterEnd) await afterEnd();
        }
    );
};

export const loadRegions = async (
    filename: string,
    afterEnd: () => Promise<any>
) => {
    const isResearch = false;
    await loadCSV(filename, "Region", isResearch, (rows, model) => async () => {
        await defaultLoadOnEnd(rows, model)();
        if (afterEnd) await afterEnd();
    });
};

export const loadDistricts = async (
    filename: string,
    afterEnd: () => Promise<any>
) => {
    const isResearch = false;
    await loadCSV(
        filename,
        "LocalAuthorityDistrict",
        isResearch,
        (rows, model) => async () => {
            await defaultLoadOnEnd(rows, model)();
            if (afterEnd) await afterEnd();
        }
    );
};

export const loadLSOAs = async (
    filename: string,
    afterEnd: () => Promise<any>
) => {
    const isResearch = false;
    await loadCSV(
        filename,
        "LowerLayerSuperOutputArea",
        isResearch,
        (rows, model) => async () => {
            await defaultLoadOnEnd(rows, model)();
            if (afterEnd) await afterEnd();
        }
    );
};

export const loadAHDLSOA = async (
    afterEnd: () => Promise<any>,
    filename: string = CSV.RESEARCH.AHD
) => {
    const isResearch = true;
    await loadCSV(
        filename,
        "AHDLSOA",
        isResearch,
        (rows, model) => async () => {
            await defaultLoadOnEnd(rows, model, isResearch)();
            if (afterEnd) await afterEnd();
        }
    );
};

export const loadEEICLA = async (
    afterEnd: () => Promise<any>,
    filename: string = CSV.RESEARCH.EEIC
) => {
    const isResearch = true;
    await loadCSV(filename, "EEICLA", isResearch, (rows, model) => async () => {
        await defaultLoadOnEnd(rows, model, isResearch)();
        if (afterEnd) await afterEnd();
    });
};

export const loadHHPoHT = async (
    afterEnd: () => Promise<any>,
    filename: string = CSV.RESEARCH.HHPoHT
) => {
    const isResearch = true;
    await loadCSV(filename, "HHPoHT", isResearch, (rows, model) => async () => {
        await defaultLoadOnEnd(rows, model, isResearch)();
        if (afterEnd) await afterEnd();
    });
};

// loadCSV(path.join(SERVER_SIDE, CSV.RESEARCH.HHPoHT), "AHDLSOA");
