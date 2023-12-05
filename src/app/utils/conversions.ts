import * as d3 from "d3";
import proj4 from "proj4";
import { GEOJSON } from "./const";
import { FeatureCollection } from "geojson";
import path from "path";

// Credit for EPSG:27700 (OSGB36):
// https://spatialreference.org/ref/epsg/27700/proj4/
proj4.defs(
    "EPSG:27700",
    "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs "
);
// Credit for EPSG:3857 (Web Mercator):
// https://spatialreference.org/ref/sr-org/7483/proj4/
proj4.defs(
    "EPSG:3857",
    "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
);
// Credit for EPSG:4326 (WGS84):
// https://spatialreference.org/ref/epsg/4326/proj4/
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");

/**
 * Converts OSGB36 coordinates to WGS84 format.
 *
 * OSGB36 is the coordinate system used in Great Britain, and also
 * goes by the name British National Grid (BNG).
 *
 * The GeoJSONs downloaded from the UK government's website tend to use
 * OSGB36, so this function is used to convert them to WGS84, which is
 * the coordinate system required for d3-geo.
 *
 * @param northing Equivalent to latitude (Y)
 * @param easting Equivalent to longitude (X)
 */
export function convertOSGB36toWGS84(northing: number, easting: number) {
    let latitude, longitude;
    try {
        // console.info(northing, easting);
        [longitude, latitude] = proj4("EPSG:27700", "EPSG:4326", [
            northing,
            easting,
        ]);
    } catch (e) {
        console.debug("Error converting OSGB36 to WGS84");
        console.debug(`Northing: ${northing}, Easting: ${easting}`);
        console.error(e);
        latitude = 0;
        longitude = 0;
    }

    return { latitude, longitude };
}

export function convertEPSG3857toWGS84(northing: number, easting: number) {
    let latitude, longitude;
    try {
        // console.info(northing, easting);
        [longitude, latitude] = proj4("EPSG:3857", "EPSG:4326", [
            northing,
            easting,
        ]);
    } catch (e) {
        console.debug("Error converting EPSG:3857 to WGS84");
        console.debug(`Northing: ${northing}, Easting: ${easting}`);
        console.error(e);
        latitude = 0;
        longitude = 0;
    }

    return { latitude, longitude };
}

// export async function convertCountryBngToLngLat(
//     JSON_PATH: string,
//     conversionFn: (y: any, x: any) => any = convertOSGB36toWGS84
// ): Promise<IGeoJSON> {
//     // const data: IGeoJSON | undefined = await d3.json(JSON_PATH);
//     const data: IGeoJSON = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

//     const geo: IGeoJSON = data!;

//     const convert = (coordsOrArray: [number, number] | any[]): any => {
//         if (typeof coordsOrArray[0] === "number") {
//             const [x, y] = coordsOrArray;

//             const { latitude, longitude } = conversionFn(x, y);
//             return [longitude, latitude];
//         } else {
//             return coordsOrArray.map((x) => convert(x));
//         }
//     };

//     const { features } = geo;

//     features!.forEach((feature) => {
//         feature.geometry.coordinates = feature.geometry.coordinates.map(
//             (coords) => convert(coords)
//         );
//     });

//     return geo;
// }

export const lowerCaseFirstLetter = (str: string) =>
    str.charAt(0).toLowerCase() + str.slice(1);

export const upperCaseFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
