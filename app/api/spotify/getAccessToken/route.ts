import { NextRequest, NextResponse } from "next/server";
import querystring from "querystring";
import configProvider from "../../../_libs/config-provider";

export async function GET(request: NextRequest) {
  const stateKey = "spotify_auth_state";

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state") ? searchParams.get("state") : "";
  const storedState = request.cookies.get(stateKey)
    ? request.cookies.get(stateKey)
    : "";

  const clientId = configProvider.get("spotify.clientId");
  const clientSecret = configProvider.get("spotify.clientSecret");
  const redirectUri = configProvider.get("spotify.redirectUri");

  console.log("[NAVA] searchParams", searchParams);
  console.log("[NAVA] code", code);
  console.log("[NAVA] state", state);
  console.log("[NAVA] clientId", clientId);
  console.log("[NAVA] clientSecret", clientSecret);
  console.log('[NAVA] storedState', storedState);
  console.log("[NAVA] redirectUri", redirectUri);

  if (state === "" || state !== storedState) {
    return NextResponse.redirect(
      new URL(
        "/#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      )
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      json: true,
    };

    console.log('[NAVA] authOptions', authOptions);

    try {
      const authResponse = await fetch(authOptions.url, {
        method: "POST",
        headers: authOptions.headers,
      });

      console.log('[NAVA] authResponse', authResponse);

      if (authResponse.ok) {
        const body = await authResponse.json();
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        const options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
        };

        console.log('[NAVA] options', options);

        const apiResponse = await fetch(options.url, {
          method: "GET",
          headers: options.headers,
        });

        const apiResponseBody = await apiResponse.json();
        console.log(apiResponseBody);

        // Redirect with tokens
        return NextResponse.redirect(
          "/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        // Redirect with error
        return NextResponse.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    } catch (error) {
      return NextResponse.json({ error: "Internal Server Error", status: 500 });
    }
  }
}
