import { getPost } from "../api/posts/read.mjs";
import { removePost } from "../api/posts/remove.mjs";
import { load } from "../handlers/storage/index.mjs";

export function postTemplate(postData) {
  const profile = load('profile');

  const post = document.createElement('article');
  const authorContainer = document.createElement('div');
  const headerContainer = document.createElement('div');
  const interactionContainer = document.createElement('div');

  post.classList.add('post', 'mb-5', 'col-4', 'p-2');
  post.setAttribute('id', postData.id);
  post.setAttribute('type', 'button');
  post.setAttribute('data-bs-toggle', 'modal');
  post.setAttribute('data-bs-target', '#singlePost');

  interactionContainer.classList.add('d-flex', 'justify-content-between');
  headerContainer.classList.add('d-flex', 'align-self-center');

  // If profile name matches author of post 
  // Renders ((button: delete)(button: edit)) with handlers: removePost(), renderUpdatePost();
  renderConditionalInteraction(profile, postData, interactionContainer);

  // Renders (avatar, author)(title) to post
  headerContainer.append(authorContainer);
  renderAuthorToTemplate(postData, authorContainer); // See to change values
  renderTitleToTemplate(postData, headerContainer); // See to change values

  // Appends ((Avatar, author), Title) to post
  post.append(headerContainer);
  
  // Renders (media, body-content, comment-button) to post
  renderMediaToTemplate(postData, post);
  renderBodyToTemplate(postData, post);
  renderButtonToTemplate(interactionContainer);

  // Appends Interaction-container to post
  post.append(interactionContainer);
  
  // Fetches single post by ID, returns the values of post id content to an update-form modal;
  post.addEventListener('click', () => {
    getPost(postData.id);

    return SinglePostTemplate(postData);
  });

  return post;
}

export function SinglePostTemplate(postData) {
  const profile = load('profile');

  const postContainer = document.querySelector('#postBody');
  postContainer.innerHTML = "";

  const post = document.createElement('article');
  const authorContainer = document.createElement('div');
  const headerContainer = document.createElement('div');
  const interactionContainer = document.createElement('div');

  interactionContainer.classList.add('d-flex', 'justify-content-between');
  headerContainer.classList.add('d-flex', 'align-self-center');

  postContainer.append(post);

   // If profile name matches author of post 
  // Renders ((button: delete)(button: edit)) with handlers: removePost(), renderUpdatePost();
  renderConditionalInteraction(profile, postData, interactionContainer);

  // Renders (avatar, author)(title) to post
  headerContainer.append(authorContainer);
  renderAuthorToTemplate(postData, authorContainer); // See to change values
  renderTitleToTemplate(postData, headerContainer); // See to change values

  // Appends ((Avatar, author), Title) to post
  post.append(headerContainer);
  
  // Renders (media, body-content, comment-button) to post
  renderMediaToTemplate(postData, post);
  renderBodyToTemplate(postData, post);
  renderButtonToTemplate(interactionContainer);

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
  const body = document.createElement('p');
  body.innerHTML = postData.body;
  parent.append(body);

  return body;
}

export function renderMediaToTemplate(postData, parent) {
  const media = document.createElement('img');
  media.src = postData.media;
  media.classList.add('img-fluid');
  parent.append(media);

  return media;
}

export function renderButtonToTemplate(parent) {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');
  button.innerHTML = 'Comment';
  parent.append(button);

  return button;
}

export function renderAuthorToTemplate(postData, parent) {
  const authorContainer = document.createElement('div');
  const author = document.createElement('p');
  author.classList.add('text-center', 'mt-1');
  author.innerHTML = postData.author.name;

  const avatar = document.createElement('img');
  avatar.classList.add('img-fluid', 'avatar');
  avatar.src = postData.author.avatar;

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