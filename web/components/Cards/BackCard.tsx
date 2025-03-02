import "../../assets/css/textarea.css";
import { Badge, Form, Input } from "antd";

import { addListenerForEvents } from "../Notification/eventEmitter";
import { useEffect, useState } from "react";
import { LoadingResults } from "../LoadingResults/indexLoadingResults";
import { ErrorCard } from "./ErrorCard";
import { FineCard } from "./FineCard";
import { ColumnDataType, CounterAnalytics } from "@/models/models";
import { SetStaticsTags } from "../Tags/indexTags";

export const EVENT_NAME_RESULT = "results";

interface StateBadge {
  textBadge: string
  colorBadge: string
}


export interface ResultState {
  badge?: StateBadge
  logID?: string
  playLoading?: boolean
  status?: number
  columnDataSource?: ColumnDataType[]
  tz?: string
  countStats?: CounterAnalytics
}


export function BackCard() {
  let [resultState, setResultState] = useState<ResultState>({
    badge: {
      textBadge: "Failed",
      colorBadge: "text-red-400",
    },
    status: 500,
    logID: "",
    playLoading: false,
  });


  useEffect(() => {
    addListenerForEvents([EVENT_NAME_RESULT], setComponentState)
  }, [])

  function setComponentState(resultData: ResultState) {
    if (resultData.logID === undefined || resultData.logID === "" || resultData.logID === "<Log ID anonymized>") {
      resultData.logID = "<Log ID anonymized>";
    }
    else {
      resultData.logID = `${resultData.logID.split("-")[0]}-${resultData.logID.split("-")[1]}`;
    }
    console.log(JSON.stringify(resultData));
    setResultState(resultData);
  }

  return (
    <>
      <Form.Item
        name="resultddldml"
        noStyle
        hidden={true}
        initialValue={""}
      >
        <Input />
      </Form.Item>
      <LoadingResults playLoading={resultState.playLoading as boolean} />
      {
        resultState.playLoading ? <></> :
          <div className={`back-card `} id="backcard">
            <div className="back-card-inner ">
              <div className="flex justify-start items-center  border-b border-gray-300 pb-2">
                <ListIcon className="text-gray-400" />
                <span className="ml-2 text-lg font-semibold">Build log {resultState.logID}</span>
                <Badge className="ml-5" count={resultState.badge?.textBadge} color={resultState.badge?.colorBadge} />
                <SetStaticsTags counterStats={resultState?.countStats} />
              </div>
              {
                resultState.status !== 200 ? <>
                  <ErrorCard messageError="Error" />
                </> : <>
                  <FineCard resultData={resultState} />
                </>
              }
            </div>
          </div>
      }
    </>
  );
}

function ListIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}
