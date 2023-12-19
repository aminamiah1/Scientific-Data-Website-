"use client";

import { cacheItem, getCacheItem } from "@/app/utils/cache";
import {
    DataDescriptors,
    DataPoint,
    DataSet,
    OATResolution,
} from "@/app/utils/const";
import { upperCaseFirstLetter } from "@/app/utils/conversions";
import { Switch } from "@headlessui/react";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import Render from "./Render";
import { sleep } from "@/app/utils/helper";

/** 0 = winter, 1 = spring, 2 = summer, 3 = autumn */
const colourDomain = ["winter", "spring", "summer", "autumn"];
const colourRange = [
    "rgb(0, 153, 255)",
    "rgb(153, 255, 153)",
    "rgb(255, 255, 0)",
    "rgb(255, 102, 51)",
];

var myColor = d3
    .scaleLinear()
    .domain(colourDomain.map((d, i) => i))
    .range(colourRange as any);
const margin = { top: 0, right: 0, bottom: 50, left: 60 };

const DATAPOINTS_TO_RENDER = (renderAmount: number, dataLength?: number) => {
    if (renderAmount < 1) {
        if (dataLength == undefined) {
            console.error(
                "If not supplying the data length, renderAmount must be >= 1"
            );
            return 1000;
        }
        return renderAmount * dataLength;
    }
    return renderAmount;
};
const SLEEP_TIME_MS = 1;

