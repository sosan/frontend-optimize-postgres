import { DataJSON } from "worker/model";
import { Form, FormInstance, Input } from "antd";
import eventEmitter from "../Notification/eventEmitter";
import { useEffect } from "react";

interface ContainerProps {
  form: FormInstance
}
export const EVENT_NAME_CURRENTID = "currentid";

export function CurrentID(props: ContainerProps) {

  useEffect(() => {
    addEventListener();
  });

  function addEventListener() {
    if (!existEventListiner()) {
      eventEmitter?.on(EVENT_NAME_CURRENTID, handleNewNotification);
    }
  }

  function existEventListiner() {
    const eventNames = eventEmitter?.eventNames();
    return eventNames?.includes(EVENT_NAME_CURRENTID);
  }

  async function handleNewNotification(notification: DataJSON) {
    if (notification?.payload?.content === EVENT_NAME_CURRENTID) {
      props.form.setFieldValue(EVENT_NAME_CURRENTID, notification?.payload?.id as string);
    }
  }
  return (
    <>
      <Form.Item
        name={EVENT_NAME_CURRENTID}
        noStyle
        hidden={true}
        initialValue={""}
      >
        <Input />
      </Form.Item>
    </>
  );
}
