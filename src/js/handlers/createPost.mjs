import { createPost } from "../api/posts/create.mjs";

const form = document.querySelector('#createPostForm');

export function setCreatePostFormListener() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());
    console.log(post);

    createPost(post);
    alert('Post created successfully.')
  });
}