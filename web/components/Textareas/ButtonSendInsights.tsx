import { Form } from "antd";
import { useEffect, useState } from "react";

const defaultParts = {
  inCaseNotSended: "Get Database insights",
  inCaseSended: "Send info"
}

const mobileParts = {
  inCaseNotSended: "Get insights!",
  inCaseSended: "Send"
}

interface ContainerProps {
  submitted: boolean;
  view: boolean;
}


export function ButtonSendInfo( props: ContainerProps ) {
  let [textParts, setTextParts] = useState({
    inCaseNotSended: defaultParts.inCaseNotSended,
    inCaseSended: defaultParts.inCaseSended
  });

  const getPosition = () => {
    if (window.screen.width <= 640) {
      setTextParts(mobileParts);
    }
    if (window.screen.width > 640) {
      setTextParts(defaultParts);
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getPosition);
  }, []);

  return(
    <>
      <Form.Item noStyle>
        <button className={` ${props.view ? "lesswidth" : "" }  relative button-send btn btn-header select-none  flex flex-row justify-center items-center` } type="submit" disabled={props.submitted}>
          <b className={`uppercase text-xl  font-bolder z-10 ${(props.view ? "" : "flickering") } `}>{(props.view) ? textParts.inCaseSended : textParts.inCaseNotSended }</b>
        </button>
      </Form.Item>
    </>
  );
}
