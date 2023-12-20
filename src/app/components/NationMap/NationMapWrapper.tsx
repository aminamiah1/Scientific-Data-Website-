"use client";
import { ISVGData } from "@/app/interfaces/ISVGData";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { ISVGResponse } from "@/app/interfaces/ISvgResponse";
const NationMap: ComponentType<ISVGData> = dynamic(
    () => import("./NationMap").then((mod) => mod.NationMap),
    {
        ssr: false,
    }
);
export const NationMapWrapper = ({
    svgData,
}: {
    svgData: ISVGResponse;
}): ReactNode => {
    return <NationMap svgData={svgData.svgData} />;
};
