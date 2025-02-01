"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function cacheGet(key: string) {
  try {
    const kv = (await getCloudflareContext()).env.NEXT_CACHE_WORKERS_KV;
    const value = await kv.get(key);
    return JSON.parse(value);
  } catch (error) {
    console.error(error);
  }
}

export async function cacheSet(key: string, value: string | object) {
  try {
    const kv = (await getCloudflareContext()).env.NEXT_CACHE_WORKERS_KV;
    await kv.put(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}
