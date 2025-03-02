import { Redis } from "@upstash/redis/cloudflare";
import { Context } from "hono";
import {  HRedisModel, Queries } from "./model";

export async function saveDatabase(c: Context, content: Queries) {
  // console.log("saveDatabase");
  const redis = Redis.fromEnv(c.env);

  if (redis === undefined || redis === null) {
    console.log("redis undefined");
    return true;
  }

  // Cannot move to separate process
  const kv: HRedisModel = await generateDBContent(content);
  const res = await redis.hsetnx("post_quereisss", kv.keyField, kv.content);
  console.log("saveDatabase response=" + res);
  return res !== 1
}

async function generateDBContent(content: Queries) {
  const fieldKey = content.currentid + "-" +  new Date().toISOString();
  let kv: HRedisModel = {
    keyField: fieldKey,
    content: {
      "ddlschema": content.ddlschema,
      "queries": content.queries,
    },
  };
  return kv;
}

