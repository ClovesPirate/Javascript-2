import { API_SOCIAL_URL } from "../constants.mjs"
import * as storage from "../../handlers/storage/index.mjs";

const action = '/auth/login';
const method = 'POST';

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

  storage.save('token', accessToken);
  storage.save('profile', profile);

  }
  catch(error) {
    console.log(error);
  }
}