import Image from "next/image";


export default function Home() {
    return (
      <>
      <div className="title">
          <h1>ABSTRACT</h1>
      </div>
      <div>
          <p className="subtitle">The decarbonisation of residential heating is crucial if the net-zero target in the United Kingdom is going to be achieved.

This paper describes methods to produce data to quantify the impacts of residential heat decarbonisation on the energy supply infrastructure across England and Wales.

For the year 2018, annual heat demand for a range of dwellings was estimated for almost 35,000 local areas (known as Lower Layer Super Output Areas: LSOAs).

Energy savings through implementing the potential energy efficiency measures and the indicative costs of the energy efficiency measures were quantified.

Profiles were synthesised for heat production and energy demand of selected heating technologies using average daily temperature and data from trial projects.

These profiles were created to study the impacts of different types of heating technology in each LSOA under user-defined heat decarbonisation pathways.

Data describing the dwelling stock, heating technologies, annual heat demand for each LSOA, indicative costs of energy efficiency improvements for each local authority and the profiles for each technology were created.</p>
<table className="table-auto">
  <tr>
    <th>Measurement(s)</th>
    <td>Annual heat demand | Half hourly heat production of ASHP's, GSHP's, gas boilers and resistance heaters | Half-hourly energy consumption of ASHP's, GSHP's, gas boilers and resistance heaters | Cost of energy efficiency </td>
  </tr>
  <tr>
    <th>Technology Type(s)</th>
    <td>digital curation | supervised machine learning</td>
  </tr>
  <tr>
    <th>Sample characteristic - Environment</th>
    <td>anthropogenic environment</td>
  </tr>
    <tr>
    <th>Sample characteristic - Location</th>
    <td>England | Wales </td>
  </tr>
</table>
          <hr className="lineBreak"></hr>
      </div>
      <h1 className="title">BACKGROUND + SUMMARY</h1>
      <div className="grid grid-cols-4 gap-4 pl-10 pr-10">
        <p>WHAT ARE THE SUITABLE TECHNOLOGICAL OPTIONS FOR HEAT DECARBONISATION?</p>
        <p>WHAT ARE THE IMPACTS OF VARIOUS HEAT DECARBONISATION PATHWAYS ON THE LOCAL AND NATIONAL ENERGY SUPPLY INFRASTRUCTURE?</p>
      </div>
      <br/>
      <br/>
      <div className="grid grid-cols-4 gap-4 pl-10 pr-10">
      <div className="figureText ">
          <h1 className='title '>#1</h1>
          <p> Decarbonising heat is a major challenge facing UK energy policy. In 2018, residential space heating and hot water were responsible for 394 TWh of the final energy consumption of the UK.</p>
          <hr className="lineBreakFigureText"></hr>
          <br/>
      </div>
      <div className="figureText ">
          <h1 className='title '>#2</h1>
          <p>  This is approximately 41% of total UK final energy consumption across all sectors (excluding transport). This is the equivalent of more than 78 MtCO2e (calculated using carbon emissions factors.</p>
          <hr className="lineBreakFigureText"></hr>
          <br/>
      </div>
      <div className="figureText ">
          <h1 className='title '>#3</h1>
          <p> Currently, residential heating in the UK is mostly reliant on natural gas. In 2018, 302 TWh of natural gas was consumed for space heating and hot water.</p>
          <hr className="lineBreakFigureText"></hr>
          <br/>
      </div>
      <div className="figureText ">
          <h1 className='title '>#4</h1>
          <p> To achieve its net-zero target by 2050, the UK residential heat sector is expected to undergo a radical change to significantly increase the installation of heat pumps and hydrogen boilers.</p>
          <hr className="lineBreakFigureText"></hr>
          <br/>
      </div>
      </div>
    </>
    );
}
