import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const method = 'DELETE';

export async function removePost(id) {
  if (!id) {
    throw new Error('Deletion requires a postID');
  }

  const deletePostURL = `${API_SOCIAL_URL}${action}${id}`;
  const response = await authFetch(deletePostURL, {
    method,
  })

  return await response.json();
}