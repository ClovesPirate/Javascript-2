import { getPosts } from "../api/posts/read.mjs";
import { renderPostTemplates } from "../templates/post.mjs";

export async function setSearchPostsFormListener() {
  const searchControl = document.querySelector('#filterPosts');

  searchControl.addEventListener('keyup', handleNameControlInput);
}

/**
 * Handler for search functionality
 * @param {event} event 
 * @returns results with corresponding inputvalue
 * @example input: post - returns entries beginning with the title "post...", or author "post..."
 */
export async function handleNameControlInput(event) {
  const container = document.querySelector('#feedContainer')
  const posts =  await getPosts();
  const inputValue = event.target.value.toLowerCase();

  const result = posts.filter((post) => {
    if (post.title.toLowerCase().startsWith(inputValue)) {
      return true;
    } else if (post.author.name.toLowerCase().startsWith(inputValue))
      return true;
  });

  container.innerHTML = "";
  return renderPostTemplates(result, container);
}