import { API_URL, OATResolution } from "@/app/utils/const";

/**
 *
 * @param fetchAll Whether to fetch all half-hourly points (true) or just daily resolution (false: default)
 * @returns
 */
export const useHalfHourlyOAT = async (fetchAll: boolean = false) => {
    const resolution: OATResolution = fetchAll ? "half-hourly" : "daily";
    const url = `${API_URL}/half-hourly/oat?resolution=${resolution}`;

    return (await fetch(url)).json();
};
