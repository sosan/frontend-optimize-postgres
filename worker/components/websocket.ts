import { DataJSON } from "./model";
import { EventEmitter } from "events";
import { serverSSE } from "./router";

const eventEmitter = new EventEmitter();
export async function getEventEmitter() {
  return eventEmitter;
}

// const webSocketPair = new WebSocketPair();
// const clientServer = Object.values(webSocketPair);

// let serverWebsocket: WebSocket | undefined = undefined;
// let client: WebSocket | undefined = undefined;



export async function websocketSessionHandler(currentID: string) {
  const [client, serverWebsocket] = Object.values(new WebSocketPair())

  // @ts-ignore
  serverWebsocket.accept();

  // @ts-ignore
  serverWebsocket.addEventListener('message', async (event) => {
    // console.log("evento webscoekt=" + JSON.stringify(event.data));
    await serverSSE(serverWebsocket as WebSocket, currentID, event.data);
  });
  // @ts-ignore
  serverWebsocket.addEventListener("close", (event) => {
    console.log("Close websocket" + JSON.stringify(event));
  })

  // eventEmitter.addListener("sendmessage", async (payload: DataJSON) => {
  //   console.log("3 - sendMessageTroughtWS serverSocket: ");

  //   if (!serverWebsocket) {
  //     console.log("Server Websocket is " + JSON.stringify(serverWebsocket));
  //   }
  //   serverWebsocket?.send(JSON.stringify(payload));
  // });



  return client;

}

export async function sendMessageTroughtWS(payload: DataJSON){
  console.log("1 - sendMessageTroughtWS ")
  if (!eventEmitter) {
    return console.log("eventemitter undefined");
  }
  console.log("2 - sendMessageTroughtWS emit")

  const emiited = eventEmitter.emit("sendmessage", payload);
  console.log("2a emited" + emiited);
}



// export async function getServerWebsocket() {
//   return serverWebsocket;
// }


export async function sendMessage(payload: DataJSON) {
  const eventEmitter = await getEventEmitter();
  console.log("sendMessage on clicked");
  console.log("eventemitter", JSON.stringify(eventEmitter) );
  const emitted = eventEmitter.emit("sendws", payload);
  console.log("emitted" + emitted + " listeneter=" + eventEmitter.listeners('sendws'));
}
