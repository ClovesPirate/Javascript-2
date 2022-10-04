import { getPosts } from "../api/posts/read.mjs";
import { renderPostTemplates } from "../templates/post.mjs";

export async function setGetPosts() {
  const entries = await getPosts();
  const container = document.querySelector('#feedContainer');
  renderPostTemplates(entries, container);
}