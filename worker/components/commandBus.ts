import { Context } from "hono";
// import { Queries } from "./model";
// import { hc } from "hono/client";
// import { RecordMetadata } from "@confluentinc/kafka-javascript/types/kafkajs";
// import { KafkaJS } from "@confluentinc/kafka-javascript";
// const Kafka = KafkaJS.Kafka;
// let busServer: InstanceType<typeof Kafka>;

// export async function setKafkaServer(c: Context) {
//   // console.log("busServer" + JSON.stringify(busServer));

//   if (busServer === null || busServer === undefined) {
//     busServer = new Kafka({
//       "client.id": c.env.KAFKA_CLIENTID,
//       "sasl.mechanism": c.env.KAFKA_PROTOCOL,
//       "sasl.username": c.env.KAFKA_USERNAME,
//       "sasl.password": c.env.KAFKA_PASSWORD,
//       "broker.address.family": c.env.KAFKA_SERVERS,
//       "api.version.request.timeout.ms": c.env.KAFKA_TIMEOUT_MS,
//       // brokers: c.env.KAFKA_SERVERS,
//       // sasl: {
//       //   mechanism: c.env.KAFKA_PROTOCOL,
//       //   username: c.env.KAFKA_USERNAME,
//       //   password: c.env.KAFKA_PASSWORD,
//       // } as SASLOptions,
//       // requestTimeout: c.env.KAFKA_TIMEOUT_MS,
//     });
//   }
//   return busServer;
// }

// export async function sendBusMessage(busServer: InstanceType<typeof Kafka>, message: Queries, c: Context): Promise<boolean> {

//   const producer = busServer.producer();
//   // console.log("producer spec=>" + JSON.stringify(producer));
//   await producer.connect();

//   const producedRecords = await producer.send({
//     topic: "post_optimicepostgres",
//     messages: [{ key: message.currentid, value: JSON.stringify(message) }],
//   });
//   await producer.disconnect();
//   console.log(new Date().toISOString() + "FROM FRONTEND----- Response producer message=>" + JSON.stringify(producedRecords));
//   if (!producedRecords) {
//     return true;
//   }
//   if (producedRecords.length > 1) {
//     return true;
//   }
//   const err = await wakeup(c, message.currentid, producedRecords[0] as RecordMetadata);
//   console.log( new Date().toISOString() + " SENDED WAKUP TO BACKEND----- reponse from wakeup" + JSON.stringify(err));

//   return false;
// }

// async function wakeup(c: Context, currentid: string, responseProducer: RecordMetadata /*ProduceResponse*/) {
//   console.log("FRONTEND | " + new Date().toISOString() + "wakeup " + c.env.URL_BACKEND);
//   const client = hc(`${c.env.URL_BACKEND}/wakeup/`, { fetch: c.env?.BACKEND.fetch.bind(c.env.BACKEND) })
//   // @ts-ignore
//   const res = await client?.$post({
//     json: {
//       currentid: currentid,
//       topic: responseProducer.topicName,
//       partition: responseProducer.partition,
//       offset: responseProducer.offset
//     }
//   });
//   let data = {status: 500};
//   if (res.ok) {
//     data = await res.json();
//   }
//   console.log(new Date().toISOString() + "From frontend ---- response wakeup " + JSON.stringify(data));
//   return data.status !== 200
// }

export interface ResponseSendMesssage {
  error_code: number;
  message: string;
  cluster_id: string;
  topic_name: string;
  partition_id: number;
  offset: number;
  timestamp: string;
  key: object;
  value: object;
}

