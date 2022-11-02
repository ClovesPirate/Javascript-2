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

    // request object only accepts an array
    post.tags = [post.tags];

    // Remove tags from form object if left blank
    if (!post.tags) {
      delete post.tags;
    }
    // Remove media key from form object if left blank
    if (!post.media) {
      delete post.media;
    }

    updatePost(post);
  });
}