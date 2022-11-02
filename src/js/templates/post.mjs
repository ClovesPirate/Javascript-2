
import { removePost } from "../api/posts/remove.mjs";
import { startFollowing, stopFollowing } from "../api/profile/index.mjs";
import { load } from "../handlers/storage/index.mjs";

/**
 * HTML template for posts
 * @param {object} postData Object from getPosts();
 * @returns A HTML template for fetched data
 */
export function postTemplate(postData) {
  const profile = load('profile');
  const { created, updated } = postData;

  // Elements
  const post = document.createElement('article');
  const bodyContainer = document.createElement('div');
  const contentContainer = document.createElement('div');
  const interactionContainer = document.createElement('div');

  // Classes
  post.classList.add('post', 'mb-3', 'bg-info', 'p-3', 'position-relative');
  interactionContainer.classList.add('d-flex', 'justify-content-end');

  if (created !== updated) {
    const updateTag = document.createElement('small');
    updateTag.innerHTML = `Updated`;
    updateTag.classList.add('px-2', 'py-1', 'bg-light', 'text-dark', 'position-absolute', 'end-0', 'fs-6');
    post.append(updateTag);
  }

  // === Appending ==== //

  // If profile name matches author of post 
  // Renders ((button: delete)(button: edit)) with listeners: removePost(), renderUpdatePost();
  renderConditionalInteraction(profile, postData, interactionContainer);

  // Renders (avatar, author) to post
  renderAuthorToTemplate(postData, bodyContainer); // See to change values

  // Renders (media, body-content, comment-button) to post
  renderBodyToTemplate(postData, contentContainer);
  bodyContainer.append(contentContainer);
  post.append(bodyContainer);
  renderButtonToTemplate(postData, interactionContainer);

  // Appends Interaction-container to post
  post.append(interactionContainer);

  return post;
}

/**
 * Function for single post layout and function
 * @param {object} postData object from getPosts();
 * @returns renders the entire post
 */
export function SinglePostTemplate(postData) {
  const profile = load('profile');

  // Elements
  const post = document.createElement('article');
  const bodyContainer = document.createElement('div');
  const contentContainer = document.createElement('div');
  const interactionContainer = document.createElement('div');
  const closeButton = document.createElement('button');

  // Classes
  post.classList.add('post', 'mb-3', 'bg-info', 'p-3', 'position-relative');
  interactionContainer.classList.add('d-flex', 'justify-content-end');
  closeButton.classList.add('position-absolute', 'btn-close', 'top-0', 'end-0', 'bg-light');
  closeButton.setAttribute('data-bs-dismiss', 'modal');

  // If profile name matches author of post 
  // Appends ((button: delete)(button: edit)) with listeners: removePost(), renderUpdatePost();
  renderConditionalInteraction(profile, postData, interactionContainer);

  // Appends (avatar, author) to post
  renderAuthorToTemplate(postData, bodyContainer); // See to change values

  // Appends (title, media, body-content, comment-button) to post
  renderBodyToTemplate(postData, contentContainer);
  bodyContainer.append(contentContainer);
  post.append(bodyContainer);

  // Appends Interaction-container to post
  post.append(interactionContainer, closeButton);

  renderCommentsToPost(postData);

  // Clear content of modal
  const postContainer = document.querySelector('#postBody');
  postContainer.innerHTML = "";
  postContainer.append(post);
  return post;
}

/**
 * Function for setting content of updateForm with current values
 * @param { {title: string, body: string, tags: string, id: number, media: URL }} postData 
 * @returns renders updateform with current values of post
 */
export function renderUpdatePost(postData) {

  const { title, body, tags, id, media } = postData

  const form = document.querySelector('#updatePostForm');
  form.title.value = title;
  form.body.value = body;
  form.tags.value = tags;
  form.id.value = id;
  form.media.value = media;

  return form;
}

/**
 * Renders an array of objects into a container
 * @param {[object]} postDataList 
 * @param {element} parent What element to append to.
 */
export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}

/**
 * Renders body content to post
 * @param {{title: string, body: string, media: URL, author: string}} postData Uses these values from the post object
 * @param {element} parent What element to append to.
 * @returns container with content from {postData} with styling
 */
export function renderBodyToTemplate(postData, parent) {
  const { title, body, media, author} = postData;

  // Elements
  const container = document.createElement('div');
  const header = document.createElement('div');
  const postTitle = document.createElement('h3');
  const postBody = document.createElement('p');
  const postContent = document.createElement('div');


 if (media) {
  const postMedia = document.createElement('img');
  postMedia.src = media;
  postMedia.alt = `${author.name} image`;
  postMedia.classList.add('container-sm', 'img-fluid', 'd-block', 'rounded');
  postContent.classList.add('mt-3');
  postContent.append(postMedia);
 }
  
  // Appending
  header.append(postTitle);
  postContent.append(header, postBody);
  container.append(postContent);

  // Classes
  postTitle.classList.add('text-break', 'text-light', 'fs-4', 'mt-3');
  header.classList.add('container-sm', 'd-flex', 'align-items-center');
  postBody.classList.add('text-break', 'container-sm', 'text-secondary');
  
  

  // HTML values
  postTitle.innerHTML = title;
  postBody.innerHTML  = body;
  
  parent.append(container);
  return container;
}

