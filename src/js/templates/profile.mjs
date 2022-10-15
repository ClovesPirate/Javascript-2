import { renderUpdatePost } from "./post.mjs";
import { removePost } from "../api/posts/remove.mjs";

export function profileTemplate(postData) {
  const { name, banner, avatar, posts, _count} = postData;

  const profile = document.createElement('div');
  const title = document.createElement('h1');
  const profileBanner = document.createElement('img');
  const profilePicture = document.createElement('img');
  const headerContainer = document.createElement('div');
  const editProfileButton = document.createElement('button');
  const detailsContainer = document.createElement('div');
  const titleContainer = document.createElement('div');
  const ProfileFollowersCount = document.createElement('small');
  const profileFollowingCount = document.createElement('small');
  const profilePostsCount = document.createElement('small');
  const postsContainer = document.createElement('div');
  const postHeader = document.createElement('p');
  const imageContainer = document.createElement('div');

  imageContainer.append(profilePicture, editProfileButton);
  imageContainer.classList.add('d-grid', 'me-3');
  editProfileButton.innerHTML =  'Edit Profile';

  const bannerContainer = document.querySelector('#bannerContainer');
  bannerContainer.innerHTML = "";

  if (!banner) {
    profileBanner.src = "../../../media/images/banner-100.jpg";
  } else {
    profileBanner.src = banner;
  }

  if (!avatar) {
    profilePicture.src = "../../../media/images/stock-avatar.jpg";
  } else {
    profilePicture.src = avatar;
  }

  headerContainer.classList.add('d-flex');
  detailsContainer.classList.add('d-flex');
  profileBanner.classList.add('img-fluid', 'banner', 'd-block', 'mx-auto');
  profilePicture.classList.add('avatar-sm');
  editProfileButton.classList.add('btn', 'btn-primary', 'btn-sm');
  profile.classList.add('profile');
  title.classList.add('text-secondary', 'fs-2');
  profileFollowingCount.classList.add('bg-info', 'p-1', 'rounded', 'me-1');
  ProfileFollowersCount.classList.add('bg-info', 'p-1', 'rounded', 'me-1');
  profilePostsCount.classList.add('bg-info', 'p-1', 'rounded');
  postsContainer.classList.add('m-0', 'mt-1', 'row', 'myPosts');
  postHeader.classList.add('mt-5', 'm-0');

  profileFollowingCount.innerHTML = `Friends: ${_count.following}`;
  ProfileFollowersCount.innerHTML = `Followers: ${_count.followers}`;
  profilePostsCount.innerHTML = `Posts: ${_count.posts}`;
  title.innerHTML = name;
  editProfileButton.innerHTML = 'Edit';
  postHeader.innerHTML = 'My Posts';

  editProfileButton.setAttribute('data-bs-toggle', 'modal');
  editProfileButton.setAttribute('data-bs-target', '#updateMedia');
  editProfileButton.setAttribute('type', 'button');
  editProfileButton.addEventListener('click', () => {
      renderUpdateMedia(postData);
    });

  posts.forEach(post => {
    const postContainer = document.createElement('article');
    const postTitle = document.createElement('p');
    const postBody = document.createElement('small');
    const contentContainer = document.createElement('div');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    const buttonContainer = document.createElement('div');
    
    contentContainer.append(postTitle, postBody);

    deleteButton.addEventListener('click', () => removePost(post.id));
    editButton.addEventListener('click', () => renderUpdatePost(post));

    postTitle.innerHTML = post.title.slice(0, 18).concat('...');
    postBody.innerHTML = post.body.slice(0, 30).concat('...');

    buttonContainer.classList.add('me-2')
    
    postContainer.classList.add('bg-info', 'p-2', 'my-1', 'col-6-sm', 'd-flex', 'align-items-center', 'inline-block', 'h-25');
    postBody.classList.add('fs-6', 'text-muted', 'm-0')
    postTitle.classList.add('m-0');

    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.setAttribute('type', 'submit');
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    editButton.classList.add('btn', 'btn-primary');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#updatePost');
    editButton.innerHTML = `<i class="fa fa-pencil" aria-hidden="true"></i>
    `;
    
    buttonContainer.append(deleteButton, editButton)
    postContainer.append(buttonContainer, contentContainer);
    postsContainer.append(postContainer);
  }) 

  titleContainer.append(title, detailsContainer);
  detailsContainer.append(profileFollowingCount, ProfileFollowersCount, profilePostsCount);
  bannerContainer.append(profileBanner);
  headerContainer.append(imageContainer, titleContainer);
  profile.append(headerContainer, postHeader, postsContainer);

  return profile;
}

export function renderProfileTemplate(postData, parent) {
  parent.append(profileTemplate(postData));
}

export function renderUpdateMedia(media) {
  const { banner, avatar } = media;

  const form = document.querySelector('#updateMediaForm');
  form.banner.value = banner;
  form.avatar.value = avatar;

  return form;
}