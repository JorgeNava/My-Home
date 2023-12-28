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
