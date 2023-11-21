import Image from 'next/image';

export default function HeatDemand() {
    return (
        <>
           <div className="title">
            <h1>TECHNOLOGICAL OPTIONS FOR LOW CARBON HEATING</h1>
        </div>
        <div>
            <p className="subtitle">The pathways for heat decarbonisation focus on national-level changes and trends. These studies use national and regional energy models to suggest a mix of heating technologies for a given pathway and to calculate the impacts of these heating technologies on the energy system. <br />
            The two heat decarbonisation pathways that have been identified are ‘electrification’ and ‘hydrogen’. In the ‘electrification’ pathway, heat demand is met mainly by air-source and ground-source heat pumps, and by resistive heating. 
            In the ‘hydrogen’ pathway, heat demand is primarily met from hydrogen boilers. <br />
            The national-level heat decarbonisation pathways can provide insights into what the future of heat could look like, and they indicate the scale of the changes that are required to be undertaken by the energy system. <br />
            These pathways support the creation of national-level strategies, policy actions and relevant incentives for heat decarbonisation. However, the uptake of suitable and practical heating technologies in local areas depends on local circumstances.</p>
            <hr className="lineBreak"></hr>
        </div>
        <div className="flex justify-center">
            <Image src = "/images/bAndAEnergy.png" alt = "test"
            width={600} 
            height={300}
            />
        </div>
        <br/>
        <br/>
        <div className="figureText ">
            <h1 className='title flex justify-center hover:text-[#FED136]'>FIGURE DESCRIPTION</h1>
            <p> The figure overview of the methods that have been used to produce the three datasets forming this database. <br />
                The annual heat demand for different type of dwellings before and after considering energy efficiency improvements (dataset 1) was derived from publicly available information about the energy performance of dwellings.<br />
                Dataset 2 is an extension of dataset 1 and includes data about the costs of implementing these energy efficiency improvements. Dataset 3 was created using synthesised half-hourly heat production and energy demand of four heating technologies, as follows: air-source heat pumps (ASHPs), ground-source heat pumps (GSHPs), gas boilers (both natural gas and hydrogen boilers) and resistance heaters.<br />
                These profiles were created using machine learning models that were trained using datasets from trial projects where the heat production and/or energy demand of these four heating technologies were recorded.</p>
            <hr className="lineBreakFigureText"></hr>
            <br/>
        </div>
        <br/>
      </>
    );
}