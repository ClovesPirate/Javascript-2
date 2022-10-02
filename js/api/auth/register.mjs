import { API_SOCIAL_URL } from "../constants.mjs"

const action = '/auth/register';
const method = 'POST';

export async function register(profile) {
  const registerURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);
  const options = {
    method: method,
    body: body,
    headers: {
      "Content-Type": "application/json;"
    },
  };

  try {
  const response = await fetch(registerURL, options);
  const result = await response.json();
  return result;
  }
  catch(error) {
    console.log(error);
  }
}