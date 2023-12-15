import { Prisma, PrismaClient } from "@prisma/client";
import { ICSVRow } from "../interfaces/ICSVRow";
import { COLUMN, FIELDS } from "./const";
import { Feature, FeatureCollection, Geometry, GeometryObject } from "geojson";
import { lowerCaseFirstLetter, upperCaseFirstLetter } from "./conversions";
// import fs from "fs";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare global {
    var db: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const db = globalThis.db ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.db = db;

// For generalised rules (see mappings in utils/const.ts)
const getSegments = (column: string) => {
    let segments: string[] = [];

    // Segment being measure, descriptor, housing type, technology
    Object.keys(COLUMN).forEach((segment) => {
        const shouldPluralise =
            segment === "TECHNOLOGY" && segments.join("").startsWith("NoOf");
        // Try to find a match for the column segment (e.g. "Number of" -> "NoOf")
        Object.keys(COLUMN[segment as keyof typeof COLUMN]).forEach((x) => {
            // If a match is found, add the shortened segment to the list
            if (column.startsWith(x)) {
                let toPush: string = COLUMN[segment as keyof typeof COLUMN][x];

                if (shouldPluralise) {
                    // Pluralise the segment name (er -> ers, ing -> ers)
                    toPush = toPush.replace(/(er|ing)$/, "ers");
                }

                segments.push(toPush);

                // Update the column for the next iteration
                column = column.replace(x, "").trim();
            }
        });
    });

    return segments.map((x) => x);
};

// For research CSVs
const convertColumnToField = (column: string): string => {
    const segments = getSegments(column);

    if (segments.length !== 0) return segments.join("");

    switch (column) {
        case "LSOA11CD":
            return "lsoa11cd";
        case "Local Authority (2011)":
        case "Local Authority (2019)":
            const year = column.substring(column.length - 3, column.length - 1);
            return `lad${year}nm`;
        case "Area (km2)":
        case "Road length (m)":
        case "Rurality":
        case "index":
            return column
                .replace(/\(.+\)$/, "")
                .split(" ")
                .map(upperCaseFirstLetter)
                .join("")
                .trim();
        case "UK_daily_average_OAT_[degrees_C]":
            return "UKDailyAverageOAT";
        case "Total energy efficiency improvements costs (GBP)":
            return "TotalImprovementCosts";
        default:
            console.error("Unrecognised column: ", column);
            return column;
    }
};

export const csvColumnToModelField = (column: string) => {
    // Clean up any trailing characters
    column = column.replaceAll('"', "").trim();

    return convertColumnToField(column);
};

export const getMatchingCSVHeaders = (
    headers: string[],
    model: Prisma.ModelName
) => {
    // Ran into some issues with invisible trailing characters
    headers = headers.map((x) => x.trim());

    // Ensure case insensitivity
    const modelFields: string[] = Object.keys(
        (db[lowerCaseFirstLetter(model) as keyof typeof db] as any).fields
    ).map((x) => x.toLowerCase());

    // Ensure all model fields are present in the CSV
    return headers.filter(
        (x) =>
            modelFields.includes(x.toLowerCase()) ||
            isDifferentFieldName(x, model, true)
    );
};

export const csvHeadersMatchModel = (
    headers: string[],
    model: Prisma.ModelName
) => {
    headers = headers.map((x) => x.trim());

    const modelFields: string[] = Object.keys(
        (db[lowerCaseFirstLetter(model) as keyof typeof db] as any).fields
    );

    const tooFewHeaders = modelFields.length > headers.length;

    // No point checking if the fields exist in the CSV if there
    // are too few headers in the CSV
    if (tooFewHeaders) {
        return false;
    }

    // Ensure case insensitivity
    const headersLower = headers.map((x) => x.toLowerCase());

    // Ensure all model fields are present in the CSV
    return modelFields.every((x) => {
        return (
            headersLower.includes(x.toLowerCase()) ||
            isDifferentFieldName(x, model)
        );
    });
};

const checkEntryForField = (
    entry: [string, string | string[]],
    toFind: string
) => {
    const [key, value] = entry;
    if (value instanceof Array) {
        return value.map((x) => x.toLowerCase()).includes(toFind);
    }
    return value.toLowerCase() === toFind.toLowerCase();
};

