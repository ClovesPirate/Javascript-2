import { removePost } from "../api/posts/remove.mjs";
import { load } from "../handlers/storage/index.mjs";

export function postTemplate(postData) {
  const profile = load('profile');

  const post = document.createElement('article');
  const title = document.createElement('h2');
  const body = document.createElement('p');
  const button = document.createElement('button');
  const media = document.createElement('img');
  const interactionContainer = document.createElement('div');

  post.classList.add('post', 'mb-5', 'rounded');
  post.setAttribute('id', postData.id);
  button.classList.add('btn', 'btn-primary');
  interactionContainer.classList.add('d-flex', 'justify-content-between');
  media.classList.add('img-fluid');
  
  title.innerHTML = postData.title;
  body.innerHTML = postData.body;
  media.src = postData.media;
  button.innerHTML = 'Comment';

  if (profile.name === postData.author.name) {

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-outline-primary');
    editButton.innerHTML = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.setAttribute('type', 'submit');
    deleteButton.innerHTML = `<i class="pe-2 fa-solid fa-trash"></i>Delete`;

    const wrapper = document.createElement('div');

    wrapper.append(deleteButton, editButton)
    interactionContainer.append(wrapper);
  }
  
  interactionContainer.append(button);
  post.append(title, media, body, interactionContainer);

  return post;
}

export function renderPostTemplate(postData, parent) {
  parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}