import Image from "next/image";

export default function GasBoilers() {
  return (
    <>
      <div className="relative text-center">
        <br />
        <br />
        <h1 className="text-5xl font-bold relative z-10 inline-block title">
          <span className="relative z-10 dark:text-gray-200">
            CREATION OF THE HALF-HOURLY PROFILES: GAS BOILERS
          </span>
          <span
            className="absolute top-0 left-0 w-full h-full bg-green-300/50 -z-10"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)" }}
          ></span>
        </h1>
      </div>
      <div className="my-8 mx-auto px-10 ">
        <p className="text-lg subtitle dark:text-gray-200">
          Data on gas consumption in the residential sector at LSOA level in
          England and Wales is published on the Department for Business, Energy
          & Industrial Strategy’s (BEIS’s) website16. This data was used to
          estimate heat production by gas boilers, and was compared with heat
          demand from gas boilers produced by the EPC-based method for all LSOAs
          in England and Wales.
        </p>
        <hr className="my-4"></hr>
      </div>

      <div className="flex justify-center my-8 px-10 md:px-32">
        <Image
          src="/images/GasBoilers.jpg"
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
          The figure shows the difference between the heat demand in dwellings
          supplied by gas in 2018 derived from the gas consumption data from
          BEIS and the EPC-based method of the LSOAs in England and Wales for
          three levels of rurality. In the LSOAs in “Urban” and “Village, Town
          and Fringe” areas, the median difference is −8%. This shows a good
          agreement between the two methods in LSOAs with high density of
          dwellings. In contrast, the median difference is −61% for LSOAs in the
          “Hamlet & Isolated Dwellings” area. This large difference is explained
          by the low density of dwellings connected to gas networks and the low
          annual heat demand of these LSOAs, which accentuate the differences
          between the two methods.
        </p>
        <hr className="lineBreakFigureText"></hr>
        <br />
      </div>
      <br />
    </>
  );
}
