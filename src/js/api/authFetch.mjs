import { load } from "../handlers/storage/index.mjs"

export function headers() {
  const token = load('token');

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
};

// export async function authFetch(url, options = {}) {
//   return fetch(url, {
//     ...options,
//     headers: headers(),
//   })
// }

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