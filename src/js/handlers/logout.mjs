import { remove } from "./storage/index.mjs";

const logoutButton = document.querySelector('#logout');
export function setLogoutEventListener() {
  logoutButton.addEventListener('click', (e) => {
    remove('token');
    remove('profile');
    return location.href = '/';
  });
}