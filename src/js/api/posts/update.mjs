import { createToast } from "../../ux/message.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const method = 'PUT';

/**
 * 
 * @param {{title: string, body: string, tags: string, media: URL, id: number }} postData The object is created from form.
 * @returns updates the existing post with new values
 * @example 
 * ```js
 *  // Passed in from form
 *  const updatedObj = {
 *    title: 'my title',
 *    body: 'my post',
 *    tags: 'my tag',
 *    media: 'url',
 *    id: 332,
 * }
 *  updatePost(updatedObj);
 *  // Expect to update post with ID 332 with new content
 * ```
 */
export async function updatePost(postData) {

  const { id } = postData;
  
  if (!id) {
    throw new Error('Update requires a postID');
  }
 
  const updatePostURL = `${API_SOCIAL_URL}${action}${id}`;

  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  })

  if (response.ok) {
    const result = await response.json();
    createToast('Post was updated successfully.')
    window.setTimeout(function () {
      location.reload();
    }, 1500);
    return result;
  } else {
    return createToast('An error occured');
  }
}