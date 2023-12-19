"use client";

import { DataPoint, OATResolution } from "@/app/utils/const";
import * as d3 from "d3";
import { useEffect } from "react";

const colourDomain = ["winter", "spring", "summer", "autumn"];
const colourRange = [
    "rgb(0, 153, 255)",
    "rgb(153, 255, 153)",
    "rgb(255, 255, 0)",
    "rgb(255, 102, 51)",
];
const margin = { top: 0, right: 0, bottom: 50, left: 60 };

export default function Render({
    dataValues,
    dataKeys,
    minX,
    maxX,
    minY,
    maxY,
    resolution,
}: {
    dataValues: DataPoint[];
    dataKeys: string[];
    finishedRender: boolean;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    resolution: OATResolution;
}) {
    useEffect(() => {
        const tooltip = d3
            .select("#chart-container")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px");

        var myColor = d3
            .scaleLinear()
            .domain(colourDomain.map((d, i) => i))
            .range(colourRange as any);

        const width = Math.min(800);
        const height = Math.min(400);

        const heatIndexes: number[] = dataKeys
            .map((d, i) => {
                if (d.endsWith("Heat")) return i;
            })
            .filter((d) => d) as number[];

        const timeIndex = dataKeys.indexOf("Index");
        const oatIndex = dataKeys.indexOf("UKDailyAverageOAT");

        const halfHourlyHeatProductionSums: Number[] = dataValues.map((d) =>
            d3.sum(heatIndexes.map((i) => Number.parseFloat(d[i] as string)))
        );

        const xScale = d3
            .scaleLinear()
            .domain([minX, maxX])
            .range([margin.left, width]);
        const yScale = d3.scaleLinear().domain([minY, maxY]).range([height, 0]);

        const getSeason = (d: any) =>
            Math.floor((new Date(d[timeIndex] as string).getMonth() / 12) * 4) %
            4;

        d3.select("#chart")
            .selectAll(`circle[xyz="${dataValues.length}"]`)
            .data(dataValues)
            .enter()
            .append("circle")
            .on("mouseenter", (e, d) => {
                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("display", "block");
            })
            .on("mousemove", (e, d) => {
                let html = ``;

                dataKeys.forEach((key, i) => {
                    if (key === "Index") {
                        let date;
                        if (resolution === "daily") {
                            date = new Date(
                                d[i] as string
                            ).toLocaleDateString();
                        } else {
                            date = new Date(d[i] as string).toLocaleString();
                        }
                        html += `<div>${key}: ${date}</div>`;
                    } else {
                        html += `<div>${key}: ${d[i]}</div>`;
                    }
                });

                tooltip
                    .html(html)
                    .style("left", e.pageX + 20 + "px")
                    .style("top", e.pageY + "px");
            })
            .on("mouseleave", () => {
                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("display", "none");
            })
            .attr("cx", (d, i) =>
                xScale(halfHourlyHeatProductionSums[i] as number)
            )
            .attr("cy", (d) => yScale(d[oatIndex as number] as number))
            .attr("r", 2)
            .attr("fill", (d) => myColor(getSeason(d)))
            .attr("class", `hover:fill-red-500`);
    }, [dataValues]);

    return <></>;
}
