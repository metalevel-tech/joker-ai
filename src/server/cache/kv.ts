"use server";

export async function cacheGet() {
  try {
    // Retrieve a value from the KV store
    const value = await NEXT_CACHE_WORKERS_KV.get("my-key");

    return value;
  } catch (error) {
    console.error(error);
  }
}

export async function cacheSet() {
  try {
    const randomNumber = Math.floor(Math.random() * 20) + 1;

    // Retrieve a value from the KV store
    const value = await NEXT_CACHE_WORKERS_KV.put(
      `my-key-${randomNumber}`,
      JSON.stringify(`my-value-${randomNumber}`)
    );

    return value;
  } catch (error) {
    console.error(error);
  }
}
