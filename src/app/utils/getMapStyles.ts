import { getMapColor } from "./getMapColor";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { PathOptions } from 'leaflet';
export const getMapStyles = (feature: Feature<Geometry, GeoJsonProperties> | undefined, range: number[]): PathOptions => {
    const density: number = feature?.properties?.density || 0;
    const noOfSegments: number = 9;
    const rangeArray: number[] = [];
    const segmentSize: number = (range[1] - range[0]) / noOfSegments;
    for (let i: number = 0; i < noOfSegments; i++) {
        rangeArray.push(range[0] + i * segmentSize);
    };
    return {
        fillColor: getMapColor(density, rangeArray, noOfSegments) as unknown as string,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
};
