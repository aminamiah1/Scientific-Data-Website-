"use client";

import { GEOJSON } from "@/app/utils/const";
import * as d3 from "d3";
import { FeatureCollection as GeoJSON } from "geojson";
import { useEffect, useRef, useState } from "react";

export default function Choropleth() {
    const svg = useRef(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        d3.json(GEOJSON.WGS84.LAD).then((data: any) => {
            const proj = d3
                .geoMercator()
                .translate([200, 250])
                .center([0, 0])
                .scale(0.5)
                .fitSize([400, 500], data);

            const geo: GeoJSON = data;

            d3.select(svg.current)
                .selectAll("path")
                .data(geo.features as any)
                .enter()
                .append("path")
                .attr("class", "country")
                .attr("d", d3.geoPath().projection(proj) as any)

                .each((d, i, g) => {
                    console.log(i, geo.features[i].properties);
                    const node = d3.select(g[i]);
                    node.attr("id", `${geo.features[i].properties!.FID}`)

                        .on("mouseenter", () => {
                            setData(geo.features[i].properties);
                        })
                        .on("mouseleave", () => {
                            setData(null);
                        });
                })
                .style("stroke", "white");
        });
    }, []);

    return (
        <>
            <h3>Choropleth</h3>
            <div>
                <h2>Optimised:</h2>
                <svg ref={svg} width="400" height="500"></svg>
            </div>
            <div style={{ color: "white" }}>
                {data &&
                    Object.keys(data).map((k) => {
                        return (
                            <>
                                <span>
                                    <b>{k}: </b>
                                    {data[k]}
                                </span>
                                <br />
                            </>
                        );
                    })}
            </div>
        </>
    );
}
