import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/profiles/';
const method = 'PUT';

export async function stopFollowing(name) {
  const unfollow = '/unfollow';

  const unFollowProfileURL = `${API_SOCIAL_URL}${action}${name}${unfollow}`;
  const result = await authFetch(unFollowProfileURL, {
    method,
    body: JSON.stringify(""),
  });

  return result
}

export async function startFollowing(name) {
  const follow = '/follow';

  const followProfileURL = `${API_SOCIAL_URL}${action}${name}${follow}`;

  const result = await authFetch(followProfileURL, {
    method,
    body: JSON.stringify(""),
  });

  return result;
}