import { load } from "../../handlers/storage/index.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/profiles/';
const type = '/media'
const method = 'PUT';

/**
 * 
 * @param {{ banner: URL, avatar: URL  }} postData 
 * @returns Updates {avatar} and {banner} object key values to the server.
 * @promise 
 */

export async function updateMedia(postData) {
  const { name } = load('profile');
  
  if (!name) {
    throw new Error('Update requires a name');
  }

  const updateMediaURL = `${API_SOCIAL_URL}${action}${name}${type}`;

  const result = await authFetch(updateMediaURL, {
    method,
    body: JSON.stringify(postData),
  })

  return result;
}