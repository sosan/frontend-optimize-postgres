import React from "react";

export function ImageContainerExplications({ children }: any) {
  return (
    <>
      <section className="container-textareas flex-row h-full">
        <div className="border-back-explication"></div>
        <div className="back-explication"></div>
        <div className="card h-64">
          <div className="front-explication w-full ">
            <div className="front-all ">
              <div className="explication-content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
