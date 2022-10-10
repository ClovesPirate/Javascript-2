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

    // === Need some help with setting up logic for setting values for banner and avatar, as I cant pass in an empty string.
    // Returns 400 bad request.
    // =========
    
    // const { banner, avatar } = profile;

    // if (banner === '') {
    //   banner = 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMDktYWV3LTAwNi1sLmpwZw.jpg';
    // } else if (avatar === '') {
    //   avatar = 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTExXzMuanBn.jpg';
    // }

    register(profile);
  });
}