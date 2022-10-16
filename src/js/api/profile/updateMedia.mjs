import { load } from "../../handlers/storage/index.mjs";
import { createToast } from "../../ux/message.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/profiles/';
const type = '/media'
const method = 'PUT';

/**
 * Function for a fetch request to update media
 * @param {{ banner: URL, avatar: URL  }} postData object with two key/value pairs
 * @returns Updates {avatar} and {banner} object key/values on the server.
 */

export async function updateMedia(postData) {
  const { name } = load('profile');
  
  if (!name) {
    throw new Error('Update requires a name');
  }

  const updateMediaURL = `${API_SOCIAL_URL}${action}${name}${type}`;

  const response = await authFetch(updateMediaURL, {
    method,
    body: JSON.stringify(postData),
  })

  if (response.ok) {
    const result = await response.json();
    createToast('Profile media updated.');
    window.setTimeout(function () {
      location.reload();
    }, 1500);
    return result;
  } else {
    return createToast('An error occured');
  }
}