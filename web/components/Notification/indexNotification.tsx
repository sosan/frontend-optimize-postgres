import { DataJSON } from "worker/model";
import { useEffect, useState } from "react"
import eventEmitter from './eventEmitter';
import { addListenerForEvents } from "./eventEmitter";
import { EVENT_NAME_CURRENTID } from "../Textareas/CurrentID";

const EVENT_NAME_WEBSOCKET = "wsevent";

export function NotificationProvider({ children }: any) {

  const [ws, setWs] = useState<WebSocket | null>(null);
  const URI = new URL(window.location.toString());
  URI.protocol = location.protocol.replace("http", "ws");
  URI.pathname = "/sse";


  async function sendNotificationToCurrentID(notification: DataJSON) {
    eventEmitter?.emit(EVENT_NAME_CURRENTID, notification);
  };

  async function showResultRealtime() {
    const data: DataJSON = {

    }
    ws?.send(JSON.stringify(data));
  }


  useEffect(() => {
    addListenerForEvents([EVENT_NAME_WEBSOCKET], showResultRealtime);
    const websocket = new WebSocket(URI);
    setWs(websocket);
  }, [])

  // function addEventListener() {
  //   if (!existEventListiner()) {
  //     eventEmitter?.on(EVENT_NAME_WEBSOCKET, showResultRealtime);
  //   }
  // }

  // function existEventListiner() {
  //   const eventNames = eventEmitter?.eventNames();
  //   return eventNames?.includes(EVENT_NAME_WEBSOCKET);
  // }

  useEffect(() => {
    if (!ws) return;
    ws.onopen = async () => {
      console.log('Conexión WebSocket abierta ' + new Date().toISOString());
      ws.send(JSON.stringify({
        "payload": {
          "action": "initial"
        }
      }));
      // await sleep(1000);
      const pingInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ payload: { action: "ping" } }));
        } else {
          clearInterval(pingInterval);
        }
      }, 1000);

    };
    ws.onmessage = async (event) => {
      console.log(`Mensaje recibido: ${event.data}`);
      const newNotification: DataJSON = JSON.parse(event.data);
      if (!newNotification || !newNotification.payload) {
        return;
      }
      if (newNotification.payload.action === "initial") {
        await sendNotificationToCurrentID(newNotification);
      }
    };

    ws.onclose = () => {
      ws.close();
      console.log('Conexión WebSocket cerrada ' + new Date().toISOString());
    };

    ws.onerror = (error) => {
      console.log(`Error en la conexión WebSocket: ${JSON.stringify(error)}`);
    };

  }, [ws]);

  return (
    <>
      {children}
    </>
  );
}
