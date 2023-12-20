import { getMapColor } from "./getMapColor";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { PathOptions } from 'leaflet';
export const getMapStyles = (feature: Feature<Geometry, GeoJsonProperties> | undefined): PathOptions => {
    const density: number = feature?.properties?.density || 0;
    return {
        fillColor: getMapColor(density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
};
