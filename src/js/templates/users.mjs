import { startFollowing, stopFollowing } from "../api/profile/following.mjs";

export function userTemplate(postData) {
  const { name, avatar } = postData;

  const user = document.createElement('div');
  const userName = document.createElement('p');
  const picture = document.createElement('img');
  const message = document.createElement('strong');

  user.classList.add('col-sm-3', 'user', 'position-relative', 'col-6')
  picture.classList.add('img-fluid', 'd-block', 'mx-auto', 'avatar');
  userName.classList.add('text-center', 'mx-auto', 'text-break');
  message.classList.add('hidden', 'position-absolute', 'top-50', 'start-50', 'translate-middle', 'text-dark', 'bg-light', 'px-2', 'py-1', 'rounded');

  message.innerHTML = 'Follow';
  userName.innerHTML = name;
  picture.src = avatar;

  if (avatar === "") {
    picture.src = '/media/images/stock-avatar.jpg';
  }

  user.addEventListener('click', () => startFollowing(name));
  user.append(picture, userName, message);

  return user;
}

export function friendTemplate(postData) {
  const { name, avatar } = postData;

  const user = document.createElement('div');
  const userName = document.createElement('p');
  const picture = document.createElement('img');
  const message = document.createElement('strong');

  user.classList.add('col-sm-3', 'user', 'position-relative', 'col-6')
  picture.classList.add('img-fluid', 'd-block', 'mx-auto', 'avatar');
  userName.classList.add('text-center', 'mx-auto', 'text-break');
  message.classList.add('hidden', 'position-absolute', 'top-50', 'start-50', 'translate-middle', 'text-dark', 'bg-light', 'px-2', 'py-1', 'rounded');

  message.innerHTML = 'Unfollow';
  userName.innerHTML = name;
  picture.src = avatar;

  if (avatar === "") {
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



