/**
 * Error message to be displayed
 * @param {string} message Pass in a string you want to be displayed
 * @param {element} parent what element to append to, typically through a queryselector
 * @returns renders an error message inside the container
 */
export function errorMessage(message, parent) {
  const container = document.createElement('div');
  const button = document.createElement('div');
  const errorMessage = document.createElement('p');

  errorMessage.innerHTML = message;
  button.innerHTML = 'Reload';

  container.classList.add('bg-info', 'p-3', 'mt-5');
  errorMessage.classList.add('text-center');
  button.classList.add('mx-auto', 'btn', 'btn-primary', 'd-block')

  button.addEventListener('click', () => window.location.reload());

  container.append(errorMessage, button)
  return parent.append(container);
}