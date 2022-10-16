import { startFollowing, stopFollowing } from "../api/profile/following.mjs";

export function userTemplate(postData) {




  const { name, avatar, _count } = postData;

  const user = document.createElement('div');
  const userName = document.createElement('strong');
  const picture = document.createElement('img');
  const countContainer = document.createElement('div');
  const userFollowing = document.createElement('small');
  const userFollowers = document.createElement('small'); 
  const userPosts = document.createElement('small');
  const userContainer = document.createElement('div');


  user.classList.add('user', 'position-relative', 'bg-info', 'd-flex', 'align-items-center', 'p-3', 'my-2', 'justify-content-between');
  userContainer.classList.add('d-flex', 'align-items-center')
  picture.classList.add('img-fluid', 'd-block', 'avatar');
  userName.classList.add('text-break', 'ms-3');
  countContainer.classList.add('p-2', 'bg-dark', 'ms-5', 'rounded');
  userFollowers.classList.add('bg-dark', 'p-2', 'me-1')
  userFollowing.classList.add('bg-dark', 'p-2', 'mx-1')
  userPosts.classList.add('bg-dark', 'ms-1')


  userName.innerHTML = name;
  picture.src = avatar;
  picture.alt = `${userName} Avatar`;
  userFollowers.innerHTML = `<i class="ms-2 fa fa-users" aria-hidden="true"></i>
  ${_count.followers}`;
  userFollowing.innerHTML = `<i class="ms-2 fa-solid fa-user-group"></i>${_count.following}`;
  userPosts.innerHTML = `<i class="ms-2 fa fa-envelope-o" aria-hidden="true"></i>
  ${_count.posts}`;

  user.setAttribute('data-bs-toggle', 'tooltip');
  user.setAttribute('data-bs-title', 'follow');
  user.setAttribute('data-bs-placement', 'left');

  const tooltip = new bootstrap.Tooltip(user);
  

  if (!avatar) {
    picture.src = '/media/images/stock-avatar.jpg';
  }

  user.addEventListener('click', () => startFollowing(name));

  userContainer.append(picture, userName)
  countContainer.append(userPosts, userFollowing, userFollowers);
  user.append(userContainer, countContainer);

  return user;
}

export function friendTemplate(postData) {
  const { name, avatar } = postData;

  const user = document.createElement('div');
  const userName = document.createElement('p');
  const picture = document.createElement('img');
  const message = document.createElement('small');

  user.classList.add('user', 'position-relative', 'col-md-1', 'col-3')
  picture.classList.add('img-fluid', 'd-block', 'mx-auto', 'avatar');
  userName.classList.add('text-center', 'mx-auto', 'text-break');
  message.classList.add('hidden', 'position-absolute', 'top-50', 'start-50', 'translate-middle', 'text-dark', 'bg-light', 'px-2', 'py-1', 'rounded');

  message.innerHTML = 'Unfollow';
  userName.innerHTML = name;
  picture.src = avatar;

  if (!avatar) {
    picture.src = '/media/images/stock-avatar.jpg';
  }

  user.addEventListener('click', () => stopFollowing(name));
  user.append(picture, userName, message);

  return user;
}


/**
 * @param {[object]} postDataList 
 * @param {element} parent 
 */
export function renderUserTemplates(postDataList, parent) {
  parent.append(...postDataList.map(userTemplate));
}

export function renderFriendTemplates(postDataList, parent) {
  parent.append(...postDataList.map(friendTemplate));
}



