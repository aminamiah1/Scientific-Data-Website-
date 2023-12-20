import Image from "next/image";
import Link from "next/link";

export default function ResistanceHeaters() {
  return (
    <>
      <div className="relative text-center">
        <br />
        <br />
        <h1 className="text-5xl font-bold relative z-10 inline-block title">
          <span className="relative z-10 dark:text-gray-200">
            CREATION OF THE HALF-HOURLY PROFILES: RESISTANCE HEATERS
          </span>
          <span
            className="absolute top-0 left-0 w-full h-full bg-green-300/50 -z-10"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)" }}
          ></span>
        </h1>
      </div>
      <div className="my-8 mx-auto px-10 ">
        <p className="text-lg subtitle dark:text-gray-200">
          For resistance heaters, some preliminary steps were required to
          calculate the half-hourly electricity demand for heating. The Energy
          Demand Research Project published electricity demand at half-hourly
          resolution for 14,000 dwellings from early-2008 to the end of 2010. No
          information was provided regarding the type of heating system in each
          household. Hence, to determine if a household was using resistance
          heaters or not, the average daily electricity demand in summer and
          winter were compared. If the demand in winter was at least twice that
          in summer, then the household was considered to be electrically
          heated. Two separate sub-datasets were created: the first was a
          dataset for electrically heated households (3,367 dwellings) and the
          second was a dataset for households that used energy carriers other
          than electricity for heating (10,952 dwellings). The difference
          between the average aggregated half-hourly electricity demand of these
          sub-datasets was used to represent a half-hourly profile of the
          electricity used by resistance heaters for heating. For the ASHPs,
          GSHPs and gas boilers, the datasets were directly used to create
          aggregated average half-hourly heat production and energy demand of
          these heating technologies.
        </p>
        <hr className="my-4"></hr>
      </div>

      <div className="flex justify-center my-8 px-10 md:px-32">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="https://www.nature.com/articles/s41597-022-01356-9/tables/4"
        >
          This Table shows the number of entries in the final datasets.
        </Link>
      </div>

      <div className="figureText ">
        <h1 className="title flex justify-center hover:text-[#FED136]">
          Cleaning the half-hourly profiles
        </h1>
        <p>
          {" "}
          In terms of cleaning procedure, the aggregated average profiles for
          ASHPs and GSHPs were cleaned using a rolling z-score on the heat
          production data with a window size of 24. Entries with an absolute
          z-score above 3 were removed from the dataset. Further data was
          removed manually. For ASHPs, 338 entries were removed from the
          training dataset. For GSHPs, 146 entries were removed from the
          training dataset. For gas boilers and resistance heaters, no procedure
          was performed to clean the data.
        </p>
        <hr className="lineBreakFigureText"></hr>
        <br />
      </div>
      <br />
    </>
  );
}
