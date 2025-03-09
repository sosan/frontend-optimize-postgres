import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FormInstance } from "antd";
import { Editor } from "../Textareas/Editor";
import "../../assets/css/textarea.css";
// import deleteImage from "../../assets/png/delete.png";
import deleteImage from "../../assets/png/delete.png";
import React from "react";

const initialDDL = `-- Non-optimized DDL
CREATE TABLE users (
id          SERIAL PRIMARY KEY,
email       TEXT NOT NULL UNIQUE,
firstname   VARCHAR(100),
lastname    VARCHAR(100),
age         INTEGER,
city        VARCHAR(100),
country     VARCHAR(100),
date        TIMESTAMP NOT NULL DEFAULT NOW()
);
`;

const initialDQL = `-- Non-optimized DQL
SELECT * FROM users;`;

interface ContainerProps {
  formRef: FormInstance<any>;
  isBackCard: boolean;
}


export function FrontCard(props: ContainerProps) {

  return (
    <>
      <PanelGroup direction="horizontal" id={"fontcard"} className="front w-full ">
        <Panel defaultSize={30} minSize={23} className="front-left ">
          <div className="tabs schema-tab flex flex-row justify-start items-center w-full p-4 rounded-ss-[20px] bg-gray-50  focus:outline-none dark:bg-gray-700 font-bold text-lg">
            <a href="#" className='w-10 rotate-180'>
              <img src={deleteImage} loading="lazy" decoding="async" width={20} height={20} alt="clean" />
              <button className="group/copybtn absolute right-0 top-0 flex items-center gap-1 p-1 max-md:hidden text-white/30 hover:text-orange-400"><span className="text-xs group-hover/copybtn:opacity-100 opacity-0">Copy</span> <svg className="h-5 w-5 fill-green-300 hidden" xmlns="http://www.w3.org/2000/svg" width="76" height="76" fill="#000000" viewBox="0 0 256 256" data-darkreader-inline-fill="" ><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg> <svg className="h-5 w-5 fill-white/20 group-hover/copybtn:fill-orange-400 block" xmlns="http://www.w3.org/2000/svg" width="76" height="76" fill="#000000" viewBox="0 0 256 256" data-darkreader-inline-fill="" ><path d="M216,40V168H168V88H88V40Z" opacity="0.2"></path><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg></button>
            </a>
            <span className='text-center w-full'>DDL Schema</span>
          </div>
          <div id="fullWidthTabContent" className="fullWidthTabContent ">
            <div className="textarea-content textarea-content-left p-2   md:pt-2 md:pl-2">
              <Editor code={initialDDL} nameItem='ddlschema' formRef={props.formRef} />
            </div>
          </div>
        </Panel>
        {props.isBackCard ? <></> :
          <PanelResizeHandle className="resizable cursor-col-resize w-2 bg-black flex flex-col justify-center items-center "  >
            <div className="z-10  h-7 w-4 flex flex-col items-center justify-center rounded-sm border bg-border relative bg-white">
            </div>
          </PanelResizeHandle>
        }
        <Panel defaultSize={30} minSize={23} className="front-right">
          <div className="tabs queries-tab flex flex-row justify-end items-center w-full p-4 rounded-se-[20px] bg-gray-50  focus:outline-none dark:bg-gray-700 font-bold text-lg ">
            <a href="#" className='w-10 rotate-180'>
              <img className='' loading="lazy" decoding="async" src={deleteImage} width={20} height={20} alt="clean" />
            </a>
            <span className='text-center w-full '>DML Queries</span>
          </div>

          <div className="fullWidthTabContent ">
            <div className="textarea-content textarea-content-right p-2 md:pt-2 md:pl-2">
              <Editor code={initialDQL} nameItem='queries' formRef={props.formRef} />
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </>

  );
}
