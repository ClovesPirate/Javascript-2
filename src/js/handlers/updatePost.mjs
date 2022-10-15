import { updatePost } from "../api/posts/update.mjs";

const form = document.querySelector('#updatePostForm');

/**
 * Handler for update post form listener
 */
export function setUpdatePostFormListener() {
  form.addEventListener('submit', (e) => {
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

    updatePost(post);
  });
}