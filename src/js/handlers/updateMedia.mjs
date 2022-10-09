import { updateMedia } from '../api/profile/index.mjs';

const form = document.querySelector('#updateMediaForm');

export function setUpdateMediaFormListener() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const media = Object.fromEntries(formData.entries());


    // === Need some help with setting up logic for setting values for banner and avatar, as I cant pass in an empty string.
    // Returns 400 bad request.
    // const { banner, avatar } = media;

    // if (banner === '') {
    //   banner = 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMDktYWV3LTAwNi1sLmpwZw.jpg';
    // } else if (avatar === '') {
    //   avatar = 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTExXzMuanBn.jpg';
    // }

    updateMedia(media);
    alert('Media has been successfuly updated');
    location.reload();
  });
}