import { HeaderNav } from "../../components/Header/Header.js";
import { MainContent } from "../../components/Main/indexMain.js";
import { FooterContent } from '../../components/Footer/indexFooter.js';
import { HeaderWebGL } from "@/components/WebGL/headerWebGL.tsx";

export function Home() {
  return (
    <>
      <HeaderWebGL initialRender={true} eventRenderingName="header" embeded={false} idContainer="header-webgl-container" idCanvas="webgl" width="1000px" height="700px" sourceRender="header" />
      <HeaderNav />
      <MainContent />
      <FooterContent />
    </>
  );
}
