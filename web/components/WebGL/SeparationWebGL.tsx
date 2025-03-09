import separationSVG from "../../assets/svg/separacion.svg";
import separationPNG from "../../assets/png/separation_webgl.png";
import separationWEBP from "../../assets/webp/separation_webgl.webp";
import "../../assets/css/webgl.css";
import { useEffect, useRef, useState } from "react";
import React from "react";
interface SeparationWebGLProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export function SeparationWebGL(props: SeparationWebGLProps) {
  const [position, setPosition] = useState({ x: 0, y: 0, visibility: "novisiblewithoutanimation" });
  const separationRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const updatePosition = () => {
      if (props.containerRef.current) {
        const rectSeparation = separationRef.current?.getBoundingClientRect();
        const rectCanvas = props.containerRef.current.getBoundingClientRect();

        if (rectCanvas.width === 0 || rectCanvas.height === 0 || rectSeparation?.height === 0) {
          setTimeout(updatePosition, 100);
          return;
        }

        const heightSeparation = rectSeparation?.height as number;
        const posY = rectCanvas.height - (heightSeparation / 1.5);
        setPosition({
          x: rectCanvas.left,
          y: posY,
          visibility: "initialvisible",
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [props.containerRef]);

  return (
    <>
      <picture>
        {/* <source srcSet={separationAVIF} type="image/avif" /> */}
        <source srcSet={separationWEBP} type="image/webp" />
        <source srcSet={separationPNG} type="image/png" />
        <source srcSet={separationSVG} type="image/svg" />
        <img ref={separationRef} style={{
          position: "absolute",
          top: `${position.y}px`,
        }} className={`${position.visibility} separationwebgl`} src={separationPNG} alt="separation webgl" />
      </picture>
    </>
  );
}
