import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const method = 'PUT';

/**
 * 
 * @param {{title: string, body: string, tags: string, media: URL, id: number }} postData The object is created from form.
 * @returns a response object from server. 
 * @example 
 * ```js
 *  // Passed in from form
 *  const myNewObj = {
 *    title: 'my title',
 *    body: 'my post',
 *    tags: 'my tag',
 *    media: 'url',
 *    id: 332,
 * }
 *  updatePost(myNewObj);
 *  // Expect to update post with ID 332 with new content
 * ```
 */
export async function updatePost(postData) {

  const { id } = postData;
  
  if (!id) {
    throw new Error('Update requires a postID');
  }
 
  const updatePostURL = `${API_SOCIAL_URL}${action}${id}`;

  const result = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  })

  return result;
}