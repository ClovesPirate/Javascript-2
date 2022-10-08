import { load } from '../../handlers/storage/index.mjs';
import { API_SOCIAL_URL } from '../constants.mjs';
import { authFetch } from '../authFetch.mjs';

const action = '/profiles/';
const details = '?_posts=true&_following=true&_followers=true';

export async function getProfile() {
  const { name } = load('profile');

  const getProfileURL = `${API_SOCIAL_URL}${action}${name}${details}`;

  const result = await authFetch(getProfileURL);
  console.log(result);

  return result;
}