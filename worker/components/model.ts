// import { Message } from "@upstash/kafka";
import { KafkaJS } from "@confluentinc/kafka-javascript";
// import { RecordMetadata } from "@confluentinc/kafka-javascript/types/kafkajs";

export interface Env {
  KAFKA_SERVERS: string;
  KAFKA_PROTOCOL: string;
  KAFKA_MECHANISMS: string;
  KAFKA_USERNAME: string;
  KAFKA_PASSWORD: string;
  KAFKA_TIMEOUT_MS: string;
  KAFKA_CLIENTID: string;
}

export interface ResponseBroker {
  found: boolean
  message: KafkaJS.KafkaMessage | undefined
}

export interface ColumnDataType {
  key: string
  name: string
  position: string
  description: string
  tags: string[]
  kind: string
}

export interface Result {
  logID: string
  tz: string
  columnDataSource: ColumnDataType[]
}

export interface Payload {
  id?: string
  content: string
  error?: string
  status?: number
  action?: "initial" | "command" | "ping" | "pong" | "result"
}

export interface DataJSON {
  payload?: Payload
  error?: string
  tz?: string
  status?: number
  columnDataSource?: ColumnDataType[]
  logID?: string
  countStats?: CounterAnalytics
}

export interface CounterAnalytics {
  architect: number;
  error: number;
  naming: number;
  performance: number;
  security: number;
}


export interface Queries {
  ddlschema: string
  queries: string
  currentid: string
}

export interface HRedisModel {
  keyField: string
  content?: {
    [field: string]: any;
  }
}

