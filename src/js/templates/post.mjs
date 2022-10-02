export function postTemplate(postData) {
  const post = document.createElement('div');
  post.classList.add('post');
  post.innerHTML = postData.title;
  return post;
}

export function renderPostTemplate(postData, parent) {
  parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}