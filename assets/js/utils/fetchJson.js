/**
 * Small helper for loading JSON.
 * Works with relative paths safely via `new URL(path, import.meta.url)`.
 */
export async function fetchJson(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
