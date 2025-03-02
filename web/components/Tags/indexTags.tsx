import { CounterAnalytics } from "@/models/models";
import { Tag } from "antd";


interface ContainerProps{
  counterStats: CounterAnalytics | undefined;
}

export function SetStaticsTags(props: ContainerProps) {
  return(
    <div className="tagsinline">
      {
        ((props?.counterStats?.architect) as number > 0) ? <>
          <Tag color="cyan">
            <i>Arquitect {props?.counterStats?.architect}</i>
          </Tag>
        </> : <></>
      }
      {
        ((props?.counterStats?.performance) as number > 0) ? <>
          <Tag color="yellow">
            <i>Performance {props?.counterStats?.performance}</i>
          </Tag>
        </> : <></>
      }
      {
        ((props?.counterStats?.security) as number > 0) ? <>
          <Tag color="pink">
            <i>Security {props?.counterStats?.security}</i>
          </Tag>
        </> : <></>
      }
      {
        ((props?.counterStats?.error) as number > 0) ? <>
          <Tag color="volcano">
            <i>Errors {props?.counterStats?.error}</i>
          </Tag>
        </> : <></>
      }
    </div>
  );
}
