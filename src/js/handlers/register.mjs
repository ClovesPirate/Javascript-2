import { register } from "../api/auth/register.mjs";

const form = document.querySelector('#registerForm');

/**
 * Handler for register form listener
 */
export function setRegisterFormListener() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    if (!profile.avatar) {
      delete profile.avatar;
    }

    if (!profile.banner) {
      delete profile.banner;
    }

    console.log(profile);

    register(profile);
  });
}