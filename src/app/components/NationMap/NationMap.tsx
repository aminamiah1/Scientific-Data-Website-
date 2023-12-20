"use client";
import React, { ReactNode, useEffect } from "react";
import L from "leaflet";
import { Layer, LeafletMouseEvent } from "leaflet";
import { getMapStyles } from "@/app/utils/getMapStyles";
import { highlightMapFeature } from "@/app/utils/highlightMapFeature";
import { ISVGData } from "@/app/interfaces/ISVGData";
import { Feature, GeoJsonObject } from "geojson";

export const NationMap = ({ svgData }: { svgData: ISVGData }): ReactNode => {
    const range = [svgData.densityRange.min, svgData.densityRange.max];
    useEffect(() => {
        const map = L.map("map").setView([52.56, -1.47], 6);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        const zoomToFeature = (e: {
            target: { getBounds: () => L.LatLngBoundsExpression };
        }): void => {
            map.fitBounds(e.target.getBounds());
        };

        const resetHighlight = (e: LeafletMouseEvent): void => {
            geojson.resetStyle(e.target);
        };

        const onEachFeature = (_feature: Feature, layer: Layer): void => {
            layer.on({
                mouseover: highlightMapFeature,
                mouseout: resetHighlight,
                click: zoomToFeature,
            });
        };

        let geojson = L.geoJson(svgData, {
            style: (feature) => getMapStyles(feature, range),
            onEachFeature: onEachFeature,
        }).addTo(map);

        return () => {
            map.remove();
        };
    }, [svgData]);

    return <div id="map"></div>;
};
