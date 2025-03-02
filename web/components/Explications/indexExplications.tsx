// import { Expli, TextExplication } from "./TextExplications";
import { Expli } from "./TextExplications";
// import { ImageContainerExplications } from "../Cards/CardContainer";
import { BackgroundExplications } from "./BackgroundExplications";
// import { LoadingResultWebGL } from "../WebGL/loadingResultWebGL";
import { ContainerExplications } from "./ContainerExplications";

const listExplications: Expli[] = [
  {
    key: "0",
    title: "Performance",
    description: "Improve your PostgreSQL database performance with our advanced static analysis tool. Identify potential issues and optimize your SQL code without runtime overhead.",
  },
  {
    key: "1",
    title: "Deep Insight Mining",
    description: "Uncover hidden data relationships in your SQL code.",
  },
  {
    key: "2",
    title: "Easy to Use",
    description: "Simple and intuitive interface to get insights quickly.",
  },
  {
    key: "3",
    title: "Comprehensive Analysis",
    description: "Over 100 performance recommendations and 600 architectural suggestions."
  }
];

export function Explications() {

  return (
    <section className="">
      <BackgroundExplications position="left" className="mask-image mask-image-l" />
      <BackgroundExplications position="right" className="mask-image mask-image-r" />
      <ContainerExplications listExplications={listExplications} />
    </section>
  );
}
