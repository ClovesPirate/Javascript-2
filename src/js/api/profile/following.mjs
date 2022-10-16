import { createToast } from "../../ux/message.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/profiles/';
const method = 'PUT';

/**
 * Function for a fetch request to stop following user
 * @param {string} name name of user
 * @returns Stop following {name}
 */

export async function stopFollowing(name) {
  const unfollow = '/unfollow';

  const unFollowProfileURL = `${API_SOCIAL_URL}${action}${name}${unfollow}`;
  const response = await authFetch(unFollowProfileURL, {
    method,
    body: JSON.stringify(""),
  });

 if (response.ok) {
  const result = await response.json();
  createToast(`You are no longer following ${name}`);
  window.setTimeout(function () {
    location.reload();
  }, 1500);
  return result
 } else {
  createToast('An error occured');
  throw new Error;
 }
}

/**
 * Function for a fetch request to start following user
 * @param {string} name name of user
 * @returns start following {name}
 */
export async function startFollowing(name) {
  const follow = '/follow';

  const followProfileURL = `${API_SOCIAL_URL}${action}${name}${follow}`;

  const response = await authFetch(followProfileURL, {
    method,
    body: JSON.stringify(""),
  });

  if (response.ok) {
    const result = await response.json();
    createToast(`You've added ${name} to your friends list`);
    window.setTimeout(function () {
      location.reload();
    }, 1500);
    return result;
  } else {
    createToast('An error occured');
    throw new Error;
  }
}