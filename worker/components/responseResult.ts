import { ColumnDataType, DataJSON } from "./model";
// import { Analysis, ResponseResults, CounterAnalytics } from "./model";
import { AllStatics, Analysis, ResponseResults, CounterAnalytics } from "../../web/models/models";

export async function generateResponseResult(msg: ResponseResults): Promise<DataJSON> {
  if (!msg) {
    const data: DataJSON = {
      status: 400,
      tz: new Date().toISOString(),
      logID: "",
    }
    return data;
  }
  // const value: ResponseResults = JSON.parse(msg?.value?.toString() as string);
  // if (!value
  //   || value.status !== "OK"
  //   || value.optimizationDDL?.status !== "OK"
  //   || value.optimizationDML?.status !== "OK") {
  //   const data: DataJSON = {
  //     status: 400,
  //     tz: new Date().toISOString(),
  //     logID: msg?.key?.toString(),
  //   }
  //   return data
  // }

  let dataSources: ColumnDataType[] = await setTablesAnalysis(
    msg.optimizationDDL?.data?.analysis as Analysis,
    msg.optimizationDML?.data?.analysis as Analysis
  );

  // console.log("generateResponseResult message=>" + JSON.stringify(msg));
  // console.log("dataSources=" + JSON.stringify(dataSources));
  const counterStats = await getOptimizationStatistics(msg.optimizationDDL?.data?.analysis?.statistics as AllStatics);
  const data: DataJSON = {
    status: 200,
    tz: new Date().toISOString(),
    columnDataSource: dataSources,
    logID: msg?.currentID?.toString(), // currentid or
    countStats: counterStats
  }
  return data
}

export async function generateDDLTable(dataOptimization: Analysis) {
  let data: ColumnDataType[] = [];
  for (let i = 0; i < dataOptimization.ddl.length; i++) {
    const currentData = dataOptimization.ddl[i];
    if (!currentData) continue;
    for (let j = 0; j < (currentData?.length as number); j++) {

      let currentTag = getTags(currentData[j]?.name as string, dataOptimization.config)
      let currentDescription: string = currentData[j]?.description || "TODO";
      if (currentDescription === "TODO") {
        currentDescription = currentData[j]?.name || "TODO";
      }
      let column: ColumnDataType = {
        key: `${j.toString()}-ddl`,
        name: currentData[j]?.name as string,
        position: `Position Line ${currentData[j]?.position.line} Column ${currentData[j]?.position.column}`,
        description: currentDescription as string,
        tags: [currentTag],
        kind: "ddl"
      };
      data.push(column);
    }
  }
  // console.log("data=>" + JSON.stringify(data))
  return data;

}


export async function generateDMLTable(dataOptimization: Analysis) {
  let data: ColumnDataType[] = [];
  for (let j = 0; j < (dataOptimization.dml.length as number); j++) {
    let currentTag = getTags(dataOptimization.dml[j]?.name as string, dataOptimization.config)
    let currentDescription: string = dataOptimization.dml[j]?.description || "TODO";
    if (currentDescription === "TODO") {
      currentDescription = dataOptimization.dml[j]?.name || "TODO";
    }
    let column: ColumnDataType = {
      key: `${j.toString()}-dml`,
      name: dataOptimization.dml[j]?.name as string,
      position: `Position Line ${dataOptimization.dml[j]?.position.line} Column ${dataOptimization.dml[j]?.position.column}`,
      description: currentDescription as string,
      tags: [currentTag],
      kind: "dml"
    };
    data.push(column);
  }
  // console.log("data DML=>" + JSON.stringify(data))
  return data;

}

// https://ant.design/components/table
export async function setTablesAnalysis(ddllysis: Analysis, dmllysis: Analysis): Promise<ColumnDataType[]> {
  const dataDDL = await generateDDLTable(ddllysis);
  const dataDML = await generateDMLTable(dmllysis);
  let data: ColumnDataType[] = [...dataDDL, ...dataDML];
  return data;
}

function getTags(tag: string, tags: Record<string, string>[]): string {
  for (let i = 0; i < tags.length; i++) {
    if (!tags[i]) continue;
    const current = tags[i] as Record<string, string>;
    for (let key in current) {
      if (key === tag) {
        return current[key] as string;
      }
    }
  }
  return "notice";

}

async function getOptimizationStatistics(statistics: AllStatics): Promise<CounterAnalytics> {
  let counterAnalisis: CounterAnalytics = {
    "architect": 0,
    "error": 0,
    "naming": 0,
    "performance": 0,
    "security": 0
  }

  counterAnalisis.architect = greaterThan0(statistics.common.kind.architect) + greaterThan0(statistics.ddl.kind.architect) + greaterThan0(statistics.dml.kind.architect);
  counterAnalisis.error = greaterThan0(statistics.common.kind.error) + greaterThan0(statistics.ddl.kind.error) + greaterThan0(statistics.dml.kind.error);
  counterAnalisis.naming = greaterThan0(statistics.common.kind.naming) + greaterThan0(statistics.ddl.kind.naming) + greaterThan0(statistics.dml.kind.naming);
  counterAnalisis.performance = greaterThan0(statistics.common.kind.performance) + greaterThan0(statistics.ddl.kind.performance) + greaterThan0(statistics.dml.kind.performance);
  counterAnalisis.security = greaterThan0(statistics.common.kind.security) + greaterThan0(statistics.ddl.kind.security) + greaterThan0(statistics.dml.kind.security);

  return counterAnalisis;
}

function greaterThan0(num: number){
  if (num > 0) {
    return 1
  }
  return 0;
}
