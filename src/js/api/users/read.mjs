import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { errorMessage } from "../../ux/errorMessage.mjs";

const action = '/profiles/';

/**
 * Simple fetch request to get profiles/users from the server
 * @returns an array of objects(users) from the server
 */
export async function getUsers() {
  const getUsersURL = `${API_SOCIAL_URL}${action}`;
  const response = await authFetch(getUsersURL);

  if (response.ok) {
    const users = await response.json();
    return users;
  } else {
    const container = document.querySelector('#usersContainer');
    return errorMessage('An error occured, try reloading', container);
  }
}