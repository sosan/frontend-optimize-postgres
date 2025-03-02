import { Context, Env } from "hono";
import { BlankInput, Next } from "hono/types";
// import { Message } from "@upstash/kafka";
import { DataJSON, Queries } from "./model";
import { sendBusMessage } from "./commandBus";
import { saveDatabase } from "./database";
// import { initalUser } from "./initalUser";
import { generatePayload, sendWebsocket } from "./websocketMessageReceived";
import { randomUUID } from "./initalUser";
import { websocketSessionHandler, sendMessageTroughtWS } from "./websocket";
import { responseFromBroker } from "./responseBus";
import { generateResponseResult } from "./responseResult";


export async function queries(c: Context, _next: Next) {
  const content: Queries = await c.req.json<Queries>();
  if (content === undefined || content === null || content.currentid === undefined || content.currentid === "") {
    return c.json({ error: "not content", status: 400 });
  }
  // let busServer = await setKafkaServer(c);
  // if (busServer === undefined) {
  //   return c.json({ error: "not content", status: 400 });
  // }

  let err = await sendBusMessage(c, content);
  if (err) {
    console.log("ERROR in sendbusmessage");
    return c.json({ error: "not content", status: 400 });
  }
  console.log(new Date().toISOString() + "SAVING DATABASE");
  err = await saveDatabase(c, content);
  if (err) {
    //TODO: dead letter
    return c.json({ error: "not content", status: 400 });
  }
  console.log(new Date().toISOString() + " WAITING for response from broker");
  // c.executionCtx.waitUntil(responseFromBroker(c, content.currentid));
  const resBroker = await responseFromBroker(c, content.currentid);
  if (!resBroker || !resBroker.found || !resBroker.message) {
    // TODO: Deadletter
    console.log("ERROR | Not found key in kafka messages");
    return c.json({ error: "Not found", status: 404 });
  }

  const resultPayload = await generateResponseResult(resBroker.message);
  // await sendMessageTroughtWS(resultPayload);
  // sendMessage(resultPayload);
  // console.log("mensaje encontrado= " + JSON.stringify(resBroker.message));
  return c.json({ error: "", status: 200, content: resultPayload });
}


export async function handleWebsocket(c: Context) {
  const upgradeHeader = c.req.header('Upgrade');
  if (upgradeHeader !== 'websocket') {
    return c.text('Expected websocket', 400);
  }
  const currentID = await randomUUID();
  let client = await websocketSessionHandler(currentID);
  // let data = await generatePayload(c.)
  // await sendMessageTroughtWS({ payload: { content: "content", action: "command" } })

  return new Response(null, {
    status: 101,
    webSocket: client,
  })
}

export async function serverSSE(ws: WebSocket, currentID: string, data: any) {
  console.log("serverSSE");
  const content = await generatePayload(currentID, data);
  await controlLoopEventsWS(ws, currentID, content);
}

export async function controlLoopEventsWS(ws: WebSocket, _currentID: string, content: DataJSON) {
  // console.log("content", JSON.stringify(content));
  await sendWebsocket(content, ws);

}

export async function sendAssets(c: Context<Env, "/", BlankInput>, _next: Next) {
  console.log("sendassets", c);
  // @ts-ignore 2339
  return c.env?.ASSETOS.fetch(c.req);
  // const assets = c?.env?.ASSETS as any;
  // return assets.fetch(c.req)
}

export async function healthcheck(c: Context) {
  return c.text("ok", 200);
}


export async function checkWS(c: Context) {
  const upgradeHeader = c.req.header('Upgrade');
  if (upgradeHeader !== 'websocket') {
    return c.text('Expected websocket', 400);
  }

  const data: DataJSON = {
    status: 200,
    tz: new Date().toISOString(),
    payload: {
      id: "",
      action: "result",
      content: JSON.stringify(
        {
          logID: "2hy7ddz5",
        }
      ),
      error: "",
      status: 200
    }
  }

  console.log("sendMessage on clicked");
  sendMessageTroughtWS(data);
  // const eventEmitter = await getEventEmitter();
  // console.log("eventemitter", JSON.stringify(eventEmitter));
  // const emitted = eventEmitter.emit("sendws", data);
  // console.log("emitted" + emitted + " listeneter=" + eventEmitter.listeners('sendws'));
  // let server = await getServerWebsocket();
  // server?.send(JSON.stringify(data));
  // await sendMessage(data)
  // await sleep(10000);
  // console.log("2 --- sendMessage on clicked");
  // return c.json({}, 200);
  return new Response(null, {
    status: 101,
    // webSocket: client,
  })
}

// async function sleep(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
