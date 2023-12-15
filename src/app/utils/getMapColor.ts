import { scaleThreshold } from 'd3-scale';
import { schemeOranges } from 'd3-scale-chromatic';

export const getMapColor = (density: number, rangeArray: number[], noOfSegments: number): number => {
    const colorScale = scaleThreshold<number, string>()
        .domain(rangeArray)
        .range(schemeOranges[noOfSegments]);
    return colorScale(density) as unknown as number;
};
