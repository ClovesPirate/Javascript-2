import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/posts/';
const method = 'POST';

export async function createPost(postData) {
  const createPostURL = API_SOCIAL_URL + action;
  const headers = {
    method,
    body: JSON.stringify(postData),
  }

  const result = await authFetch(createPostURL, headers);
  return result;
}