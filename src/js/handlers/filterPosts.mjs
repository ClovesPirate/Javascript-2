import { getFilteredPostsAscending, getFilteredPostsDescending } from "../api/posts/filter.mjs";
import { renderPostTemplates } from "../templates/post.mjs";

  const ascendingTarget = document.querySelector('#ascending');
  const descendingTarget = document.querySelector('#descending');

export async function setFilterPostListener() {
  ascendingTarget.addEventListener('click', handleFilterAscending);
  descendingTarget.addEventListener('click', handleFilterDescending)
}

export async function handleFilterAscending() {
  const filteredPosts = await getFilteredPostsAscending();
  console.log(filteredPosts)
  const container = document.querySelector('#feedContainer');
  container.innerHTML = "";
  
  return renderPostTemplates(filteredPosts, container);
}

export async function handleFilterDescending() {
  const filteredPosts = await getFilteredPostsDescending();
  console.log(filteredPosts);
  const container = document.querySelector('#feedContainer');
  container.innerHTML = "";

  return renderPostTemplates(filteredPosts, container);
}