# joker-ai

This is a Next.js app with OpenNext.js. Ready to be deployed to Cloudflare Workers.

## Getting Started

Read the scripts section in [`package.json`](./package.json).

## In addition

In order to get server actions working with the AI binding when I'm using `pnpm dev` or `pnpm preview:worker`, I was need to setup Cloudflare tunnel which points to my dev pc (ip:3000 - see the `dev:worker` script). Then setup the FQDN of the tunnel in the `wrangler.toml` file within the [dev] section.

## Cloudflare refs

- <https://opennext.js.org/cloudflare/get-started>
- <https://developers.cloudflare.com/workers/frameworks/framework-guides/nextjs>
- <https://developers.cloudflare.com/workers/runtime-apis/bindings/>
- <https://dash.cloudflare.com/4a7a2036848ac74fb634965693b22939/workers/services/view/joker-ai/production>
- <https://dash.cloudflare.com/4a7a2036848ac74fb634965693b22939/workers/kv/namespaces/6a845ba65ea34ecc8191ed43f77de123/metrics?time-window=1440>
