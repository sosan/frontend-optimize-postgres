import { Form, FormInstance } from "antd";
import "../../assets/css/textarea.css";
import { FrontCard } from './FrontCard';
import { BackCard } from './BackCard';

interface ContainerProps {
  formRef: FormInstance<any>;
  isBackCard: boolean;
}

export function CardGeneral(props: ContainerProps) {
  return (
    <>
      <div className="card">
        <Form.Item name="card-trigger-rotate" noStyle valuePropName="checked" initialValue={false}>
          <input type="checkbox" id="card-trigger-rotate" className="more" checked={false} />
        </Form.Item>
        <div className="content">
          <FrontCard formRef={props.formRef} isBackCard={props.isBackCard} />
          <BackCard />
        </div>
      </div>
    </>

  );
}
