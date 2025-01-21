/// <reference types="@cloudflare/workers-types" />

declare global {
  const NEXT_CACHE_WORKERS_KV: KVNamespace;
  const AI: {
    run: (
      model: string,
      options: { prompt: string }
    ) => Promise<{ text: string }>;
  };
}

export {};