export async function sendBusMessage(c: Context, message: any): Promise<boolean> {
  const kafkaApiKey = c.env.KAFKA_USERNAME;
  const kafkaApiSecret = c.env.KAFKA_PASSWORD;
  const clusterId = c.env.KAFKA_CLUSTERID;
  const region = c.env.KAFKA_REGION;
  const topic = "post_optimicepostgres";

  const authHeader = `Basic ${btoa(`${kafkaApiKey}:${kafkaApiSecret}`)}`;

  const kafkaResponse = await fetch(
    `https://${clusterId}.${region}.gcp.confluent.cloud/kafka/v3/clusters/${clusterId}/topics/${topic}/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        records: [
          {
            key: {
              type: "string",
              data: message.currentid as string,
            },
            value: {
              type: "JSON",
              data: JSON.stringify(message),
            },
          },
        ],
      }),
    }
  );

  if (!kafkaResponse.ok) {
    const errorBody = await kafkaResponse.text();
    console.error("Error sending message to Kafka:", errorBody);
    return false;
  }

  const producedRecords: ResponseSendMesssage = await kafkaResponse.json();
  console.log(
    new Date().toISOString() +
    " FROM FRONTEND ----- Response producer message=>" +
    JSON.stringify(producedRecords)
  );

  if (!producedRecords || producedRecords.error_code !== 200) {
    return false;
  }

  // const recordMetadata = producedRecords[0];
  const err = await wakeup(c, message.currentid, producedRecords);
  console.log(
    new Date().toISOString() +
    " SENDED WAKUP TO BACKEND ----- response from wakeup" +
    JSON.stringify(err)
  );

  return err.status !== 200;
}

async function wakeup(c: Context, currentid: string, responseProducer: ResponseSendMesssage) {
  console.log(
    "FRONTEND | " +
    new Date().toISOString() +
    " wakeup " +
    c.env.URL_BACKEND
  );

  const res = await fetch(`${c.env.URL_BACKEND}/wakeup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentid: currentid,
      topic: responseProducer.topic_name,
      partition: responseProducer.partition_id,
      offset: responseProducer.offset,
    }),
  });

  let data = { status: 500 };
  if (res.ok) {
    data = await res.json();
  }

  console.log(
    new Date().toISOString() +
    " From frontend ---- response wakeup " +
    JSON.stringify(data)
  );

  return data;
}

// export interface ResponseSendMesssage {
//   error_code: number;
//   message: string;
//   queue_name: string;
//   timestamp: string;
//   value: object;
// }

// export async function sendBusMessage(c: Context, message: any): Promise<boolean> {
//   const queueName = "post_optimicepostgres"; // Nombre de la cola en Cloudflare
//   const queue = c.env[queueName]; // Acceder a la cola desde el entorno

//   try {
//     // Enviar mensaje a la cola
//     const messageId = await queue.send({
//       currentid: message.currentid,
//       data: message,
//     });

//     console.log(
//       new Date().toISOString() +
//       " FROM FRONTEND ----- Message sent to Cloudflare Queue =>" +
//       JSON.stringify({ messageId })
//     );

//     // Simular una respuesta similar a Kafka
//     const responseProducer: ResponseSendMesssage = {
//       error_code: 200,
//       message: "Message sent successfully",
//       queue_name: queueName,
//       timestamp: new Date().toISOString(),
//       value: message,
//     };

//     // Llamar a la función wakeup
//     const err = await wakeup(c, message.currentid, responseProducer);
//     console.log(
//       new Date().toISOString() +
//       " SENDED WAKUP TO BACKEND ----- response from wakeup" +
//       JSON.stringify(err)
//     );

//     return err.status === 200;
//   } catch (error) {
//     console.error("Error sending message to Cloudflare Queue:", error);
//     return false;
//   }
// }

// async function wakeup(c: Context, currentid: string, responseProducer: ResponseSendMesssage) {
//   console.log(
//     "FRONTEND | " +
//     new Date().toISOString() +
//     " wakeup " +
//     c.env.URL_BACKEND
//   );

//   const res = await fetch(`${c.env.URL_BACKEND}/wakeup/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       currentid: currentid,
//       queue: responseProducer.queue_name,
//       timestamp: responseProducer.timestamp,
//     }),
//   });

//   let data = { status: 500 };
//   if (res.ok) {
//     data = await res.json();
//   }

//   console.log(
//     new Date().toISOString() +
//     " From frontend ---- response wakeup " +
//     JSON.stringify(data)
//   );

//   return data;
// }


