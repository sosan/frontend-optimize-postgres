import { CardGeneral } from "../Cards/indexCards.js";
import "../../assets/css/textarea.css";
import { ButtonSendInfo } from "./ButtonSendInsights.js";
import { FormInstance } from "antd";
import { ButtonViewBackCard } from "./ButtonViewBackCard.js";
import React from "react";


interface ContainerProps {
  form: FormInstance<any>;
  isSubmitted: boolean;
  isViewCardActiva: boolean;
  isBackCard: boolean;
}

export function TextAreas(props: ContainerProps) {
  return (
    <>
      <section className="container-textareas flex flex-row justify-center h-full ">
        <div className="border-back"></div>
        <div className="back"></div>
        <CardGeneral formRef={props.form} isBackCard={props.isBackCard} />
      </section>
      <section className="container-send-buttons relative  ">
        <ButtonSendInfo submitted={props.isSubmitted} view={props.isViewCardActiva} />
        <ButtonViewBackCard submitted={props.isSubmitted} view={props.isViewCardActiva} />
      </section>
    </>
  );
}
