import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import querystring from "querystring";
import configProvider from "../../../_libs/config-provider";

export async function GET(request: NextRequest) {
    // TODO: MOVE TO CONFIG
  const stateKey = "spotify_auth_state";
  
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state =  searchParams.get("state") ? searchParams.get("state") : "";
  const cookieStore = cookies();
  const storedState = cookieStore.get(stateKey)?.value;

  const clientId = configProvider.get("spotify.clientId");
  const clientSecret = configProvider.get("spotify.clientSecret");
  const redirectUri = configProvider.get("spotify.redirectUri");

  if (state === "" || state !== storedState) {
    // TODO: Redirect with error
    return NextResponse.redirect(new URL("/music/error", request.url));
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      body: querystring.stringify({
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      }
    };

    try {
      const authResponse = await fetch(authOptions.url, authOptions);

      if (authResponse?.ok) {
        const body = await authResponse.json();
        const spotifyCookieKey = 'spotify';
        const spotifyCookie = JSON.stringify({
          accesToken: body.access_token,
          expiresIn: body.expires_in,
          refreshToken: body.refresh_token
        });

        console.log('[NAVA] spotifyCookie', spotifyCookie);

        //cookies().set(spotifyCookieKey, spotifyCookie, { secure: true, httpOnly: true });

        return NextResponse.redirect(new URL("/music", request.url));
      } else {
        // TODO: Redirect with error
        return NextResponse.redirect(new URL("/music/error", request.url));
      }
    } catch (error) {
      console.error(error);
      // TODO: Redirect with error
      return NextResponse.json({ error: "Internal error occured", status: 500 });
    }
  }
}
