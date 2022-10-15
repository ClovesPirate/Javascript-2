import { createPost } from "../api/posts/create.mjs";

const form = document.querySelector('#createPostForm');


/**
 * Handler for create post listenere
 */
export function setCreatePostFormListener() {
  form.addEventListener('submit', (e) => {
    if (form) {
      e.preventDefault();
  
      const form = e.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());
      

      if (!post.tags) {
        delete post.tags;
      }

      if (!post.media) {
        delete post.media;
      }
  
      createPost(post);
    }
  });
}