import { commentOnPost } from "../api/posts/comment.mjs";

const form = document.querySelector('#commentForm');
/**
 * Handler for create comment listener
 */
export async function setCreateCommentListener() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const comment = Object.fromEntries(formData.entries());

    commentOnPost(comment);
    alert('Comment created successfully');
    location.reload();
  });
}