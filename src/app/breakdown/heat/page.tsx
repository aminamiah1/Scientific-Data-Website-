import { getSVG } from "@/app/hooks/useSVG";
import { ISVGResponse } from "@/app/interfaces/ISvgResponse";
import { NationMapWrapper } from "@/app/components/NationMap/NationMapWrapper";

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
            <NationMapWrapper svgData={svg} />
            <div>
                <p className="subtitle dark:text-gray-200">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet. Proin gravida dolor sit
                    amet lacus accumsan et viverra justo commodo. Proin sodales
                    pulvinar tempor. Cum sociis natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus. Nam fermentum,
                    nulla luctus pharetra vulputate, felis tellus mollis orci,
                    sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Aenean euismod bibendum
                    laoreet. Proin gravida dolor sit amet lacus accumsan et
                    viverra justo commodo. Proin sodales pulvinar tempor. Cum
                    sociis natoque penatibus et magnis dis parturient montes,
                    nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
                    vulputate, felis tellus mollis orci, sed rhoncus sapien nunc
                    eget odio. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Aenean euismod bibendum laoreet. Proin
                    gravida dolor sit amet lacus accumsan et viverra justo
                    commodo. Proin sodales pulvinar tempor. Cum sociis natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Nam fermentum, nulla luctus pharetra
                    vulputate, felis tellus mollis orci, sed rhoncus sapien nunc
                    eget odio. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Aenean euismod bibendum laoreet. Proin
                    gravida dolor sit amet lacus accumsan et viverra justo
                    commodo.
                </p>
                <hr className="lineBreak"></hr>
            </div>
            <br />
            <br />
            <div className="figureText ">
                <h1 className="title flex justify-center hover:text-[#FED136]">
                    FIGURE DESCRIPTION
                </h1>
                <p>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet. Proin gravida dolor sit
                    amet lacus accumsan et viverra justo commodo. Proin sodales
                    pulvinar tempor. Cum sociis natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus. Nam fermentum,
                    nulla luctus pharetra vulputate, felis tellus mollis orci,
                    sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Aenean euismod bibendum
                    laoreet. Proin gravida dolor sit amet lacus accumsan et
                    viverra justo commodo. Proin sodales pulvinar tempor. Cum
                    sociis natoque penatibus et magnis dis parturient montes,
                    nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
                    vulputate, felis tellus mollis orci, sed rhoncus sapien nunc
                    eget odio. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Aenean euismod bibendum laoreet. Proin
                    gravida dolor sit amet lacus accumsan et viverra justo
                    commodo. Proin sodales pulvinar tempor. Cum sociis natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Nam fermentum, nulla luctus pharetra
                    vulputate, felis tellus mollis orci, sed rhoncus sapien nunc
                    eget odio.
                </p>
                <hr className="lineBreakFigureText"></hr>
                <br />
            </div>
            <br />
        </>
    );
}
