import fs from 'fs';
import path from 'path';

class ConfigProvider {
  constructor() {
    this.config = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/config/local.json'), 'utf8'));
  }

  loadEnvVariables() {
    this.config.spotify.clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || this.config.spotify.clientId;
    this.config.spotify.clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || this.config.spotify.clientSecret;
    this.config.spotify.redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || this.config.spotify.redirectUri;
    
    this.config.google.clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || this.config.google.clientId;
    this.config.google.clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || this.config.google.clientSecret;
    this.config.google.redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || this.config.google.redirectUri;
    this.config.google.refreshToken = process.env.NEXT_PUBLIC_GOOGLE_REFRESH_TOKEN || this.config.google.refreshToken;
  }

  get(key) {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), this.config);
  }

  getConfig(){
    return this.config;
  }

  set(key, value) {
    const keys = key.split('.');
    keys.reduce((o, k, i) => {
      if (i === keys.length - 1) {
        o[k] = value;
        return o[k];
      }
      if (!o[k]) o[k] = {}; // If the property doesn't exist, create it as an empty object.
      return o[k];
    }, this.config);
  }
  
}

const provider = new ConfigProvider();

provider.loadEnvVariables();

export default provider;