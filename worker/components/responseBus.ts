// import { Context } from "hono";
// // import { setKafkaServer } from "./commandBus";
// import { ResponseBroker } from "../src/worker/model";
// // import { KafkaJS } from "@confluentinc/kafka-javascript";

// // const Kafka = KafkaJS.Kafka;

// // async function sleep(ms: number) {
// //   return new Promise(resolve => setTimeout(resolve, ms));
// // }

// export async function responseFromBroker(c: Context, userID: string): Promise<ResponseBroker> {
//   try {
//     console.log(new Date().toISOString() + " responseFromBroker...");
//     const messageBroker = await consumeMessages(c, userID);
//     return messageBroker;
//   } catch (error) {
//     console.log("Try catch ERROR | " + error);
//     let messageBroker: ResponseBroker = {
//       found: false,
//       message: undefined,
//     };
//     return messageBroker;
//   }
// }

// async function consumeMessages(c: Context, userID: string): Promise<ResponseBroker> {
//   // const busServer = await setKafkaServer(c);
//   // const consumer: KafkaJS.Consumer = busServer.consumer({
//   //   ...busServer.consumer,
//   //   "group.id": `group_1`,
//   //   "group.instance.id": "instance_1",
//   //   "enable.auto.commit": false,
//   // });

//   // await consumer.connect();
//   // await consumer.subscribe({ topics: ["resp_optimicepostgres"] });

//   let messageBroker: ResponseBroker = {
//     found: false,
//     message: undefined,
//   };

//   const consumePromise = new Promise<ResponseBroker>(async (resolve, reject) => {
//     consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         console.log(
//           `Consumed message from topic ${topic}, partition ${partition}: key = ${message?.key?.toString()}, value = ${message?.value?.toString()}`
//         );

//         if (message?.key?.toString() === userID) {
//           messageBroker.message = message;
//           messageBroker.found = true;

//           try {
//             await consumer.commitOffsets([
//               {
//                 topic,
//                 partition,
//                 offset: message.offset,
//               },
//             ]);
//             console.log(`Committed offset for topic ${topic}, partition ${partition}, offset ${message.offset}`);
//           } catch (commitError) {
//             console.error("Error committing offset:", commitError);
//             reject(commitError);
//             return;
//           }
//           resolve(messageBroker);
//           await consumer.stop();
//         }
//       },
//     });
//   });

//   const timeoutPromise = new Promise<ResponseBroker>((_, reject) => {
//     setTimeout(() => {
//       reject(new Error("Timeout: No se encontró el mensaje en el tiempo esperado"));
//     }, 25000); // 25 secs
//   });

//   try {
//     return await Promise.race([consumePromise, timeoutPromise]);
//   } catch (error) {
//     console.error("Error al consumir mensajes:", error);
//     return {
//       found: false,
//       message: undefined,
//     };
//   } finally {
//     await consumer.disconnect();
//   }
// }



import { Context } from "hono";
export interface ResponseConsumer {
  instance_id: string;
  base_uri: string;
}

const maxAttempts = 25;

export interface DataTopic {
    "key": string | null;
    "value": object;
    "partition": number;
    "offset": number;
    "topic": string;
}

export async function responseFromBroker(c: Context, userID: string): Promise<any> {
  try {
    console.log(new Date().toISOString() + " responseFromBroker...");

    // const kafkaApiKey = c.env.KAFKA_USERNAME;
    // const kafkaApiSecret = c.env.KAFKA_PASSWORD;
    // const clusterId = "lkc-35yjjm";
    // const region = "europe-southwest1";
    const consumerGroupId = "cg1";
    const consumerInstanceId = "ci1";
    const topic = "resp_optimicepostgres";
    const kafkaApiKey = c.env.KAFKA_USERNAME;
    const kafkaApiSecret = c.env.KAFKA_PASSWORD;
    const clusterId = c.env.KAFKA_CLUSTERID;
    const region = c.env.KAFKA_REGION;

    const authHeader = `Basic ${btoa(`${kafkaApiKey}:${kafkaApiSecret}`)}`;
    const baseUrl = `https://${clusterId}.${region}.gcp.confluent.cloud/kafka/v3/clusters/${clusterId}`;
    const createConsumerResponse = await fetch(`${baseUrl}/consumers/${consumerGroupId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.kafka.v2+json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        name: consumerInstanceId,
        format: "json",
        "auto.offset.reset": "earliest",
      }),
    });

    if (!createConsumerResponse.ok) {
      throw new Error("Failed to create Kafka consumer");
    }
    const consumerResponse: ResponseConsumer = await createConsumerResponse.json();
    const consumerBaseUrl = consumerResponse?.base_uri as string;

    console.log(`Consumer base URL: ${consumerBaseUrl}`);

    const subscribeResponse = await fetch(`${consumerBaseUrl}/subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.kafka.v2+json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        topics: [topic],
      }),
    });

    if (!subscribeResponse.ok) {
      throw new Error("Failed to subscribe to Kafka topic");
    }

    let messageBroker = {
      found: false,
      message: undefined,
    };

    const consumePromise = new Promise(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timeout: No se encontró el mensaje en el tiempo esperado"));
      }, 25000); // 25 segundos


      for (let i = 0; i < maxAttempts; i++) {
        const consumeResponse = await fetch(`${consumerBaseUrl}/records`, {
          method: "GET",
          headers: {
            Accept: "application/vnd.kafka.json.v2+json",
            Authorization: authHeader,
          },
        });

        if (!consumeResponse.ok) {
          clearTimeout(timeout);
          reject(new Error("Failed to consume Kafka records"));
          return;
        }

        const records: DataTopic[] = await consumeResponse.json();

        if (records.length === 0) {
          console.log("No records available. Retrying...");
          // attempts++;
          await new Promise((r) => setTimeout(r, 1000));
          continue;
        }

        for (const record of records) {
          console.log(
            `Consumed message from topic ${record.topic}, partition ${record.partition}: key = ${record.key}, value = ${JSON.stringify(record.value)}`
          );

          if (record.key === userID) {
            messageBroker.message = record.value as any;
            messageBroker.found = true;
            clearTimeout(timeout);
            resolve(messageBroker);
            return;
          }
        }

      }
      reject(new Error("Timeout: No se encontró el mensaje en el tiempo esperado"));
    });

    const result = await consumePromise;
    return result;
  } catch (error) {
    console.error("Try catch ERROR | " + error);
    return {
      found: false,
      message: undefined,
    };
  } finally {
    const consumerGroupId = "cg1";
    const consumerInstanceId = "ci1";
    const kafkaApiKey = c.env.KAFKA_USERNAME;
    const kafkaApiSecret = c.env.KAFKA_PASSWORD;
    const clusterId = c.env.KAFKA_CLUSTERID;
    const region = c.env.KAFKA_REGION;
    const authHeader = `Basic ${btoa(`${kafkaApiKey}:${kafkaApiSecret}`)}`;

    const consumerBaseUrl = `https://${clusterId}.${region}.gcp.confluent.cloud/kafka/v3/clusters/${clusterId}/consumers/${consumerGroupId}/instances/${consumerInstanceId}`;
    await fetch(consumerBaseUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/vnd.kafka.v2+json",
        Authorization: authHeader,
      },
    });
    console.log("Consumer closed successfully.");
  }
}
