import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const details = '?_author=true&_comments=true&_reactions=true'

export async function getPosts() {
  const getPostsURL = `${API_SOCIAL_URL}${action}${details}`;
  const result = await authFetch(getPostsURL);

  return result;
}

export async function getPost(id) {
  const getPostURL = `${API_SOCIAL_URL}${action}${id}${details}`
  const result = await authFetch(getPostURL);

  return result;
}