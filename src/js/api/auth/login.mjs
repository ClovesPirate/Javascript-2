import { API_SOCIAL_URL } from "../constants.mjs"
import * as storage from "../../handlers/storage/index.mjs";
import { createToast } from "../../ux/message.mjs";

const action = '/auth/login';
const method = 'POST';

/**
 * Login fetch function
 * @param {{email: string, password: string}} profile Profile values passed in from loginform, accepting email and password as string parameters in the object.
 * @returns Logs in the user if parameters are verified with the server, and redirects to feed.
 */

export async function login(profile) {
  const loginURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);
  const options = {
    method: method,
    body: body,
    headers: {
      "Content-Type": "application/json;"
    },
  };

  try {
  const response = await fetch(loginURL, options);
  const { accessToken, ...profile } = await response.json();

  switch(response.status) {
    case 200:
      storage.save('token', accessToken);
      storage.save('profile', profile);
      location.replace('./../feed/');
      break;
    case 401:
      createToast('Invalid email and/or password');
      break;
    default: 
      throw new Error;
  }

  } catch(error) {
      createToast('An unknown error occured, try again later');
      console.log(error);
  }
}