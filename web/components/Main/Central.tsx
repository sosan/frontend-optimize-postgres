import backgroundHeaderWEBP from "../../assets/webp/background_header.webp";
import backgroundHeaderAVIF from "../../assets/avif/background_header.avif";
import backgroundHeaderPNG from "../../assets/png/backgroundheader.png";
import "../../assets/css/content.css";

export function CentralContent() {
  return (
    <>
      <section className="pt-40 pb-10">
        <picture>
          <source type="image/avif" srcSet={backgroundHeaderAVIF} />
          <source type="image/webp" srcSet={backgroundHeaderWEBP} />
          <source type="image/png" srcSet={backgroundHeaderPNG} />
          <img loading="lazy" decoding="async" className="content-central-img-bg" src={backgroundHeaderAVIF} width="600" height="408" alt="background image" />
        </picture>
        <ul className="content-central">
          <li className="">
            <h1 className="text-pretty mt-0 mb-0 font-bold leading-[4.25rem] font-avenir text-[4.25rem]  ">
              Static Analizer & <i className="text-[#acffaaad]" >Optimizer</i> Postgres
            </h1>
          </li>
          <li className="flex flex-col gap-4 mt-[35px] mb-[15px] font-ibmplexmono font-normal text-3xl gapincreased-mobile  ">
            <span><b className="delimiter-green">Analyze SQL</b> source code <b>ONLY</b>.</span>
            <span><b>No runtime</b> settings or metrics needed.</span>
            <span>Audit <b>compatible</b>.</span>
            <span>MORE THAN <b className="delimiter-orange">1,300 RULES.&nbsp;</b></span>
          </li>
        </ul>
        {/* <SeparationWebGL /> */}
      </section>
    </>
  );
}
