import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = '/profiles/';

export async function getUsers() {
  const getUsersURL = `${API_SOCIAL_URL}${action}`;
  const result = await authFetch(getUsersURL);

  return result;
}