import background from "../../assets/webp/background_next.webp"
import "../../assets/css/explications.css"
import { useState } from "react";

interface ContainerProps {
  position: "left" | "right" | "center"
  className: string
}


export function BackgroundExplications(props: ContainerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0, maskSize: 0 });

  const handleMouseMove = (e: any) => {
    const { top, left } = e.target.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setPosition({ x, y, maskSize: 200 });
  };

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0, maskSize: 0 });
  }



  let imageStyle: React.CSSProperties = {
    '--mask-x-l': `${position.x}px`,
    '--mask-y-l': `${position.y}px`,
    '--mask-size-l': `${position.maskSize}px`,
  } as React.CSSProperties;
  let classPosition = "background-explication-l";

  if (props.position === "right") {
    classPosition = "background-explication-r";
    imageStyle = {
      '--mask-x-r': `${position.x}px`,
      '--mask-y-r': `${position.y}px`,
      '--mask-size-r': `${position.maskSize}px`,
    } as React.CSSProperties;
  }

  return (
    <>
      <div className={`background-explication-mask-container ${classPosition}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <picture>
          <source srcSet={background} type="image/webp" />
          <img className={props.className} src={background} loading="lazy" decoding="async" alt="background" style={imageStyle} />
        </picture>
      </div>
    </>
  );
}
