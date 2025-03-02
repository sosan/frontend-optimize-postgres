import { useState } from "react";
import { TextAreas } from "../Textareas/indexTexareas.js";
import { Form, message } from 'antd';
import { Payload } from "worker/model.ts";
import { EmitEvent } from '../Notification/eventEmitter.js';
import "../../assets/css/textarea.css";
import { NotificationProvider } from "../Notification/indexNotification.js";
import { CurrentID } from "../Textareas/CurrentID.js";
import { Tryme } from "../Textareas/Tryme.js";
import { EVENT_NAME_RESULT, ResultState } from "../Cards/BackCard.js";
import { LOADING_RENDERING_RESULTS } from "../LoadingResults/indexLoadingResults.js";
import { EVENT_EDITOR_DDL, EVENT_EDITOR_DML } from "../Textareas/Editor.js";
const controller = new AbortController();
const signalController = controller.signal;

interface FieldType {
  ddlschema: string
  queries: string
  currentid: string
};


export function Playground() {

  let boucingAlert = false;
  let [isSubmitted, setIsSubmitted] = useState(false);
  let [isViewCardActiva, setViewCardActiva] = useState(false);
  let [isBackCard, setIsBackCard] = useState(false);
  let [messageApi, contextHolder] = message.useMessage({
    maxCount: 1
  });

  const [form] = Form.useForm();
  const URI = new URL(window.location.toString());
  URI.pathname = "/api/queries";
  // URI.pathname = "/checkws/helo";


  async function onFinish(values: FieldType) {
    // console.log('Success:', values);
    const isValid = showAlert(values);
    if (!isValid) return;
    console.log("send");
    // enviarlo tambien atraves de ws
    initializeAnimation();
    EmitEvent(EVENT_EDITOR_DDL, {});
    EmitEvent(EVENT_EDITOR_DML, {});

    const response = await fetch("/api/queries", {
      body: JSON.stringify(values),
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      mode: "cors",
      signal: signalController,
    });

    await finalizeAnimation();
    if (!response.ok) {
      return generateMsgError(values);
    }
    const data = await response.json() as Payload;
    if (!data || data.status !== 200) {
      return generateMsgError(values);
    }
    console.log("data" + JSON.stringify(data));
    const contentResult = JSON.parse(JSON.stringify(data.content)) as ResultState;
    EmitEvent(EVENT_NAME_RESULT, contentResult);
    EmitEvent(EVENT_EDITOR_DDL, contentResult);
    EmitEvent(EVENT_EDITOR_DML, contentResult);

    // setViewCardActiva(true); // cambiar a descomentar
    return;
  }

  function initializeAnimation() {
    const currentEvent: ResultState = {
      playLoading: true,
    };
    EmitEvent(EVENT_NAME_RESULT, currentEvent);
    EmitEvent(LOADING_RENDERING_RESULTS, {
      isRender: true,
      isPlaying: true,
    });
    setIsBackCard(!isBackCard);
    setIsSubmitted(true);
    rotateCard();
  }

  async function finalizeAnimation() {
    setViewCardActiva(true); // cambiar a comentar
    setIsSubmitted(false);
    EmitEvent(LOADING_RENDERING_RESULTS, {
      isRender: false,
      isPlaying: false,
    });
  }

  function rotateCard() {
    const stateCard = form.getFieldValue("card-trigger-rotate");
    if (stateCard) return;
    form.setFieldValue("card-trigger-rotate", !stateCard);
  }

  async function generateMsgError(values: FieldType) {
    // console.log("vass" + JSON.stringify(values));
    const currentEvent: ResultState = {
      badge: {
        textBadge: "Failed",
        colorBadge: "red",
      },
      status: 500,
      logID: values.currentid,
      playLoading: false,
    };
    EmitEvent(EVENT_NAME_RESULT, currentEvent);
    // EmitEvent(LOADING_RENDERING_RESULTS, false);
    // eventEmitter?.emit(EVENT_NAME_RESULT, currentEvent);
    return messageApi.error({
      type: 'error',
      content: "Not posible to send",
      className: 'message-error',
      duration: 1.5,
    });
  }

  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
    const { values } = errorInfo;
    showAlert(values);
  }


  function showAlert(values: any) {
    if (boucingAlert) {
      return;
    }

    boucingAlert = true;
    const { title, wrongData } = checkInfoValidation(values);

    if (wrongData) {
      messageApi.error({
        type: 'error',
        content: `${title}`,
        className: 'message-error',
        duration: 1.5,
      });
      setTimeout(() => {
        boucingAlert = false;
      }, 2000);
      return false
    }

    return true
  }


  function checkInfoValidation(values: any) {
    let title = "";
    let wrongData = false;

    if (values.ddlschema === "" && values.queries === "") {
      title = "Empty info, info needs to be provided.";
      wrongData = true;
    }
    else {
      if (values.ddlschema === "") {
        title = "DDL schema needs to be provided.";
        wrongData = true;
      }

      // if (values.queries === "") {
      //   title = "DQL queries needs to be provided.";
      //   wrongData = true;
      // }
    }
    return { title, wrongData };
  }

  function onValuesChange(valuesChanged: any, allFields: any) {
    console.log("changedFields" + JSON.stringify(valuesChanged));
    console.log("allFields" + JSON.stringify(allFields));
    setIsBackCard(valuesChanged["card-trigger-rotate"]);
    // if (valuesChanged["card-trigger-rotate"] === true) {
    // }
  }
  return (
    <>
      <NotificationProvider>
        <Form
          name="send-queries"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          autoComplete="off"
          className="flex flex-col justify-center items-center gap-3 mb-6 relative"
        >
          {contextHolder}
          <TextAreas form={form} isSubmitted={isSubmitted} isViewCardActiva={isViewCardActiva} isBackCard={isBackCard} />
          <CurrentID form={form} />
          <Tryme class="self-end " />
        </Form>
      </NotificationProvider>
    </>
  );
}
