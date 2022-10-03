export function profileTemplate(postData) {
  const profile = document.createElement('div');
  const title = document.createElement('h1');
  const banner = documenet.createElement('img');
  const avatar = document.createElement('img');

  profile.classlist('profile', 'col-sm');
  title.classList('text-primary');

  return profile;
}

export function renderProfileTemplate(postData, parent) {
  parent.append(profileTemplate(postData));
}
