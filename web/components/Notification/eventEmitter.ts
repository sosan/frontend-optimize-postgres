import { EventEmitter } from 'events';

let eventEmitter: undefined | EventEmitter  = undefined;
if (eventEmitter === undefined) {
  eventEmitter = new EventEmitter();
  eventEmitter.setMaxListeners(10);
}


export function addListenerForEvents(eventNames: string[], setComponentState: any) {
  for (let i = 0; i< eventNames.length; i++) {
    const eventName: string = eventNames[i] as string;
    if (!existEventListiner(eventName)) {
      console.log("add addListenerForEvents" + eventName);
      eventEmitter?.on(eventName, setComponentState);
    }
  }
}

function existEventListiner(eventName: string) {
  const eventNames = eventEmitter?.eventNames();
  return eventNames?.includes(eventName);
}

export function EmitEvent(eventName: string, notification: any) {
  eventEmitter?.emit(eventName, notification);
}

export default eventEmitter;
