import { DataJSON } from "./model";

export async function generatePayload(currentID: string, data: string): Promise<DataJSON> {
  // console.log("Generating Payload");
  let payload: DataJSON = {};
  if (!data) {
    payload = {
      error: "Unknown message received",
      tz: new Date().toISOString()
    };
    return payload;
  }
  const json = JSON.parse(data.toString()) as DataJSON;
  // console.log("json=" + JSON.stringify(json));
  if (!json) {
    payload = {
      error: "Unknown message received",
      tz: new Date().toISOString()
    };
    return payload;
  }

  switch (json.payload?.action) {
    case "initial":
      payload = {
        payload: {
          id: currentID,
          content: "currentid",
          action: "initial"
        },
        tz: new Date().toISOString(),
        status: 200
      };
      break;
    case "ping":
      payload = {
        payload: {
          action: "pong",
          id: currentID,
          content: ""
        },
        // tz: new Date().toISOString(),
        status: 200
      };
      break;
    case "result":
      payload = {
        payload: {
          action: "result",
          id: currentID,
          content: ""
        },
        // tz: new Date().toISOString(),
        status: 200
      };
      break;
      default:
      payload = {
        error: "Unknown message received",
        tz: new Date().toISOString(),
        status: 400
      };
      break;
  }
  // console.log("222 ---- payload ", JSON.stringify(payload));
  return payload;
}

export async function sendWebsocket(payload: DataJSON, server: WebSocket) {
  try {
    server.send(JSON.stringify(payload));
  } catch (error) {
    console.log("ERROR | error websocket" + error)
    new Response(JSON.stringify({
      error: "Unknown message received",
      tz: new Date().toISOString()
    }));
  }
}
