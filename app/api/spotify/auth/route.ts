import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import querystring from 'querystring';

import configProvider from '../../../_libs/config-provider';

const generateRandomString = (length: number) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export async function GET() {
  const state = generateRandomString(16);
  // TODO: MOVE TO CONFIG
  const scope = "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-top-read user-read-recently-played user-library-read";
  const stateKey = 'spotify_auth_state';

  const clientId = configProvider.get('spotify.clientId');
  const redirectUri = configProvider.get('spotify.redirectUri');

  cookies().set(stateKey, state);

  const response = NextResponse;
  return response.redirect(new URL(
    // TODO: MOVE TO CONFIG
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
      })));
}
