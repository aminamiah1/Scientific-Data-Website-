import { Feature, GeoJsonProperties, Geometry } from 'geojson';
export const mockFeature: Feature<Geometry, GeoJsonProperties> = {
    geometry: {
        type: "Polygon",
        coordinates: []
    },
    properties: {
        density: 5
    },
    type: "Feature"
};
