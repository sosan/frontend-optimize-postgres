import { Expli, TextExplication } from "./TextExplications";
import { ImageContainerExplications } from "../Cards/CardContainer";
// import { BackgroundExplications } from "./BackgroundExplications";
import { LoadingResultWebGL } from "../WebGL/loadingResultWebGL";
import React from "react";

interface ContainerProps {
  listExplications: Expli[]
}


export function ContainerExplications(props: ContainerProps) {
  return(
    <>
      <div className=" w-full flex flex-col lg:flex-row items-center justify-center gap-14">
        <div className="explication-container-left  relative max-w-154 flex items-center justify-center overflow-hidden rounded-[20px] md:rounded-[30px]

              border border-transparent
              before:bg-gradient-to-b before:from-[#000000]/70 before:to-[#51425E]/20
              before:border-inherit before:border before:rounded-[20px] before:md:rounded-[30px]
              before:absolute before:inset-0 before:z-10 before:bg-origin-border before:[mask-composite:exclude] gradient">
          <ImageContainerExplications>
            <LoadingResultWebGL initialRender={false}
              eventListRenderingName={["explicacion-1"]}
              embeded={true}
              idContainer="explication-one-webgl-container"
              idCanvas="canvas-expli-one"
              sourceRender="explition-four"
              width="100%" height="100%"
            />
          </ImageContainerExplications>
        </div>
        <div>
          <TextExplication listExplications={props.listExplications} />
        </div>
      </div>
    </>
  );
}
