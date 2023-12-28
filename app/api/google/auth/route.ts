import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import configProvider from '../../../_libs/config-provider';

export async function GET() {
  const clientId = configProvider.get('google.clientId');
  const clientSecret = configProvider.get('google.clientSecret');
  const redirectUri = configProvider.get('google.redirectUri');
  
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  const scopes = ['https://www.googleapis.com/auth/photoslibrary.readonly'];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  const response = NextResponse;
  return response.redirect(new URL(url));
}
