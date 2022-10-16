import { createToast } from "../../ux/message.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const method = 'POST';

/**
 * Function for creating a post
 * @param {{title: string, body: string, media: url, tags: string }} postData 
 * @returns {Object} response object 
 * @example
 * ```js
 * // Created from form
 *  const postObj = {
 *    title: 'my title',
 *    body: 'my post',
 *    tags: 'tag',
 *    media: 'url',
 * }
 *  createPost(postObj);
 * // expect {{title: 'my title, body: 'my post', tags: 'tag', media: 'url'}} created on the server.
 * ```
 */

export async function createPost(postData) {
  const createPostURL = API_SOCIAL_URL + action;
  const headers = {
    method,
    body: JSON.stringify(postData),
  }

  const response = await authFetch(createPostURL, headers);
  if (response.ok) {
    const post = await response.json();
    createToast('Post created successfully');
    window.setTimeout(function () {
      location.reload();
    }, 1500);
    return post;
  } else {
     return createToast('An error occured');
  }
}