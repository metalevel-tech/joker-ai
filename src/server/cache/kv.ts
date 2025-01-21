"use server";

export async function cacheGet() {
  if (typeof NEXT_CACHE_WORKERS_KV === "undefined") {
    return "NEXT_CACHE_WORKERS_KV is not available. Ensure you are running in the Cloudflare Worker runtime.";
  }

  try {
    // Retrieve a value from the KV store
    const value = await NEXT_CACHE_WORKERS_KV.get("my-key");

    return value;
  } catch (error) {
    console.error(error);
  }
}

export async function cacheSet() {
  if (typeof NEXT_CACHE_WORKERS_KV === "undefined") {
    return "NEXT_CACHE_WORKERS_KV is not available. Ensure you are running in the Cloudflare Worker runtime.";
  }

  try {
    const randomNumber = Math.floor(Math.random() * 20) + 1;

    await NEXT_CACHE_WORKERS_KV.put(
      `my-key-${randomNumber}`,
      JSON.stringify(`my-value-${randomNumber}`)
    );
  } catch (error) {
    console.error(error);
  }
}
