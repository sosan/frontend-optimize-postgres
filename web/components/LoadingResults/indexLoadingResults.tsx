import React from "react";
import { LoadingResultWebGL } from "../WebGL/loadingResultWebGL";
export const LOADING_RENDERING_RESULTS = "loadingrenderingresults";

interface ContainerProps {
  playLoading: boolean;
}

export function LoadingResults(props: ContainerProps) {
  return (
    <>
      <LoadingResultWebGL initialRender={false}
        eventListRenderingName={[LOADING_RENDERING_RESULTS]}
        embeded={true}
        idContainer="result-webgl-container"
        idCanvas="canvasresults"
        sourceRender="loadingAnimationResult"
        width="100%" height="100%"
      />
      {
        props.playLoading ? <>
          <div id="load">
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div>
          </div></>
        : <></>
      }
    </>
  );
}
