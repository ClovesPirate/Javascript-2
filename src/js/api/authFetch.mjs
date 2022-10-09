import { load } from "../handlers/storage/index.mjs"

export function headers() {
  const token = load('token');

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
};

/**
 * Fetch function with authorization using the accessToken
 * @param {string} url API endpoint
 * @param {{ ...options: object, headers: headers() }} options 
 */
export async function authFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: headers(),
  })
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`${response.status} ${response.statusText}`);
}