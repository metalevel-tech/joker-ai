# Joker AI, Cloudflare Worker Boilerplate

This is a Next.js boilerplate app with OpenNext.js. Ready to be deployed to Cloudflare Workers. Below are the instructions to get it up and running. Also a little hack how to get Next.js server actions working with Cloudflare bindings in development mode.

## Setup and First Deploy

**1.** Clone/fork the repository.

**2.** Read the documentation provided at [Cloudflare Docs > Workers > Frameworks > Next.js](https://developers.cloudflare.com/workers/frameworks/framework-guides/nextjs) and [Open NEXT > Get Started](https://opennext.js.org/cloudflare/get-started).

**3.** Then read and edit [`wrangler.toml`](./wrangler.toml) and [`package.json`](./package.json) files. You may want to change at least the app/worker name, which currently is `joker-ai`.

Pay attention to scripts section in [`package.json`](./package.json).

**4.** Install wrangler and create KV namespaces for the project. Update `wrangler.toml` with the namespace IDs from the output of `wrangler kv:namespace create ..`. Also, you may create these namespaces from the Cloudflare's dashboard too and use their IDs in `wrangler.toml`.

```bash
pnpm i -g wrangler@latest
wrangler kv:namespace create NEXT_CACHE_WORKERS_KV_PREVIEW
wrangler kv:namespace create NEXT_CACHE_WORKERS_KV_PREVIEW --preview
```

Install the dependencies and publish/deploy your worker. Wrangler will do all the work for you, later you can review them from the Cloudflare's dashboard.

```bash
pnpm i
pnpm deploy:worker
```

Wrangler will ask you for authentication, then it will publish your worker to Cloudflare. You can authenticate via the browser or generate an API token and export it in your env, like `export CLOUDFLARE_API_TOKEN=05lc8a...`.

**5.** Create GitHub/GitLab repository if not present and publish your (cloned) source code there.

**6.** Open Cloudflare's dashboard find your worker and connect it to the GitHub/GitLab repository. Thus your worker will be built and deployed on push, depending on your settings.

## Development

To run your worker locally you can use `pnpm dev` or `pnpm preview:worker`.

## Cloudflare tunnel

I found, in order to get Next.js 'server actions' working with the AI binding, when I'm using **`pnpm dev`** or `pnpm preview:worker`, I was need to setup Cloudflare tunnel which points to my dev pc (ip:3000 - see the `dev:worker` script). Then setup the FQDN of the tunnel in the [`wrangler.toml`](./wrangler.toml) file within the [dev] section.

It's interesting and maybe side effect, but when you use a Cloudflare tunnel for local development, you can use `pnpm dev` and it have no problems to access the bindings.

You may need to run `pnpm preview:worker` frs in order to get the bindings working, and then you can run `pnpm dev` for local development..

## References

- <https://opennext.js.org/cloudflare/get-started>
- <https://developers.cloudflare.com/workers/frameworks/framework-guides/nextjs>
- <https://developers.cloudflare.com/workers/runtime-apis/bindings/>
- <https://dash.cloudflare.com/4a7a2036848ac74fb634965693b22939/workers/services/view/joker-ai/production>
- <https://dash.cloudflare.com/4a7a2036848ac74fb634965693b22939/workers/kv/namespaces/6a845ba65ea34ecc8191ed43f77de123/metrics?time-window=1440>
- <https://sdk.vercel.ai/providers/community-providers/cloudflare-workers-ai>
