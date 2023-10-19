import { NextResponse } from 'next/server';
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
  const scope = "user-read-private user-read-email";

  const clientId = configProvider.get('spotify.clientId');
  const redirectUri = configProvider.get('spotify.redirectUri');

  console.log('[NAVA] clientId', clientId);
  console.log('[NAVA] redirectUri', redirectUri);

  return NextResponse.redirect(new URL(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
      }))
  );
}
