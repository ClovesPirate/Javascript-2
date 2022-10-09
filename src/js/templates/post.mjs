
import { removePost } from "../api/posts/remove.mjs";
import { startFollowing, stopFollowing } from "../api/profile/index.mjs";
import { load } from "../handlers/storage/index.mjs";

/**
 * HTML template for posts
 * @param {object} postData 
 * @returns A HTML template for fetched data
 */
export function postTemplate(postData) {
  const profile = load('profile');

  // Elements
  const post = document.createElement('article');
  const bodyContainer = document.createElement('div');
  const contentContainer = document.createElement('div');
  const interactionContainer = document.createElement('div');

  // Classes
  post.classList.add('post', 'mb-3', 'bg-info', 'p-sm-4', 'p-3');
  contentContainer.classList.add('px-sm-3', 'col-sm-10', 'col-8' );
  interactionContainer.classList.add('d-flex', 'justify-content-end');
  bodyContainer.classList.add('row');

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

export function SinglePostTemplate(postData) {
  const profile = load('profile');

  // Elements
  const post = document.createElement('article');
  const bodyContainer = document.createElement('div');
  const contentContainer = document.createElement('div');
  const interactionContainer = document.createElement('div');

  // Classes
  post.classList.add('post', 'mb-3', 'bg-info', 'p-sm-4', 'p-3');
  contentContainer.classList.add('px-sm-3', 'col-sm-10', 'col-10' );
  interactionContainer.classList.add('d-flex', 'justify-content-end');
  bodyContainer.classList.add('row');

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
  post.append(interactionContainer);

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
 * @param {object} postData first value
 * @param {element} parent second value
 */

export function renderPostTemplate(postData, parent) {
  parent.append(postTemplate(postData));
}

/**
 * @param {[object]} postDataList 
 * @param {element} parent 
 */
export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}

/**
 * 
 * @param {object} postData first value
 * @param {element} parent second value
 * @returns container with content from {postData} with styling
 */
export function renderBodyToTemplate(postData, parent) {
  const { title, body, media } = postData;

  // Elements
  const container = document.createElement('div');
  const header = document.createElement('div');
  const postTitle = document.createElement('h3');
  const postBody = document.createElement('p');
  const postContent = document.createElement('div');

  // Content added if condition is met
  if (media !== "") {
    const postMedia = document.createElement('img');
    postMedia.classList.add('img-fluid', 'col-sm-4');
    postContent.append(postMedia);
    postContent.classList.add('row');
    postMedia.src = media;
  }
  
  // Appending
  header.append(postTitle);
  postContent.append(postBody);
  container.append(header, postContent);

  // Classes
  postTitle.classList.add('text-break', 'text-bold', 'text-secondary', 'align-items-center', 'fs-2');
  header.classList.add('d-flex', 'align-items-center');
  postBody.classList.add('text-break', 'col-sm-8');

  // HTML values
  postTitle.innerHTML = title;
  postBody.innerHTML  = body;
  
  parent.append(container);
  return container;
}

/**
 * 
 * @param {object} postData 
 * @param {element} parent 
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

export function renderAuthorToTemplate(postData, parent) {
  const authorContainer = document.createElement('div');
  authorContainer.classList.add('author', 'col-sm-2', 'col-4', 'd-block','border-end', 'justify-content-center', 'pe-4')

  const author = document.createElement('small');
  author.classList.add( 'mt-2', 'text-break', 'fs-6', 'd-block', 'text-center');
  author.innerHTML = `${postData.author.name}`;

  const avatar = document.createElement('img');
  avatar.classList.add('d-block', 'avatar', 'mx-auto');
  avatar.src = postData.author.avatar;

  const followButton = document.createElement('button');
  followButton.classList.add('btn', 'btn-secondary', 'btn-sm');
  followButton.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>';
  followButton.addEventListener('click', () => {
    const { name } = postData.author;
    startFollowing(name);
    alert(`You are now following${name}`);
    location.reload();
  })

  const unFollowButton = document.createElement('button');
  unFollowButton.classList.add('btn', 'btn-primary', 'btn-sm');
  unFollowButton.innerHTML = '<i class="fas fa-heart-broken"></i>';
  unFollowButton.addEventListener('click', () => {
    const { name } = postData.author;
    stopFollowing(name);
    alert(`You are no longer following${name}`);
    location.reload();
  })

  if( postData.author.avatar === "") {
    avatar.src = '../../../media/images/stock-avatar.jpg';
  }

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('d-grid', 'mx-auto', 'mt-2')
  const detailsContainer = document.createElement('div');
  detailsContainer.append(avatar, author)
  buttonContainer.append(followButton, unFollowButton);
  authorContainer.append(detailsContainer, buttonContainer);
  parent.append(authorContainer);

  return author;
}

export function renderConditionalInteraction(profile, postData, parent) {
  const { author } = postData;
  const { name } = author;
 
  if (profile.name === name) {

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-secondary', 'btn-sm');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#updatePost');
    editButton.innerHTML = `<i class="me-2 fa fa-pencil" aria-hidden="true"></i>Edit
    `;

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

export function renderCommentsToPost(postData) {
  const commentContainer = document.querySelector('#commentSection');
  commentContainer.innerHTML = "";
  const { comments } = postData;

  comments.forEach(comment => {
    const { body, owner } = comment;
    const content = document.createElement('small');
    const creator = document.createElement('strong');
    const container = document.createElement('div');
    container.classList.add('mt-3', 'p-2', 'border-start', 'px-3', 'bg-dark')
    creator.classList.add('fs-5');
    content.classList.add('fs-6', 'd-block');

    content.innerHTML = body;
    creator.innerHTML = owner;

    container.append(creator, content);
    commentContainer.append(container);
    return commentContainer;
  })
}