import { useEffect, useState } from "react";
import "../../assets/css/webgl.css";
import { addListenerForEvents } from "../Notification/eventEmitter.ts";
import { sourcesRender } from "./sources.ts";

// @ts-ignore
import { Fragmen } from "./fragment.js";
import React from "react";

let canvas = null;
let mode: any = null;

const CURRENT_MODE = Fragmen.MODE_GEEKEST_300;
// let currentSource = "" as string;


interface ContainerProps {
  embeded: boolean
  idCanvas: string
  width: string
  height: string
  sourceRender: string
  idContainer: string
  eventListRenderingName: string[]
  initialRender: boolean
}

// interface ContainerState {
//   renderingWebGL: boolean
// }

let fragmen: any = null;
let globalWebGL = true;
export function LoadingResultWebGL(props: ContainerProps) {
  let [actualRenderingWebGL, setActualRenderingWebGL] = useState(props.initialRender);
  // let [globalWebGL, setGlobalWebGL] = useState(false);
  // let [globalWebGL, setGlobalWebGL] = useState(false);

  useEffect(() => {
    setActualRenderingWebGL(props.initialRender);
    // setGlobalWebGL(true);
    globalWebGL = true;

    if (!props.embeded) {
      window.addEventListener("load", generateRender);
    } else {
      generateRender();
    }

    addListenerForEvents(props.eventListRenderingName, setComponentState);

    window.addEventListener("resize", () => {
      toggleLayerView();
    }, false);
  }, []);

  function setComponentState({ isRender, globalRender, isPlaying }: {
    isRender: boolean;
    globalRender: boolean;
    isPlaying: boolean;
  }) {
    if (globalRender !== undefined) {
      globalWebGL = globalRender;
      return;
    }

    if (!globalWebGL || isPlaying === false) {
      setActualRenderingWebGL(false);
      return;
    }

    if (isPlaying === undefined && !globalWebGL) {
      setActualRenderingWebGL(false);
      return;
    }

    setActualRenderingWebGL(isRender);
  }

  function generateRender() {
    if (!actualRenderingWebGL || !globalWebGL) {
      return;
    }
    if (fragmen !== null) return;

    canvas = document.querySelector(`#${props.idCanvas}`);
    if (canvas === null || canvas === undefined) {
      return;
    }

    const currentSource = sourcesRender[props.sourceRender] as string;

    resize();

    const option = {
      target: canvas,
      eventTarget: window,
      mouse: true,
      resize: true,
      escape: false
    }

    fragmen = new Fragmen(option);

    fragmen.onDraw(() => {
      let freq = 0.0;

      if (freq > 0.0) {
        fragmen.setFrequency(freq);
      }
    });

    fragmen.mode = CURRENT_MODE;
    fragmen.render(currentSource);

    if (fragmen.isWebGL2 !== true) {
      for (let i = 0; i < mode.children.length; ++i) {
        mode.children[i].disabled = Fragmen.RAINBOW_MODE_GEEKEST_300.includes(i);
      }
    }
  }

  function resize() {
    const canvas: any = document.querySelector(`#${props.idCanvas}`);
    if (canvas === undefined || canvas === null) {
      return;
    }
    const bound = canvas.parentElement.getBoundingClientRect();
    canvas.width = bound.width;
    canvas.height = bound.height;
  }

  function toggleLayerView() {
    resize();
    if (fragmen === null) return;
    fragmen.rect();
  }

  function initRender() {
    if (!actualRenderingWebGL || !globalWebGL) {
      if (fragmen !== null) {
        fragmen.setAnimation(false);
      }
    } else {
      if (fragmen !== null) {
        fragmen.setAnimation(true);
        fragmen.draw();
      } else {
        generateRender();
      }
    }
  }

  initRender();

  return (
    <>
      <div id={props.idContainer} className={(actualRenderingWebGL) ? "initialvisible" : "novisible"}>
        <canvas id={props.idCanvas} width={props.width} height={props.height} className="rounded-3xl " ></canvas>
      </div>
    </>
  );
}
