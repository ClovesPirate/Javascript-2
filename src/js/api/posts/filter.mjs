import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const details = '?_author=true&_comments=true&_reactions=true&'
const filterDesc = '_sort=title&sortOrder=desc';
const filterAsc = '_sort=title&sortOrder=asc';

export async function getFilteredPostsAscending() {
  const getPostsURL = `${API_SOCIAL_URL}${action}${details}${filterAsc}`;

  const result = await authFetch(getPostsURL);

  return result;
}

export async function getFilteredPostsDescending() {
  const getPostsURL = `${API_SOCIAL_URL}${action}${details}${filterDesc}`;

  const result = await authFetch(getPostsURL);

  return result;
}