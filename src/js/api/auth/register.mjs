import { API_SOCIAL_URL } from "../constants.mjs"

const action = '/auth/register';
const method = 'POST';

/**
 * Function for register request
 * @param {{name: string, email: string, password: string, avatar: string, banner: string}} profile Profile passed in from login form
 * @returns Returns response object from server.
 */

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
  alert(`Welcome ${profile.name}. Log in to use your account`)
  // location.href = "/index.html";
  return result;

  }
 catch(error) {
    console.log(error);
  }
}