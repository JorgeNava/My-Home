import fs from 'fs';
import path from 'path';
import { getRedisClient } from "../redis-client";

class ConfigProvider {
  constructor() {
    this.redisKey = 'config';
    //this.loadEnvVariables();
  }

  async loadEnvVariables() {
    let config = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/config/local.json'), 'utf8'));

    config.spotify.clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || config.spotify.clientId;
    config.spotify.clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || config.spotify.clientSecret;
    config.spotify.redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || config.spotify.redirectUri;
    
    config.google.clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || config.google.clientId;
    config.google.clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || config.google.clientSecret;
    config.google.redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || config.google.redirectUri;
    config.google.refreshToken = process.env.NEXT_PUBLIC_GOOGLE_REFRESH_TOKEN || config.google.refreshToken;
    
    config.redis.password = process.env.NEXT_PUBLIC_REDIS_PASSWORD || config.redis.password;
    config.redis.socketHost = process.env.NEXT_PUBLIC_REDIS_SOCKET_HOST || config.redis.socketHost;
    config.redis.socketPort = process.env.NEXT_PUBLIC_REDIS_SOCKET_PORT || config.redis.socketPort;

    await this.saveConfigToRedis(config);
  }

  async getConfig(){
    try {
      const redisClient = await getRedisClient();
      const configString = await redisClient.get(this.redisKey);
      return JSON.parse(configString);
    } catch (error) {
      console.error('Error retrieving config from Redis:', error);
      return null;
    }
  }

  async saveConfigToRedis(config) {
    try {
      const redisClient = await getRedisClient();
      await redisClient.set(this.redisKey, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving config to Redis:', error);
    }
  }

  async get(key) {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), await this.getConfig());
  }

  async set(key, value) {
    let config = await this.getConfig();
    const keys = key.split('.');
    keys.reduce((o, k, i) => {
      if (i === keys.length - 1) {
        o[k] = value;
        return o[k];
      }
      if (!o[k]) o[k] = {}; // If the property doesn't exist, create it as an empty object.
      return o[k];
    }, config);
    await this.saveConfigToRedis(config);
  }
}

const provider = new ConfigProvider();

export default provider;