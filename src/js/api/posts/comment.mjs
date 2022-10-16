import { createToast } from "../../ux/message.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const method = 'POST';

/**
 * Sends a fetch request to comment on post based on id.
 * @param {{ id: number }} postData uses id value from the post object.
 * @returns If successful creates a comment on the server associated with the post.
 */

export async function commentOnPost(postData) {
  const { id } = postData;
  const commentAction = '/comment';

  if (!id) {
    throw new Error('Commenting requires requires a postID');
  }
 
  const updatePostURL = `${API_SOCIAL_URL}${action}${id}${commentAction}`;

  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  })

  if (response.ok) {
    const comment = await response.json();
    createToast('Comment created successfully');
    window.setTimeout(function () {
      location.reload();
    }, 1500);
    return comment;
  } else {
    return createToast('An error occured');
  }
}