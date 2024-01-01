import { createClient } from "redis";

let redisClient: any;

async function createRedisClient() {
  const redisPassword = process.env.NEXT_PUBLIC_REDIS_PASSWORD;
  const redisSocketHost = process.env.NEXT_PUBLIC_REDIS_SOCKET_HOST;
  const redisSocketPort = process.env.NEXT_PUBLIC_REDIS_SOCKET_PORT;

  const client = createClient({
    password: redisPassword,
    socket: {
      host: redisSocketHost,
      port: Number(redisSocketPort)
    },
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  console.log('[NAVA] Redis connected!');
  await client.connect();
  return client;
}

export async function getRedisClient() {
  if (!redisClient) {
    redisClient = await createRedisClient();
  }
  return redisClient;
}

export default getRedisClient;
