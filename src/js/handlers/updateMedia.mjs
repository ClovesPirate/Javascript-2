import { updateMedia } from '../api/profile/index.mjs';

const form = document.querySelector('#updateMediaForm');

/**
 * Handler for Updating media form listener
 */
export function setUpdateMediaFormListener() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const media = Object.fromEntries(formData.entries());

    if (!media.banner) {
      delete media.banner;
    }

    if (!media.avatar) {
      delete media.avatar;
    }

    updateMedia(media);
  });
}