import { getSVG } from "@/app/hooks/useSVG";
import { ISVGResponse } from "@/app/interfaces/ISvgResponse";
import { NationMapWrapper } from "@/app/components/NationMap/NationMapWrapper";
import Image from "next/image";

export default async function BreakdownHeat() {
    const svg: ISVGResponse = await getSVG();

    return (
        <>
            <br />
            <div className="relative text-center">
                <h1 className="text-5xl font-bold relative z-10 inline-block title">
                    <span className="relative z-10 dark:text-gray-200">
                        THE EFFECT OF NEW MEASURES ON HEAT DEMAND
                    </span>
                    <span
                        className="absolute top-0 left-0 w-full h-full bg-green-300/50 -z-10"
                        style={{
                            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)",
                        }}
                    ></span>
                </h1>
            </div>
            <div className="p-4">
                <NationMapWrapper svgData={svg.svgData} />
            </div>
            <div>
                <p className="subtitle dark:text-gray-200">
                    The building stock data and energy performance information
                    of dwellings (obtained from EPCs) were used to estimate the
                    annual heat demand of dwellings in a LSOA. The annual heat
                    demand of the building stock, with and without energy
                    efficiency improvements, was calculated for all of the LSOAs
                    in England and Wales for 16 dwelling categories. In this
                    study, a dwelling category is the combination of a dwelling
                    type (i.e., detached, semi-detached, terraced, or flat) and
                    a heating system (i.e., natural gas boiler, resistance
                    heater, biomass boiler or oil boiler).
                </p>
                <hr className="lineBreak"></hr>
            </div>
            <br />
            <br />

            <div className="flex justify-center my-8 px-10 md:px-32">
                <Image
                    src="/images/HeatDemand.jpg"
                    alt="test"
                    width={600}
                    height={300}
                />
            </div>

            <div className="figureText ">
                <h1 className="title flex justify-center hover:text-[#FED136]">
                    FIGURE DESCRIPTION
                </h1>
                <p>
                    {" "}
                    Figure 2 shows an EPC for a detached house with a current
                    energy efficiency rating of 45 (band E ∈ [39,54]) and a
                    potential energy efficiency rating of 69 (band C ∈ [69,80])
                    on a scale from 1 (band G ∈ [1,20]), the worst, up to 100
                    (band A ∈ [92,100]), the best. The space heating and hot
                    water demand considering current and potential energy
                    efficiency ratings are also estimated in an EPC. The annual
                    heat demand based on potential energy efficiency ratings
                    considers that all of the recommended energy efficiency
                    measures impacting heat demand in the EPC have been
                    implemented.
                </p>
                <hr className="lineBreakFigureText"></hr>
                <br />
            </div>
            <br />
        </>
    );
}