/**
 * Function for rendering button to post
 * @param {{id}} postData Stores the ID from the post object to render a single post modal on click
 * @param {element} parent What element variable to append to
 * @returns returns button with content and styling from {postData}
 */
export function renderButtonToTemplate(postData, parent) {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary', 'btn-sm');
  button.setAttribute('id', postData.id);
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#singlePost');
  button.innerHTML = `<i class="me-2 fa fa-envelope" aria-hidden="true"></i>View Post
  `;

  parent.append(button);

  // Pulls up single post in a modal with comment section and form input
  button.addEventListener('click', () => {
    // Stores the id value of post to comment form
    const form = document.querySelector('#commentForm');
    form.id.value = "";
    form.id.value = postData.id;

    return SinglePostTemplate(postData);
  });

  return button;
}

/**
 * Function for rendering name and avatar to HTML
 * @param {{author: object, created: string}} postData 
 * @param {element} parent What element to append to
 * @returns Returns a container with ${author.avatar} ${author.name} ${created}
 */
export function renderAuthorToTemplate(postData, parent) {
  const { author, created } = postData;

  const authorContainer = document.createElement('div');
  const postAuthor = document.createElement('small');
  const avatar = document.createElement('img');
  const postDate = document.createElement('small');
  const postTime = document.createElement('small');
  const postCreated = document.createElement('div');

  authorContainer.classList.add('author', 'd-flex', 'align-self-center')
  postAuthor.classList.add( 'ms-2', 'text-break', 'fs-6', 'align-items-center', 'd-flex');
  avatar.classList.add( 'avatar-post');
  postCreated.classList.add('d-flex', 'align-items-center', 'ms-2');
  postTime.classList.add('text-muted', 'fs-6', 'ms-1');
  postDate.classList.add('text-muted', 'fs-6');

  postAuthor.innerHTML = `${author.name}`;
  avatar.src = author.avatar;
  avatar.alt = `${author.avatar} profile image`;
  postDate.innerHTML = created.slice(0, 10);
  postTime.innerHTML = `at ${created.slice(11, 16)}`;

  if(!author.avatar) {
    avatar.src = '../../../media/images/stock-avatar.jpg';
  }

  postCreated.append(postDate, postTime);
  authorContainer.append(avatar, postAuthor, postCreated);
  parent.append(authorContainer);

  return author;
}

/**
 * Function for rendering conditional button interaction.
 * @param {{name: string}} profile Profile object of the current logged in user
 * @param {{author: string}} postData Object from 
 * @param {element} parent What element this content is to be appended to.
 * @returns If the user matches the author of a post, create buttons and listeners for updating and removing posts.
 */

export function renderConditionalInteraction(profile, postData, parent) {
  const { author } = postData;
  const { name } = author;
 
  if (profile.name === name) {
    // Editbutton
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-secondary', 'btn-sm');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#updatePost');
    editButton.innerHTML = `<i class="me-2 fa fa-pencil" aria-hidden="true"></i>Edit
    `;
    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'opacity-75');
    deleteButton.setAttribute('type', 'submit');
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    const wrapper = document.createElement('div');

    wrapper.append(deleteButton, editButton);
    parent.append(wrapper);

    editButton.addEventListener('click', () => renderUpdatePost(postData));
    deleteButton.addEventListener('click', () => removePost(postData.id));

    return wrapper;
  }
};

/**
 * Function for rendering comments to HTML
 * @param {object} postData Object from get post request.
 */

export function renderCommentsToPost(postData) {
  const commentContainer = document.querySelector('#commentSection');
  commentContainer.innerHTML = "";
  const { comments } = postData;

  // Render HTML for every comment
  comments.forEach(comment => {
    const { body, owner } = comment;

    // Create Elements
    const content = document.createElement('small');
    const creator = document.createElement('small');
    const container = document.createElement('div');

    // Add classes
    container.classList.add('mt-3', 'p-2', 'p-3', 'bg-dark', 'd-sm-flex')
    creator.classList.add('fs-6');
    content.classList.add('fs-6', 'd-block', 'text-muted', 'px-sm-3', 'align-baseline');

    // Content of comment
    content.innerHTML = `${body}`;
    creator.innerHTML = owner;

    // Appending elements
    container.append(creator, content);
    commentContainer.append(container);
    return commentContainer;
  })
}