const getDifferentFieldName = (
    fieldName: string,
    model: Prisma.ModelName,
    searchByValue: boolean = false
) => {
    if (searchByValue) {
        return Object.entries(FIELDS[model]).find((e) =>
            checkEntryForField(e, fieldName)
        )?.[0];
    }
    return (FIELDS[model] as any)[fieldName];
};

/**
 * Gets the field name from the model that matches the CSV column name
 * @param fieldName
 * @param model
 * @returns
 */
const getSensitisedFieldName = (
    fieldName: string,
    model: Prisma.ModelName
): string => {
    return Object.keys(
        (db[lowerCaseFirstLetter(model) as keyof typeof db] as any).fields
    ).find(
        (sensitisedField) =>
            sensitisedField.toLowerCase() === fieldName.toLowerCase()
    )!;
};

const isDifferentFieldName = (
    fieldName: string,
    model: Prisma.ModelName,
    searchByValue: boolean = false
) => {
    return getDifferentFieldName(fieldName, model, searchByValue) !== undefined;
};

export const prepareCSVData = (
    data: ICSVRow,
    model: Prisma.ModelName,
    searchForFieldName: boolean = true
) => {
    const preparedData: any = {};

    for (const [col, value] of Object.entries(data)) {
        let fieldName = col;
        if (searchForFieldName) {
            fieldName = isDifferentFieldName(col, model, true)
            ? getDifferentFieldName(col, model, true)
            : getSensitisedFieldName(col, model);
        }

        preparedData[fieldName] = prepareValue(value, fieldName, model);
    }

    return preparedData;
};

const prepareValue = (
    value: string,
    fieldName: string,
    model: Prisma.ModelName
) => {
    const fieldType = (
        db[lowerCaseFirstLetter(model) as keyof typeof db] as any
    ).fields[fieldName].typeName;

    switch (fieldType) {
        case "Int":
            return parseInt(value);
        case "Float":
            return parseFloat(value);
        case "Boolean":
            return value === "1" || value.toLowerCase() === "true";
        // String \/
        default:
            return value;
    }
};

const firstAndLastCoordsAreEqual = (coords: any[]) => {
    const first = coords[0];
    const last = coords[coords.length - 1];

    return first[0] === last[0] && first[1] === last[1];
};

// const everyOtherCoord = (coords: any[]): [number, number][] => {
//     const isCoordArray =
//         Array.isArray(coords[0]) && typeof coords[0][0] === "number";

//     if (!isCoordArray) {
//         return coords.map(everyOtherCoord);
//     }

//     const filtered = coords.filter((_, i) => i % 2 === 0);

//     if (!firstAndLastCoordsAreEqual(filtered)) {
//         filtered.push(filtered[0]);
//     }

//     return filtered;
// };

/**
 *
 * @param coords
 * @param dp The number of decimal places to round to
 */
// const lowerPrecision = (coords: any[], dp: number = 5): [number, number][] => {
//     const isCoordArray =
//         Array.isArray(coords[0]) && typeof coords[0][0] === "number";

//     if (!isCoordArray) {
//         return coords.map((x) => lowerPrecision(x, dp));
//     }

//     return coords.map((x: [number, number]) => [
//         Number.parseFloat(x[0].toFixed(dp)),
//         Number.parseFloat(x[1].toFixed(dp)),
//     ]);
// };

// export const getOptimisedFilename = (filepath: string) => {
//     const parts = filepath.split(".");
//     const ext = parts.pop();

//     return `${parts.join(".")}-optimised.${ext}`;
// };

// const optimiseCoordinates = (
//     JSON_PATH: string,
//     optimisationFn: (coords: any[]) => any
// ) => {
//     const geoJSON: FeatureCollection = JSON.parse(
//         fs.readFileSync(JSON_PATH, "utf8")
//     );

//     const { features } = geoJSON;

//     features!.forEach((feature: any) => {
//         // TODO!
//         feature.geometry.coordinates = feature.geometry.coordinates.map((v) =>
//             optimisationFn(v)
//         );
//     });

//     fs.writeFileSync(getOptimisedFilename(JSON_PATH), JSON.stringify(geoJSON));
// };

// optimiseCoordinates(path.join(SERVER_SIDE, GEOJSON.WGS84), lowerPrecision);
