import Image from "next/image";
import Link from "next/link";

export default function BreakdownOfHeat() {
  return (
    <>
      <div className="relative text-center">
        <br />
        <br />
        <h1 className="text-5xl font-bold relative z-10 inline-block title">
          <span className="relative z-10 dark:text-gray-200">
            ENERGY EFFICIENCY
          </span>
          <span
            className="absolute top-0 left-0 w-full h-full bg-green-300/50 -z-10"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)" }}
          ></span>
        </h1>
      </div>
      <div className="my-8 mx-auto px-10 ">
        <p className="text-lg subtitle dark:text-gray-200">
          Average cost to improve the energy efficiency of each dwelling
          category. For each local authority, this was calculated using the
          recommended energy efficiency measures displayed on EPCs and
          considering their indicative costs. In this study, an ensemble
          approach was used where the predictions from different sub-models were
          combined to improve the accuracy of the final predictions. Figure 6
          shows an example of this approach with two sub-models: a Main model
          and an additional model, Model 99. These sub-models were used to
          predict the values of a target variable, either heat production or
          energy demand. The Main model was trained on the entire dataset.
          Meanwhile, Model 99 was trained on a subset of the dataset that only
          included the target variable values above the 99th percentile, other
          values were set to zero. When the predictions from the Main model were
          lower than the predictions from Model 99, they were replaced by the
          predictions from Model 99. This was done to improve the predicted peak
          heat production and peak energy demand. The results are referred to as
          combined predictions.
        </p>
        <hr className="my-4"></hr>
      </div>

      <div className="flex justify-center my-8 px-10 md:px-32">
        <Image
          src="/images/BreakdownEnergy.jpg"
          alt="test"
          width={600}
          height={300}
        />
      </div>

      <div className="figureTextCustom bg-pink ">
        <h1 className="title ">FIGURE DESCRIPTION</h1>
        <p>
          {" "}
          Figure 6 shows an example of this approach with two sub-models: a Main
          model and an additional model, Model 99. These sub-models were used to
          predict the values of a target variable, either heat production or
          energy demand. The Main model was trained on the entire dataset.
          Meanwhile, Model 99 was trained on a subset of the dataset that only
          included the target variable values above the 99th percentile, other
          values were set to zero. When the predictions from the Main model were
          lower than the predictions from Model 99, they were replaced by the
          predictions from Model 99. This was done to improve the predicted peak
          heat production and peak energy demand. The results are referred to as
          combined predictions.
        </p>
        <hr className="lineBreakFigureText"></hr>
        <br />
      </div>

      <div className="flex justify-center my-8 px-10 md:px-32">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
          px-4 rounded"
          href="https://www.nature.com/articles/s41597-022-01356-9/tables/7"
        >
          TABLE 7
        </Link>
      </div>

      <div className="figureText ">
        <h1 className="title flex justify-center hover:text-[#FED136]">
          TABLE DESCRIPTION
        </h1>
        <p>
          {" "}
          The costs (£) of energy efficiency measures considered by dwelling
          types that were used to estimate the costs of energy efficiency
          improvements in England and Wales.
        </p>
        <hr className="lineBreakFigureText"></hr>
        <br />
      </div>
      <br />
    </>
  );
}
