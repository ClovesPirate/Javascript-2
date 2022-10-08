import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const method = 'POST';

export async function commentOnPost(postData) {
  const id = postData.id;
  const commentAction = '/comment';

  if (!postData.id) {
    throw new Error('Commenting requires requires a postID');
  }
 
  const updatePostURL = `${API_SOCIAL_URL}${action}${id}${commentAction}`;

  const result = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  })
  console.log(result);
  return result;
}