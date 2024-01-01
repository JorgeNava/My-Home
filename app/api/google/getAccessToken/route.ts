import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import configProvider from "../../../_libs/config-provider";

export async function GET(request: NextRequest) {
  const clientId = await configProvider.get("google.clientId");
  const clientSecret = await configProvider.get("google.clientSecret");
  const redirectUri = await configProvider.get("google.redirectUri");

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code") || "";

    const { tokens } = await oauth2Client.getToken(code);
    await oauth2Client.setCredentials(tokens);

    //console.log('[NAVA] tokens', tokens);

    await configProvider.set('google.accessToken', tokens?.access_token);
    await configProvider.set('google.refreshToken', tokens?.refresh_token);
    await configProvider.set('google.expiryDate', tokens?.expiry_date);

    return NextResponse.redirect(new URL("/gallery", request.url));
  } catch (error) {
    console.error("Error during token exchange:", error);
    return NextResponse.redirect(new URL("/gallery/error", request.url));
  }
}
