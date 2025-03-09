export interface Queries {
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



// interface KindStatistics {
//   architect: number;
//   error: number;
//   naming: number;
//   performance: number;
//   security: number;
// }

export interface Statistics {
  kind: KindStatistics;
  total: number;
}

export interface AllStatics {
  ddl: Statistics;
  dml: Statistics;
  common: Statistics;
}

export interface Analysis {
  ddl: DDLItem[][];
  dml: DMLItem[];
  config: ConfigItem[];
  statistics: AllStatics;
}


export interface CounterAnalytics {
  architect: number;
  error: number;
  naming: number;
  performance: number;
  security: number;
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

interface DMLItem {
  name: string;
description: string;
location: number;
position: Position;
relation?: Relation;
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

export interface KindStatistics {
  architect: number;
  error: number;
  naming: number;
  performance: number;
  security: number;
}

// interface Statistics {
//   kind: KindStatistics;
//   total: number;
// }



interface Share {
  token: string;
}



export interface ColumnDataType {
  key: string
  name: string
  position: string
  description: string
  tags: string[]
  kind?: string
}
