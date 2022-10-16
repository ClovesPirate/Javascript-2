import { remove } from "./storage/index.mjs";

/**
 * Handler for logout listener
 */
const logoutButton = document.querySelector('#logout');
export function setLogoutEventListener() {
  logoutButton.addEventListener('click', (e) => {
    remove('token');
    remove('profile');
    location.replace('/');
  });
}