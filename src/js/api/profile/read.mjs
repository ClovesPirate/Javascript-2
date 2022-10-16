import { load } from '../../handlers/storage/index.mjs';
import { API_SOCIAL_URL } from '../constants.mjs';
import { authFetch } from '../authFetch.mjs';
import { errorMessage } from '../../ux/errorMessage.mjs';

const action = '/profiles/';
const details = '?_posts=true&_following=true&_followers=true';

/**
 * Simple get request to get profile
 * @returns Returns profile with the name value stored in localstorage from login() function.
 */
export async function getProfile() {
  const { name } = load('profile');

  const getProfileURL = `${API_SOCIAL_URL}${action}${name}${details}`;

  const response = await authFetch(getProfileURL);
  
  if (response.ok) {
    const profile = await response.json();
    return profile;
  } else {
    const container = document.querySelector('#profileContainer');
    return errorMessage('An error occured, try reloading', container);
  }
}