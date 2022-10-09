import { updatePost } from "../api/posts/update.mjs";

const form = document.querySelector('#updatePostForm');

export function setUpdatePostFormListener() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());

    updatePost(post);
    alert('Post has been successfuly updated');
    location.reload;
  });
}