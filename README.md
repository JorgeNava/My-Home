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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


TO-DO:
Fix error: "⨯ TypeError [ERR_INVALID_URL]: Invalid URL
    at new NodeError (node:internal/errors:405:5)
    at new URL (node:internal/url:611:13)
    at GET (/var/task/.next/server/app/api/spotify/getAccessToken/route.js:1:1104)
    at /var/task/node_modules/next/dist/compiled/next-server/app-route.runtime.prod.js:14:39754
    at /var/task/node_modules/next/dist/server/lib/trace/tracer.js:117:36
    at NoopContextManager.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7057)
    at ContextAPI.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:516)
    at NoopTracer.startActiveSpan (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18086)
    at ProxyTracer.startActiveSpan (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18847)
    at /var/task/node_modules/next/dist/server/lib/trace/tracer.js:106:107 {
  input: '/#error=state_mismatch',
  code: 'ERR_INVALID_URL'"

Add to configs error page