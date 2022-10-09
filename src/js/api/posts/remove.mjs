import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const method = 'DELETE';

/**
 * 
 * @param {number} id value from post
 * @returns response object from server.
 * @example 
 * ```js
 *  const postObj = {
 *    id: 335,
 *    body: 'something',
 *    title: 'something',
 * }
 *  const { id } = postObj;
 *  removePost(id);
 *  // Expect to delete post with ID 335
 * ```
 */


export async function removePost(id) {
  if (!id) {
    throw new Error('Deletion requires a postID');
  }

  const deletePostURL = `${API_SOCIAL_URL}${action}${id}`;
  const result = await authFetch(deletePostURL, {
    method,
  })

  return result;
}