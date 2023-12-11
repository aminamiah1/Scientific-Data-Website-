export default function Home() {
  return (
    <>
      <div className=" max-w-screen-xl mx-auto px-10 md:px-32">
        <br />
        <div className="md:float-right md:ml-6 ">
          <div className="h-96 w-96 bg-navimage-bg bg-cover bg-center" />
        </div>
        <div className="">
          <div className="relative text-center">

            <h1 className="text-5xl font-bold relative z-10 inline-block dark:text-gray-200">
              <span className="relative space-y-5 z-10">ABSTRACT</span>
              <span className="absolute top-0 left-0 w-full h-full bg-green-300/50 -z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }}></span>
            </h1>
          </div>
          <p className="text-lg subtitle mt-8 dark:text-gray-200">
            The decarbonisation of residential heating is crucial if the net-zero target in the United Kingdom is going to be achieved. This paper describes methods to produce data to quantify the impacts of residential heat decarbonisation on the energy supply infrastructure across England and Wales. For the year 2018, annual heat demand for a range of dwellings was estimated for almost 35,000 local areas (known as Lower Layer Super Output Areas: LSOAs). Energy savings through implementing the potential energy efficiency measures and the indicative costs of the energy efficiency measures were quantified. Profiles were synthesized for heat production and energy demand of selected heating technologies using average daily temperature and data from trial projects. These profiles were created to study the impacts of different types of heating technology in each LSOA under user-defined heat decarbonisation pathways. Data describing the dwelling stock, heating technologies, annual heat demand for each LSOA, indicative costs of energy efficiency improvements for each local authority and the profiles for each technology were created.
          </p>
        </div>
      </div>
      <div className="my-8 px-10 md:px-32 montserrat-font">
        <div className="my-6">
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full mb-4 bg-gray-100 shadow-md rounded-lg dark:bg-slate-500">
            <tbody className="divide-y divide-gray-300 ">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-slate-600">Measurement(s)</th>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-200">Annual heat demand | Half hourly heat production of ASHP{'\''}s, GSHP{'\''}s, gas boilers and resistance heaters | Half-hourly energy consumption of ASHP{'\''}s, GSHP{'\''}s, gas boilers and resistance heaters | Cost of energy efficiency </td>
              </tr>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-slate-600">Technology Type(s)</th>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-200">Digital curation | supervised machine learning</td>
              </tr>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-slate-600">Sample characteristic - Environment</th>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-200">Anthropogenic environment</td>
              </tr>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-slate-600">Sample characteristic - Location</th>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-200">England | Wales </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr className="my-4"></hr>
      </div>
      <h1 className="text-4xl font-bold my-8 px-10 md:px-32 title dark:text-gray-200">BACKGROUND + SUMMARY</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-10 md:px-32 subtitle dark:text-gray-200">
        <p>WHAT ARE THE SUITABLE TECHNOLOGICAL OPTIONS FOR HEAT DECARBONISATION?</p>
        <p>WHAT ARE THE IMPACTS OF VARIOUS HEAT DECARBONISATION PATHWAYS ON THE LOCAL AND NATIONAL ENERGY SUPPLY INFRASTRUCTURE?</p>
      </div>
      <br />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-10 md:px-32">
        <div className="figureTextCustom bg-pink ">
          <h1 className="title ">#1</h1>
          <p> Decarbonising heat is a major challenge facing UK energy policy. In 2018, residential space heating and hot water were responsible for 394 TWh of the final energy consumption of the UK.</p>
          <hr className="lineBreakFigureText"></hr>
          <br />
        </div>
        <div className="figureTextCustom bg-yellow">
          <h1 className="title ">#2</h1>
          <p>  This is approximately 41% of total UK final energy consumption across all sectors (excluding transport). This is the equivalent of more than 78 MtCO2e (calculated using carbon emissions factors.</p>
          <hr className="lineBreakFigureText"></hr>
          <br />
        </div>
        <div className="figureTextCustom bg-bleu ">
          <h1 className="title ">#3</h1>
          <p> Currently, residential heating in the UK is mostly reliant on natural gas. In 2018, 302 TWh of natural gas was consumed for space heating and hot water.</p>
          <hr className="lineBreakFigureText"></hr>
          <br />
        </div>
        <div className="figureTextCustom bg-purple ">
          <h1 className="title ">#4</h1>
          <p> To achieve its net-zero target by 2050, the UK residential heat sector is expected to undergo a radical change to significantly increase the installation of heat pumps and hydrogen boilers.</p>
          <hr className="lineBreakFigureText"></hr>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}
