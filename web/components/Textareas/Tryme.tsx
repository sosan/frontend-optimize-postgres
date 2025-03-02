import "../../assets/css/textarea.css";
import trymePNG from "../../assets/png/tryme.png";
import trymeWEBP from "../../assets/webp/tryme.webp";
import trymeAVIF from "../../assets/avif/tryme.avif";

interface ContainerProps {
  class: string
}

export function Tryme(props: ContainerProps) {
  return (
    <>
      <picture className={`${props.class}`}>
        <source srcSet={trymeAVIF} type="image/avif" />
        <source srcSet={trymeWEBP} type="image/webp" />
        <img className={`tryme `} loading="lazy" decoding="async" src={trymePNG} alt="try me" />
      </picture>
    </>
  );
}
