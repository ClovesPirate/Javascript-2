import { errorMessage } from "../../ux/errorMessage.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const details = '?_author=true&_comments=true&_reactions=true'

/**
 * Function for fetching posts
 * @returns An array of post objects from the server
 */
export async function getPosts() {
  const container = document.querySelector('#feedContainer');
  const getPostsURL = `${API_SOCIAL_URL}${action}${details}`;
  const response = await authFetch(getPostsURL);
  if (response.ok) {
    const posts = await response.json();
    return posts;
  } else {
    errorMessage('An error occured, try reloading', container);
  }
}


/**
 * Function for fetching a single post based on ID
 * @param {number} id 
 * @returns a single post object matching the ID of parameter.
 */
export async function getPost(id) {
  const getPostURL = `${API_SOCIAL_URL}${action}${id}${details}`
  const response = await authFetch(getPostURL);
  const post = await response.json()

  return post;
}