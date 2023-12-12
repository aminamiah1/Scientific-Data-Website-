"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { GEOJSON } from "../utils/const";
import { FeatureCollection as GeoJSON } from "geojson";

export default function Choropleth() {
    const svgOpt = useRef(null);
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

            // proj.postclip(
            //     d3.geoClipRectangle(100, 100, 400, 400) as any
            // );

            d3.select(svgOpt.current)
                .selectAll("path")
                .data(geo.features as any)
                .enter()
                .append("path")
                .attr("class", "country")
                // .attr("id", (d) => `${d.properties.CTRY11CD}`)
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
                <svg ref={svgOpt} width="400" height="500"></svg>
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
