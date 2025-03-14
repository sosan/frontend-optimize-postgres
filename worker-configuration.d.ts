// Generated by Wrangler by running `wrangler types --env-interface CloudflareBindings`
import { Fetcher } from "@cloudflare/workers-types/experimental";

interface CloudflareBindings {
	UPSTASH_REDIS_REST_URL: string;
	UPSTASH_REDIS_REST_TOKEN: string;
	URL_BACKEND: string;
	KAFKA_USERNAME: string;
	KAFKA_PASSWORD: string;
	KAFKA_CLIENTID: string;
	KAFKA_CLUSTERID: string;
	KAFKA_REGION: string;
	ASSETS: Fetcher;
}
