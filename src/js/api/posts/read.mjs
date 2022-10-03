import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const details = '?_author=true&_comments=true&_reactions=true'

export async function getPosts() {
  const getPostsURL = `${API_SOCIAL_URL}${action}${details}`;

  const response = await authFetch(getPostsURL);
  const result = await response.json();
  console.log(result);

  return result;
}

export async function getPost(id) {
  if (!id) {
    throw new Error('Requires an ID');
  }
  const getPostURL = `${API_SOCIAL_URL}${action}${id}/${details}`;

  const response = await authFetch(getPostURL);
  

  return await response.json();
}