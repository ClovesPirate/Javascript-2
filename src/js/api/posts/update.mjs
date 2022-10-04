import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const method = 'PUT';

export async function updatePost(postData) {
  if (!postData.id) {
    throw new Error('Update requires a postID');
  }
  const id = postData.id;
 
  const updatePostURL = `${API_SOCIAL_URL}${action}${id}`;

  const result = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  })

  return result;
}