import renderwebglAVIF from "../../assets/avif/renderingwebgl_on.avif";
import renderwebglWEBP from "../../assets/webp/renderingwebgl_on.webp";
import renderwebglPNG from "../../assets/png/renderingwebgl_on.png";

import renderwebglNOWEBP from "../../assets/webp/renderingwebgl_off.webp";
import renderwebglNOAVIF from "../../assets/avif/renderingwebgl_off.avif";
import renderwebglNOPNG from "../../assets/png/renderingwebgl_off.png";
import "../../assets/css/webgl.css";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmitEvent } from '../Notification/eventEmitter';
// import { EVENT_NAME_RESULT, ResultState } from "../Cards/BackCard.tsx";
import { LOADING_RENDERING_RESULTS } from "../LoadingResults/indexLoadingResults";
import { EXPLICATION_1 } from "../Explications/indexExplications";
import React from "react";

let bouncingToggle = false;
export function ToggleWebGL() {
  let [isRendering, setRendering] = useState(true);
  let [isJump, setIsJump] = useState("");
  let [isInitial, setIsInitial] = useState("slide-in");

  useEffect(() => {
    setTimeout(() => {
      setIsInitial("");
    }, 500);
  }, []);

  function changeStateRendering() {
    if (bouncingToggle === true) return;
    bouncingToggle = true;
    const t = setTimeout(() => {
      bouncingToggle = false;
      setIsJump("");
      clearTimeout(t);
    }, 1000);

    setIsJump("jump");
    EmitEvent(EXPLICATION_1, !isRendering);
    EmitEvent("header", !isRendering);
    EmitEvent(LOADING_RENDERING_RESULTS, {
      globalRender: !isRendering
    });
    setRendering(!isRendering);
  }

  return (
    <>
      <div className={`${isInitial} rendering-webgl`} onClick={changeStateRendering}>
        <div className={`${isJump}`}>
          <picture>
            <source srcSet={renderwebglAVIF} type="image/avif" />
            <source srcSet={renderwebglWEBP} type="image/webp" />
            <img src={renderwebglPNG} loading="lazy" decoding="async" alt="render webgl" />
          </picture>
          <picture>
            <source srcSet={renderwebglNOWEBP} type="image/webp" />
            <source srcSet={renderwebglNOAVIF} type="image/avif" />
            <img className={`cross ${(isRendering) ? "opacity-100" : "opacity-0"}`} src={renderwebglNOPNG} />
          </picture>
        </div>
      </div>
    </>
  );
}
