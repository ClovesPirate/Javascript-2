import { login } from "../api/auth/login.mjs";
/**
 * Handler for submitting loginform
 */
export function setloginFormListener() {
  const form = document.querySelector('#loginForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const form = e.target;
    console.log(form);
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    login(profile);
  });
}