This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## More about the project

This project uses:
  - Tailwind
  - AWS S3

Current production deployemnt is done with Vercel.


## TO-DO
Automate Syncing with Google Photos API and a Script
0- (ACTUAL) Clean initial sync gallery photos script
1- Use Your Google Account: Set up OAuth 2.0 credentials in Google Cloud Console for your account.
2- Write a Script: Write a script (Node.js, Python, etc.) that uses the Google Photos API to access your photos.
3- Automate Sync: Run this script periodically (using cron jobs or similar) to download new photos and upload them to your server/cloud storage.
4- Integration in Next.js: Fetch and display these photos from your server/cloud storage in your Next.js app.


To display your Google Photos albums to any user without requiring them to authenticate, you can use a server-side approach where the authentication is handled on the server using your own credentials. This way, your server acts as an intermediary between Google Photos and the end-users. Here are the steps to achieve this:

Step 1: Server-side Setup
Set Up a Server: You need a backend server for your web application. This server will handle the authentication with Google Photos using your Google account and fetch the photos.

Use a Service Account or OAuth Client: For Google Photos, using a Service Account is not directly supported, so you'll need to use an OAuth 2.0 client. You can authenticate once and store the refresh token securely on your server.

Enable Google Photos API: In your Google Cloud Console, enable the Google Photos API and get the necessary credentials (client ID and client secret) for your OAuth client.

Step 2: Authentication
Authenticate Using OAuth 2.0: Use your Google account to authenticate the request. You’ll need to do this once manually to obtain the refresh token.

Store Refresh Token Securely: Save the refresh token on your server. Your server will use this token to access your Google Photos account.

Step 3: Fetch and Serve Photos
Fetch Photos Using Google Photos API: Your server will use the Google Photos API to fetch the photos from your album.

Serve Photos to Users: Expose an endpoint from your server that sends these photos to your frontend application, which can then display them to users.

Step 4: Frontend Display
Create a Gallery View: On your website, implement a gallery view where you can display the photos.

Fetch Photos from Your Server: Make requests from your frontend to your backend to get the photos and display them in the gallery.

Important Considerations
Privacy and Security: Ensure you are not sharing private or sensitive photos unintentionally. Your server has full access to your Google Photos account.
Rate Limits and Quotas: Be aware of the rate limits and quotas imposed by the Google Photos API.
Caching for Performance: To improve performance and reduce API calls, consider caching the photos on your server.
Legal and Policy Compliance: Make sure your implementation complies with Google's API terms of service, especially regarding user data and authentication.
Final Note
This approach requires a good understanding of server-side programming, OAuth 2.0 authentication, and working with APIs. It's more complex than client-side authentication but allows you to share your photos without requiring users to log in.