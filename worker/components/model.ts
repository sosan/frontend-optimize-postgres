// import { Message } from "@upstash/kafka";
import { KafkaJS } from "@confluentinc/kafka-javascript";
// import { RecordMetadata } from "@confluentinc/kafka-javascript/types/kafkajs";

// export interface Env {
//   KAFKA_SERVERS: string;
//   KAFKA_PROTOCOL: string;
//   KAFKA_MECHANISMS: string;
//   KAFKA_USERNAME: string;
//   KAFKA_PASSWORD: string;
//   KAFKA_TIMEOUT_MS: string;
//   KAFKA_CLIENTID: string;
// }

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

export interface Queries {
  cardTriggerRotate?: boolean;
  // ddlschema?: string;
  // queries?: string;
  // currentid?: string;
  resultddldml?: string;
  ddlschema: string
  queries: string
  currentid: string
}

export enum statusErrors {
  "OK" = "OK",
  "ERROR" = "ERROR"
}

interface DataOptimization {
  code: number,
  message: string,
  details: ProjectDetails,
  ddl: Ddl;
  dml: Dml;
  project: Project;
  // users: Users;
  analysis?: Analysis;
  share?: Share;
}

export interface ListProjects {
  data: DataOptimization[]
}

export interface Optimization {
  status: "OK" | "ERROR",
  data?: DataOptimization
}

export interface ResponseResults {
  status: "OK" | "ERROR"
  optimizationDDL?: Optimization
  optimizationDML?: Optimization
  idClient?: string
  error?: string
  currentID?: string
}


interface Ddl {
  date?: string;
  files?: number;
  issues?: number;
  uuid: string;
}

interface Dml {
  count?: number;
  uuid?: string;
}

interface ProjectDetails {
  project: Project
}

interface Project {
  date: string;
  db: string;
  name: string;
  uuid: string;
}

interface Position {
  line: number;
  column: number;
}

interface DMLItem {
  name: string;
  description: string;
  location: number;
  position: Position;
}

interface KindStatistics {
  architect: number;
  error: number;
  naming: number;
  performance: number;
  security: number;
}

interface Statistics {
  kind: KindStatistics;
  total: number;
}

export interface Analysis {
  ddl: DDLItem[][];
  dml: DMLItem[];
  config: ConfigItem[];
  statistics: {
    ddl: Statistics;
    dml: Statistics;
    common: Statistics;
  };
}

interface Share {
  token: string;
}


interface Position {
  line: number;
  column: number;
}

interface Relation {
  num: number;
}

interface DDLItem {
  name: string;
  description: string;
  location: number;
  position: Position;
  relation: Relation;
}

interface ConfigItem {
  [key: string]: string;
}

interface KindStatistics {
  architect: number;
  error: number;
  naming: number;
  performance: number;
  security: number;
}

interface Statistics {
  kind: KindStatistics;
  total: number;
}



interface Share {
  token: string;
}


