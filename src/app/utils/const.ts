import { Prisma } from "@prisma/client";
import path from "path";

export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Directory paths
 */
export const SERVER_SIDE = path.join(process.cwd(), "src", "app");

const DATA_DIR = path.join("data");

const GEOJSON_DIR = path.join(DATA_DIR, "geojson");
const CSV_DIR = path.join(SERVER_SIDE, DATA_DIR, "csv");

const EPSG3857 = path.join(GEOJSON_DIR, "EPSG3857");
const OSGB36_DIR = path.join(GEOJSON_DIR, "OSGB36");
const WGS84_DIR = path.join(GEOJSON_DIR, "WGS84");

const LOOKUP_DIR = path.join(CSV_DIR, "lookup");
const RESEARCH_DIR = path.join(CSV_DIR, "research");

/**
 * GeoJSON file paths
 */
const EPSG3857_LAD_PATH = path.join(EPSG3857, "2_LAD.geojson"); // LAD19CD

const OSGB36_COUNTRIES_PATH = path.join(OSGB36_DIR, "0_COUNTRY.geojson");
const OSGB36_REGIONS_WA_PATH = path.join(OSGB36_DIR, "1_REGION_WA.geojson");
const OSGB36_LAD_PATH = path.join(OSGB36_DIR, "2_LAD.geojson"); // LAD11CD

const WGS84_COUNTRIES_PATH = path.join(WGS84_DIR, "0_COUNTRY.geojson");
const WGS84_REGIONS_PATH = path.join(WGS84_DIR, "1_REGION.geojson");
const WGS84_LAD_PATH = path.join(WGS84_DIR, "2_LAD.geojson");

export const GEOJSON = {
    EPSG: {
        LAD: EPSG3857_LAD_PATH,
    },

    OSGB36: {
        COUNTRIES: OSGB36_COUNTRIES_PATH,
        REGIONS_WA: OSGB36_REGIONS_WA_PATH,
        LAD: OSGB36_LAD_PATH,
    },

    WGS84: {
        COUNTRIES: WGS84_COUNTRIES_PATH,
        REGIONS: WGS84_REGIONS_PATH,
        LAD: WGS84_LAD_PATH,
    },
};

/**
 * CSV file paths
 */
const COUNTRIES_PATH = path.join(CSV_DIR, "0_COUNTRY.csv");
const REGIONS_PATH = path.join(CSV_DIR, "1_REGION.csv");
const LAD_PATH = path.join(CSV_DIR, "2_LAD.csv");
const LSOA_PATH = path.join(CSV_DIR, "3_LSOA.csv");

/**
 * Research paths
 */
const ANNUAL_HEAT_DEMAND = path.join(RESEARCH_DIR, "AHD_LSOA.csv");
const ENERGY_EFFICIENCY_IMPROVEMENT_COSTS = path.join(
    RESEARCH_DIR,
    "EEIC_LA.csv"
);
const HALF_HOURLY_HEATING_TECHNOLOGY_PROFILES = path.join(
    RESEARCH_DIR,
    "HHPoHT.csv"
);

// ---------------------------------------------
// Lookup tables:
// Not sure if we'll actually neeed these, but I'm
// keeping them here for now - just in case.
// ---------------------------------------------
const MASTER = path.join(LOOKUP_DIR, "LOOKUP_MASTER.csv");

export const CSV = {
    COUNTRIES: COUNTRIES_PATH,
    REGIONS: REGIONS_PATH,
    LAD: LAD_PATH,
    LSOA: LSOA_PATH,

    LOOKUPS: {
        MASTER,
    },

    RESEARCH: {
        AHD: ANNUAL_HEAT_DEMAND,
        EEIC: ENERGY_EFFICIENCY_IMPROVEMENT_COSTS,
        HHPoHT: HALF_HOURLY_HEATING_TECHNOLOGY_PROFILES,
    },
};

/**
 * Model field mapping
 */

type FieldMapping = {
    [K in keyof typeof Prisma.ModelName]: {
        [key: string]: string | string[];
    };
};

const DataSetType = <const>[
    "Annual Heat Demand",
    "Energy Efficiency Improvements Costs",
    "Half-hourly Heating Technology Profiles",
];

export type DataSets = (typeof DataSetType)[number];

/**
 * Columns are made up of:
 *  - Measure
 *      - Optional: Descriptor
 *  - Housing
 *  - Technology
 *
 *  Measure + Descriptor + Housing + Technology = Field name
 *
 *  e.g. column name: Average heat demand before energy efficiency measures for detached gas boiler
 *  is equivalent: [Average heat demand] [before energy efficiency measures for] [detached] [gas boiler]
 *  becomes: Avg + Before + Detached + GasBoiler
 *  becomes: AvgBeforeDetachedGasBoiler
 */
interface IColumnStructure {
    [key: string]: {
        [key: string]: string;
    };
}

// For research CSVs
export const COLUMN: IColumnStructure = {
    MEASURES: {
        // AHD
        "Average heat demand": "Avg",
        "Number of": "NoOf",
        "Total heat demand": "TotalHeatDemand",

        // EEIC
        "Average energy efficiency improvements costs of": "AvgImpCost",

        // HHPoHT
        Normalised_: "Normalised",
    },
    DESCRIPTORS: {
        // Order matters here - the longer strings must come first, otherwise
        // there may be a trailing "for" in certain replacement instances

        // AHD
        "after energy efficiency measures for": "After",
        "before energy efficiency measures for": "Before",

        // EEIC
        "after energy efficiency measures": "After",
        "before energy efficiency measures": "Before",

        // HHPoHT
        ASHP: "ASHP",
        GSHP: "GSHP",
        Resistance_heater: "ResistanceHeater",
        Gas_boiler: "GasBoiler",
    },
    HOUSING: {
        detached: "Detached",
        flat: "Flat",
        "semi-detached": "Semi",
        terraced: "Terraced",
    },
    TECHNOLOGY: {
        "biomass boiler": "BiomassBoiler",
        "gas boiler": "GasBoiler",
        "oil boiler": "OilBoiler",
        "resistance heating": "ResistanceHeating",

        // HHPoHT
        _heat: "Heat",
        _elec: "Elec",
        _gas: "Gas",
    },
};

// This is a mapping of the prisma model field names to the CSV column names
// Specifically for geospatial CSVs
export const FIELDS: FieldMapping = {
    // Models
    Country: {
        // id: "ctry11cd",
    },
    Region: {
        countryId: "ctry11cd",
        rgn22cd: ["RGN22CD", "SENER22CD"],
        rgn22nm: ["RGN22NM", "SENER22NM"],
        rgn22nmw: ["RGN22NMW", "SENER22NMW"],
    },
    LocalAuthorityDistrict: {
        regionId: "RGN22CD",
    },
    LowerLayerSuperOutputArea: {
        districtId: "LAD19CD",
    },
    HHPoHT: {},
    AHDLSOA: {},
    EEICLA: {},
    Account: {},
    Session: {},
    User: {},
    VerificationToken: {},
};
