import { FeatureCollection, Geometry, GeoJsonGeometryTypes, Feature } from 'geojson';
export interface ISVGData {
    features: Feature;
    svgData: FeatureCollection<Geometry, GeoJsonGeometryTypes>;
    densityRange: {
        max: number,
        min: number
    };
};
