import { CSV } from "./const";
import {
    loadAHDLSOA,
    loadCountries,
    loadDistricts,
    loadEEICLA,
    loadHHPoHT,
    loadLSOAs,
    loadRegions,
} from "./csv";

loadCountries(CSV.COUNTRIES, async () => {
    await loadRegions(CSV.REGIONS, async () => {
        await loadDistricts(CSV.LAD, async () => {
            await loadEEICLA(async () => {
                console.log("Loading LSOAs - this might take a while...");
                await loadLSOAs(CSV.LSOA, async () => {
                    console.log(
                        "Loading Annual Heat Demand LSOAs - this might also take a while..."
                    );
                    await loadAHDLSOA(async () => {
                        console.log(
                            "Loading Half-hourly heating technology profiles - this might also take a while..."
                        );
                        await loadHHPoHT(async () => {});
                    });
                });
            });
        });
    });
});