export default function Visualise({ initialData }: { initialData: DataSet }) {
    const [data, setData] = useState<DataSet>(initialData);
    const [curRender, setCurRender] = useState<number>(0);
    const [sampleRate, setSampleRate] = useState<number>(1);
    const [nextData, setNextData] = useState<DataPoint[]>([]);
    const [finishRender, setFinishRender] = useState<boolean>(false);

    const [minX, setMinX] = useState<number | null>(null);
    const [maxX, setMaxX] = useState<number | null>(null);
    const [minY, setMinY] = useState<number | null>(null);
    const [maxY, setMaxY] = useState<number | null>(null);

    const width = 800;
    const height = 400;

    // Initially we only want to load in
    const [resolution, setResolution] = useState<OATResolution>("daily");

    const toggleResolution = async () => {
        const shouldFetchAll = resolution === "daily"; // We don't want to fetch all if we're already on half-hourly

        const nextResolution = shouldFetchAll ? "half-hourly" : "daily";

        const cachedData = getCacheItem(nextResolution);

        if (cachedData) {
            setData(JSON.parse(cachedData));
            setResolution(nextResolution);
            console.log("Using cached data.", JSON.parse(cachedData).length);
            return;
        }

        fetch(`/api/half-hourly/oat?resolution=${nextResolution}`)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setResolution(nextResolution);
            });
    };

    useEffect(() => {
        d3.selectAll("circle").remove();

        const dataKeys = data[0];
        let sampledData = data.slice(1);

        if (resolution === "half-hourly") {
            sampledData = sampledData.filter((d, i) => i % sampleRate === 0);
        }

        const oatIndex = dataKeys.indexOf("UKDailyAverageOAT");

        const heatIndexes: number[] = dataKeys
            .map((d, i) => {
                if (d.endsWith("Heat")) return i;
            })
            .filter((d) => d) as number[];

        const oat = sampledData.map((d) =>
            Number.parseFloat(d[oatIndex] as string)
        );
        const halfHourlyHeatProductionSums: Number[] = sampledData.map((d) =>
            d3.sum(heatIndexes.map((i) => d[i] as number) as number[])
        );

        setMinX(0);
        setMaxX(d3.max(halfHourlyHeatProductionSums)! as number);
        setMinY((d3.min(oat) as number) - 2);
        setMaxY((d3.max(oat) as number) + 2);
    }, [data, sampleRate]);

    useEffect(() => {
        cacheItem(resolution, JSON.stringify(data), "update");

        d3.select("#chart")
            .selectAll("key")
            .data(colourDomain)
            .enter()
            .append("rect")
            .attr("x", width - 100)
            .attr("y", (_, i) => i * 30)
            .on("mouseenter", (_, i) => {
                d3.selectAll(
                    `circle:not([fill="${
                        colourRange[colourDomain.indexOf(i)]
                    }"])`
                ).attr("opacity", 0.1);
            })
            .on("mouseleave", () => {
                d3.selectAll(`circle`).attr("opacity", 1);
            })
            .attr("width", 30)
            .attr("height", 30)
            .style("fill", (d) => myColor(colourDomain.indexOf(d)));
        let size = 30;
        d3.select("#chart")
            .selectAll("key-text")
            .data(colourDomain.map(upperCaseFirstLetter))
            .enter()
            .append("text")
            .attr("x", width - 100 + size * 1.2)
            .attr("y", (d, i) => i * size + size / 2) // 100 is where the first dot appears. 25 is the distance between dots
            .text((d) => d)
            .attr("class", "dark:fill-white")
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

        const dataKeys = data[0];
        let sampledData = data.slice(1);

        const oatIndex = dataKeys.indexOf("UKDailyAverageOAT");

        const heatIndexes: number[] = dataKeys
            .map((d, i) => {
                if (d.endsWith("Heat")) return i;
            })
            .filter((d) => d) as number[];

        const oat = sampledData.map((d) =>
            Number.parseFloat(d[oatIndex] as string)
        );
        const halfHourlyHeatProductionSums: Number[] = sampledData.map((d) =>
            d3.sum(heatIndexes.map((i) => d[i] as number))
        );

        setMinX(0);
        setMaxX(d3.max(halfHourlyHeatProductionSums)! as number);
        setMinY((d3.min(oat) as number) - 2);
        setMaxY((d3.max(oat) as number) + 2);

        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(halfHourlyHeatProductionSums)!])
            .range([margin.left, width]);
        const yScale = d3
            .scaleLinear()
            .domain([(d3.min(oat) as number) - 2, (d3.max(oat) as number) + 2])
            .range([height, 0]);

        // Apply sizes to SVG
        const svg = d3
            .select("#chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        // Generate labels and axes
        d3.select("#x-axis")
            .attr("transform", `translate(0,${height})`)
            .attr("class", "dark:text-white")
            .call(d3.axisBottom(xScale) as any);
        d3.select("#y-axis")
            .attr("transform", `translate(${margin.left},0)`)
            .attr("class", "dark:text-white")
            .call(d3.axisLeft(yScale) as any);

        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "dark:fill-white")
            .attr("x", width / 2 + 50)
            .attr("y", height + 20 + 20)
            .text("Normalised Total Heat Production");

        // Y axis label:
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "dark:fill-white")
            .attr("transform", "rotate(-90)")
            .attr("y", 20)
            .attr("x", -height / 2)
            .text("Outside Average Temperature (°C)");
    }, []);

    useEffect(() => {
        const dataLoadSize = DATAPOINTS_TO_RENDER(data.length * 0.01);
        const dataToSend = data.slice(1);

        const nextIndexOutOfRange =
            curRender * dataLoadSize > dataToSend.length;

        if (!finishRender && nextIndexOutOfRange) {
            setFinishRender(true);
            console.log("Finished render");
            return;
        }

        if (finishRender) {
            console.log("Resetting render");
            setCurRender(0);
            setFinishRender(false);
            return;
        }

        sleep(SLEEP_TIME_MS).then(() => {
            setNextData(
                dataToSend.slice(
                    curRender * dataLoadSize,
                    dataLoadSize * (curRender + 1)
                )
            );
            setCurRender(curRender + 1);
        });
    }, [curRender, data]);

    useEffect(() => {
        if (resolution === "daily") return;

        const cachedData = JSON.parse(getCacheItem(resolution) as string);

        const sampledData = [
            cachedData[0],
            ...cachedData
                .slice(1)
                .filter((_: any, i: number) => i % sampleRate === 0),
        ];

        setData(sampledData as [DataDescriptors, ...DataPoint[]]);
    }, [sampleRate]);

    return (
        <>
            <Switch.Group>
                <Switch.Label className="dark:text-white mr-4">
                    Half-Hourly
                </Switch.Label>
                <Switch
                    data-cy="resolution-switch"
                    checked={resolution === "daily"}
                    onChange={toggleResolution}
                    disabled={!finishRender}
                    className={`bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 relative inline-flex items-center dark:text-white h-6 rounded-full w-11`}
                >
                    <span className="dark:text-white sr-only">Daily</span>
                    <span
                        className={`${
                            resolution === "daily"
                                ? "translate-x-6"
                                : "translate-x-1"
                        } inline-block dark:text-white w-4 h-4 transform transition ease-in-out duration-300 bg-white rounded-full`}
                    />
                </Switch>
                <Switch.Label className="dark:text-white ml-4">
                    Daily
                </Switch.Label>
            </Switch.Group>
            {resolution === "half-hourly" && (
                <div>
                    <label htmlFor="sample-rate" className="dark:text-white">
                        Sample Rate: {sampleRate}
                    </label>
                    <input
                        className="sample-rate"
                        type="range"
                        min="1"
                        max="10"
                        onChange={(e) => {
                            setSampleRate(+e.target.value);
                        }}
                        value={sampleRate}
                    />
                </div>
            )}
            <div id="chart-container">
                <svg className="mx-8 ml-6" id="chart">
                    <g id="x-axis" />
                    <g id="y-axis" />
                </svg>
            </div>

            {[minX, maxX, minY, maxY].filter((x) => x !== null).length == 4 && (
                <Render
                    dataKeys={data[0]}
                    dataValues={nextData}
                    finishedRender={finishRender}
                    minX={minX!}
                    maxX={maxX!}
                    minY={minY!}
                    maxY={maxY!}
                    resolution={resolution}
                />
            )}
        </>
    );
}
