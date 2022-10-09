import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const method = 'POST';

/**
 * Sends a fetch request to comment on post based on id.
 * @param {{ id: number }} postData uses id value from object
 * @returns result of fetch response.
 */

export async function commentOnPost(postData) {
  const { id } = postData;
  const commentAction = '/comment';

  if (!id) {
    throw new Error('Commenting requires requires a postID');
  }
 
  const updatePostURL = `${API_SOCIAL_URL}${action}${id}${commentAction}`;

  const result = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  })
  return result;
}