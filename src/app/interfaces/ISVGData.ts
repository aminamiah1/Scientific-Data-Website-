import { FeatureCollection, Geometry, GeoJsonGeometryTypes } from 'geojson';
export interface ISVGData {
    svgData: FeatureCollection<Geometry, GeoJsonGeometryTypes>;
}