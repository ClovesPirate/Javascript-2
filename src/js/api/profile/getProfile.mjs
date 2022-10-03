import { load } from '../../handlers/storage/index.mjs';
import { API_SOCIAL_URL } from '../constants.mjs';
import { authFetch } from '../authFetch.mjs';

const action = '/profiles/';
const profile = load('profile');
const username = profile.name;
const details = '?_posts=true&_following=true&_followers=true';

export async function getProfile() {

  const getPostURL = `${API_SOCIAL_URL}${action}${username}${details}`;

  const response = await authFetch(getPostURL);
  

  return await response.json();
}