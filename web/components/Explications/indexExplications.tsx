// import { Expli, TextExplication } from "./TextExplications";
import { ImageContainerExplications } from "../Cards/CardContainer";
import { LoadingResultWebGL } from "../WebGL/loadingResultWebGL";
import { Expli } from "./TextExplications";
import { BackgroundExplications } from "./BackgroundExplications";
import { ContainerExplications } from "./ContainerExplications";
import React from "react";
import "../../assets/css/explications.css";

import { ExplicationWebGL } from "../WebGL/explicationWebGL";
export const EXPLICATION_1 = "explication-one";
export const EXPLICATION_2 = "explication-two";
import backgroundHeaderPNG from "../../assets/png/backgroundheader.png";

const listExplications: Expli[] = [
  {
    key: "0",
    title: "Performance Optimization",
    description: "Boost your PostgreSQL database performance with advanced static analysis. Detect potential issues and optimize your SQL code without affecting runtime execution.",
  },
  {
    key: "1",
    title: "Deep Insight Mining",
    description: "Uncover hidden data relationships and gain deeper insights into your SQL.",
  },
  {
    key: "2",
    title: "User-Friendly Interface",
    description: "An intuitive and easy-to-use interface to quickly access key insights.",
  },
  {
    key: "3",
    title: "Comprehensive Analysis",
    description: "Over 100 performance recommendations and 600 architectural suggestions to optimize your SQL.",
  }
];


export function Explications() {

  return (
    // <section className="">
    //   <BackgroundExplications position="left" className="mask-image mask-image-l" />
    //   <BackgroundExplications position="right" className="mask-image mask-image-r" />
    //   <ContainerExplications listExplications={listExplications} />
    // </section>
    <>
      <section className="tried">
        {/* <img className="" id="explication-two" src={backgroundHeaderPNG} width="1000px" height="700px" /> */}
        <ExplicationWebGL initialRender={true}
          eventRenderingName={EXPLICATION_2}
          embeded={false}
          idContainer="explication-two"
          idCanvas="canvas-expli-two"
          sourceRender="column4"
          width="1000px" height="1200px"
          modeRender=""
        />

      </section>
      <section className="explications__section ">
        <div className="contain">
          <div className="grid grid-cols-2 max-w-[1100px]">
            <div className="items-center justify-self-center">
              <div className="flex flex-col gap-y-5 ">
                <div className="feature-media">

                  <ImageContainerExplications>
                    <ExplicationWebGL initialRender={false}
                      eventRenderingName={EXPLICATION_1}
                      embeded={true}
                      idContainer="explication-one"
                      idCanvas="canvas-expli-one"
                      sourceRender="new"
                      width="100%" height="100%"
                      modeRender="dd"
                    />
                  </ImageContainerExplications>

                </div>
                <h2 className="feature-media__title">
                  <i>Optimize SQL</i>,<b>boost performance,</b> <span>fast, and precise analysis.</span>
                </h2>
              </div>
            </div>
            <div className="">
              <div className="comp-two-column-features__right-col">
                <div className="features-list">
                  {
                    listExplications.map((element: Expli) => (
                      <a key={element.key} href="https://lambdalabs.com/service/gpu-cloud/1-click-clusters?hsLang=en" className="features-list__item" data-id="1">
                        <div className="features-list__icon">
                          {/* <img src="https://lambdalabs.com/hubfs/type=1cc.svg" alt="icon" /> */}
                          {/* <img src="https://lambdalabs.com/hubfs/type=1cc_hover.svg" alt="icon" className="img--hover" /> */}
                        </div>
                        <div className="features-list__content">
                          <h3 className="title_content">{element.title}</h3>
                          <p className="content_content text-balance ">{element.description}</p>
                        </div>
                      </a>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
