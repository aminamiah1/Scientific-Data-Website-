import {
    FeatureCollection,
    Geometry,
    GeoJsonGeometryTypes,
    Feature,
} from "geojson";

export interface ISVGData {
    type: GeoJsonGeometryTypes;
    features: Feature;
    svgData: FeatureCollection<Geometry, GeoJsonGeometryTypes>;
    densityRange: {
        max: number;
        min: number;
    };
}
