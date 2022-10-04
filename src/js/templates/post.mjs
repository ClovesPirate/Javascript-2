import { removePost } from "../api/posts/remove.mjs";
import { load } from "../handlers/storage/index.mjs";

export function postTemplate(postData) {
  const profile = load('profile');

  const post = document.createElement('article');
  const bodyContainer = document.createElement('div');
  const contentContainer = document.createElement('div');
  const interactionContainer = document.createElement('div');

  post.classList.add('post', 'mb-3', 'bg-info', 'p-sm-3', 'border-top', 'border-bottom', 'me-1', 'bg-image', 'py-3');
  contentContainer.classList.add('ps-4', 'col-sm-10', 'col-9');
  interactionContainer.classList.add('d-flex', 'mt-2', 'justify-content-end');
  bodyContainer.classList.add('row');

  // If profile name matches author of post 
  // Renders ((button: delete)(button: edit)) with listeners: removePost(), renderUpdatePost();
  renderConditionalInteraction(profile, postData, interactionContainer);

  // Renders (avatar, author)(title) to post
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

  const postContainer = document.querySelector('#postBody');
  postContainer.innerHTML = "";

  const post = document.createElement('article');
  const interactionContainer = document.createElement('div');

  interactionContainer.classList.add('d-flex', 'justify-content-between');
  headerContainer.classList.add('d-flex', 'align-self-center');

  postContainer.append(post);

   // If profile name matches author of post 
  // Renders ((button: delete)(button: edit)) with handlers: removePost(), renderUpdatePost();
  renderConditionalInteraction(profile, postData, interactionContainer);
  
  // Renders (media, body-content, comment-button) to post
  renderBodyToTemplate(postData, post);
  renderButtonToTemplate(postData, interactionContainer);

  // Appends Interaction-container to post
  post.append(interactionContainer);

  return post
}

export function renderUpdatePost(postData) {

  const form = document.querySelector('#updatePostForm');
  form.title.value = postData.title;
  form.body.value = postData.body;
  form.tags.value = postData.tags;
  form.id.value = postData.id;
  form.media.value = postData.media;

  return form;
}

export function renderPostTemplate(postData, parent) {
  parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}

export function renderTitleToTemplate(postData, parent) {
  const title = document.createElement('h3');
  title.innerHTML = postData.title;
  parent.append(title);

  return title;
}

export function renderBodyToTemplate(postData, parent) {
  const contentContainer = document.createElement('div');
  const header = document.createElement('div');
  const title = document.createElement('h3');
  const body = document.createElement('p');
  const media = document.createElement('img');

  header.append(title);
  contentContainer.append(header, media, body);

  media.classList.add('img-fluid');

  title.innerHTML = postData.title;
  body.innerHTML  = postData.body;
  media.src = postData.media;

  parent.append(contentContainer);

  return contentContainer;
}

export function renderButtonToTemplate(postData, parent) {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary', 'btn-sm');
  button.setAttribute('id', postData.id);
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#singlePost');
  button.innerHTML = 'View Post';

  parent.append(button);

  // Fetches single post by ID, returns the values of post id content to an update-form modal;
  button.addEventListener('click', () => {
    // getPost(postData.id);

    return SinglePostTemplate(postData);
  });

  return button;
}

export function renderAuthorToTemplate(postData, parent) {
  const authorContainer = document.createElement('div');
  authorContainer.classList.add('border-end', 'px-sm-2', 'my-sm-2', 'author', 'col-sm-2', 'col-3')

  const author = document.createElement('p');
  author.classList.add('text-center', 'mt-1', 'text-break', 'fs-6');
  author.innerHTML = postData.author.name;

  const avatar = document.createElement('img');
  avatar.classList.add('mx-auto','d-block', 'avatar');
  avatar.src = postData.author.avatar;

  if( postData.author.avatar === "") {
    avatar.src = '../../../media/images/stock-avatar.jpg';
  }

  authorContainer.append(avatar, author);
  parent.append(authorContainer);

  return author;
}

export function renderConditionalInteraction(profile, postData, parent) {

  if (profile.name === postData.author.name) {

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-primary');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#updatePost');
    editButton.innerHTML = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
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