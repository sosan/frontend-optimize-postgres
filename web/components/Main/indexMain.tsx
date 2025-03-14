import { CentralContent } from "./Central.js";
import { Playground } from "../Playground/indexPlayground.js";
import { Explications } from "../Explications/indexExplications.js";
import React from "react";
// import { MiddleTitles } from "../Titles/indexMiddleTitles.tsx";

export function MainContent() {
  return (
    <>
      <main className="flex flex-col  items-center max-h-screen">
        <CentralContent />
        <Playground />
        {/* <MiddleTitles /> */}
        <Explications />
      </main>
    </>
  );
}
