import { useEffect, useRef, useState } from "react";
import "../../assets/css/webgl.css";
import { addListenerForEvents } from "../Notification/eventEmitter.ts";
import { sourcesRender } from "./sources.ts";

// @ts-ignore
import { Fragmen } from "./fragment.js";
import { SeparationWebGL } from "./SeparationWebGL.tsx";

let canvas = null;
let mode: any = null;

const CURRENT_MODE = Fragmen.RAINBOW_MODE_GEEKEST_300;
// let currentSource = "" as string;


interface ContainerProps {
  embeded: boolean
  idCanvas: string
  width: string
  height: string
  sourceRender: string
  idContainer: string
  eventRenderingName: string
  initialRender: boolean
}

// interface ContainerState {
//   renderingWebGL: boolean
// }

let fragmen: any = null;

export function HeaderWebGL(props: ContainerProps) {
  // const location = useLocation();
  // let renderingWebGL = true;
  const containerRef = useRef<HTMLDivElement | null>(null);
  let [renderingWebGL, setRenderingWebGL] = useState(false);

  useEffect(() => {
    setRenderingWebGL(props.initialRender);

    if (!props.embeded) {
      window.addEventListener("load", generateRender);
    } else {
      generateRender();
    }

    addListenerForEvents([props.eventRenderingName], setComponentState)
    window.addEventListener("resize", toggleLayerView);
    // window.addEventListener("resize", () => {
    //   toggleLayerView();
    // }, false);
    return () => {
      window.removeEventListener("resize", toggleLayerView);
    };
  }, []);

  function setComponentState(rendering: boolean) {
    setRenderingWebGL(rendering);
  }

  function generateRender() {
    if (!renderingWebGL) {
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
    if (!renderingWebGL) {
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
      <div ref={containerRef} id={props.idContainer} className={(renderingWebGL) ? "initialvisible" : "novisible"}>
        <canvas id={props.idCanvas} width={props.width} height={props.height}></canvas>
      </div>
      <SeparationWebGL containerRef={containerRef} />
    </>
  );
}
