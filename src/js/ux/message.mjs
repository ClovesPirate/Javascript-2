export function createMessage(message) {
  const modal = document.createElement('dialog');
  const messageContainer = document.createElement('div');
  const content = document.createElement('p');
  const button = document.createElement('button');

  modal.classList.add('position-absolute', 'top-50', 'left-50', 'translate-middle');

  messageContainer.append(content, button);
  modal.append(messageContainer);

  content.innerHTML = message;

  return modal;
}