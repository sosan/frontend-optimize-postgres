import { useMemo } from "react";
import rightChevron from "../../assets/png/right-chevron.png";
import React from "react";

export interface Expli {
  key: string;
  title: string;
  description: string;
}



interface ContainerProps {
  listExplications: Expli[]
}

export function TextExplication(props: ContainerProps) {
  const memoizedExplications = useMemo(() => props.listExplications, []);
  if (!memoizedExplications) return;

  return (
    <div>
      <div className="max-w-105">
        {memoizedExplications.map((element: Expli) => (
          <div key={element.key} className="relative flex group cursor-pointer mb-8">
            <img src={rightChevron} loading="lazy" alt="crosses" className="w-5 h-6.5 mr-3 md:mr-4 -mt-1" />
            <div>
              <h3 className="text-lg md:text-[1.5rem] font-bold mb-3 text-title-explication">{element.title}</h3>
              <p className="font-thin md:text-lg text-base max-w-[344px] text-description-explication">{element.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
