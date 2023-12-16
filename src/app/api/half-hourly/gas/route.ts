import { db, extractKeysToArray } from "@/app/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  let dataToReturn = await db.hHPoHT.findMany({
    select: {
      Index: true,
      NormalisedASHPHeat: true,
      NormalisedGSHPHeat: true,
      NormalisedGasBoilerHeat: true,
      NormalisedResistanceHeaterHeat: true,
      NormalisedASHPElec: true,
      NormalisedGasBoilerGas: true,
      NormalisedGSHPElec: true,
      NormalisedResistanceHeaterElec: true,
      UKDailyAverageOAT: true,
    },
  });

  return NextResponse.json(dataToReturn, { status: 200 });
}

export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ status: 403 });
}
