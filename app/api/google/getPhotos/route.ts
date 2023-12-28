import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import configProvider from "../../../_libs/config-provider";

export async function GET(request: NextRequest) {
  const clientId = configProvider.get("google.clientId");
  const clientSecret = configProvider.get("google.clientSecret");
  const redirectUri = configProvider.get("google.redirectUri");

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code") || "";

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    configProvider.set('google.accessToken', tokens?.access_token);
    configProvider.set('google.refreshToken', tokens?.refresh_token);
    configProvider.set('google.expiryDate', tokens?.expiry_date);

    return NextResponse.redirect(new URL("/gallery", request.url)); // Redirect to a success page
  } catch (error) {
    console.error("Error during token exchange:", error);
    return NextResponse.redirect(new URL("/gallery/error", request.url)); // Redirect to an error page
  }
}
