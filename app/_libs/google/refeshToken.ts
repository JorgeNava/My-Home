import { google } from "googleapis";
import configProvider from "../../_libs/config-provider";

export async function refreshToken() {
  const clientId = await configProvider.get("google.clientId");
  const clientSecret = await configProvider.get("google.clientSecret");
  const redirectUri = await configProvider.get("google.redirectUri");
  const refreshToken = await configProvider.get("google.refreshToken");

  try {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );
  
    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });
  
    const { token } = await oauth2Client.getAccessToken();
  
    console.log('[NAVA] token', token);
  
    //configProvider.set('google.accessToken', token)
  } catch (error) {
    console.error("Error during token refresh:", error);
    throw error;
    
  }
}
