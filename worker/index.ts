import { Hono } from 'hono';

// import { etag } from 'hono/etag';
import { logger } from 'hono/logger';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';
// import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import {  sendAssets, healthcheck, checkWS, handleWebsocket, queries } from './components/router';
import { Context } from 'hono';
// import { wakeup } from './worker/commandBus.ts';

type Bindings = {
  BACKEND: Fetcher
  // ASSETS: Fetcher
    // MY_NAME: string
    // MY_KV: KVNamespace
};

const app = new Hono<{ Bindings: Bindings }>();
// const app = new Hono();
// app.use('/etag/*', etag())
app.use(
  // etag(),
  logger(),
  csrf({
    origin: ['http://localhost:4000', "http://localhost:8787"],
  }),
  secureHeaders(),
  // compress(),
  cors({
    origin: ["http://localhost:4000", 'http://localhost:8787/api/queries'],
  })

);
// Add X-Response-Time header
app.use('*', async (c: Context, next: any) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  c.header('X-Response-Time', `${ms}ms`)
})

// // // Error handling
app.onError((err: any, c: Context) => {
  console.error(`ERROR = ${err}`)
  return c.text('Wrong', 500)
})

app.notFound((c: Context) => {
  return c.text('WOOO!!', 404)
})

app.post("/checkws/helo", checkWS);
app.get("/sse", handleWebsocket)
app.get("/healthcheck", healthcheck);
app.post('/api/queries', queries);
app.get("/", sendAssets);

export default {
  fetch: app.fetch,
  // queue: async (_batch: any, _env: any) => { console.log("queue"); },
  // scheduled: async (_batch: any, _env: any) => { console.log("batch"); },
}

