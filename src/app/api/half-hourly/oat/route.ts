import { DataPoint, OATResolution } from "@/app/utils/const";
import { db, extractKeysToArray } from "@/app/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;

    const resolution: OATResolution = searchParams.get(
        "resolution"
    ) as OATResolution;

    let dataToReturn: { [key: string]: any };

    switch (resolution) {
        case "half-hourly": {
            dataToReturn = await db.hHPoHT.findMany({
                select: {
                    Index: true,
                    NormalisedASHPHeat: true,
                    NormalisedGasBoilerHeat: true,
                    NormalisedGSHPHeat: true,
                    NormalisedResistanceHeaterHeat: true,
                    UKDailyAverageOAT: true,
                },
            });
            break;
        }
        case "daily": {
            const dailyRes: { [key: string]: {} } = {};

            dataToReturn = await db.hHPoHT.findMany({
                select: {
                    Index: true,
                    NormalisedASHPHeat: true,
                    NormalisedGasBoilerHeat: true,
                    NormalisedGSHPHeat: true,
                    NormalisedResistanceHeaterHeat: true,
                    UKDailyAverageOAT: true,
                },
            });

            dataToReturn.map((datapoint: any) => {
                const { Index, ...rest } = datapoint;

                const dateIndex = `${Index.toISOString().split("T")[0]}`;

                if (!(dateIndex in dailyRes)) {
                    dailyRes[dateIndex] = { ...rest };
                    (dailyRes[dateIndex] as { [key: string]: any })[
                        "UKDailyAverageOAT"
                    ] = [rest["UKDailyAverageOAT"]];

                    return;
                }

                Object.keys(rest).map((key) => {
                    if (key === "UKDailyAverageOAT") {
                        (dailyRes[dateIndex] as { [key: string]: any })[
                            key
                        ].push(rest[key]);
                    } else {
                        (dailyRes[dateIndex] as { [key: string]: any })[key] +=
                            rest[key];
                    }
                });
            });

            Object.keys(dailyRes).map((key: any) => {
                (dailyRes[key] as { [key: string]: any })["UKDailyAverageOAT"] =
                    (dailyRes[key] as { [key: string]: any })[
                        "UKDailyAverageOAT"
                    ].reduce((a: number, b: number) => a + b, 0) /
                    (dailyRes[key] as { [key: string]: any })[
                        "UKDailyAverageOAT"
                    ].length;
                (dailyRes[key] as { [key: string]: any })["Index"] = key;
            });

            dataToReturn = Object.values(dailyRes);
            break;
        }
    }
    dataToReturn = extractKeysToArray(dataToReturn as Object[]);

    return NextResponse.json(dataToReturn, { status: 200 });
}

export async function POST() {
    return NextResponse.json({ status: 403 });
}
