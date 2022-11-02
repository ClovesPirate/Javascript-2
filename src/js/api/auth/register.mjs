import { createToast } from "../../ux/message.mjs";
import { API_SOCIAL_URL } from "../constants.mjs"
import { login } from "./login.mjs";

const action = '/auth/register';
const method = 'POST';

/**
 * Function for register user request to the application.
 * @param {{name: string, email: string, password: string/number, avatar: string, banner: string}} profile Values passed in from register form with keys {name, email, password, avatar(optional), banner(optional)}
 * @returns Creates a new user on the server.
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
  
  switch(response.status) {
    case 201: 
      login(profile);
      return result;
    case 400:
      createToast('Account already exists in database.');
      break;
    case 500:
      createToast('Email already registered in database.');
      break;
    default:
      throw new Error;
    }
  }

 catch(error) {
    createToast('Unknown error occured.');
    console.log(error);
  }
}