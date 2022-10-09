import { login } from "../api/auth/login.mjs";

const form = document.querySelector('#loginForm');

export function setloginFormListener() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    console.log(profile);

    login(profile);

  });
}