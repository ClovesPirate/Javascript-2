const container = document.querySelector('body');

/**
 * Function for creating a toast
 * @param {string} message type in the message you wish to be displayed
 * @returns renders a toast on the page when called
 * @example
 * ```js
 * createToast('Hello World');
 * // Expect a toast with the content 'Hello World'
 * ```
 */
export function createToast(message) {
  const toastContainer = document.createElement('div');
  const toast = document.createElement('div');
  const toastHeader = document.createElement('div');
  const headerTitle = document.createElement('strong');
  const closeButton = document.createElement('button');
  const toastBody = document.createElement('div');

  toastContainer.classList.add('toast-container', 'position-fixed', 'top-0', 'end-0', 'p-3');
  headerTitle.classList.add('me-auto');
  closeButton.classList.add('btn-close');
  toast.classList.add('toast');
  toastHeader.classList.add('toast-header');
  toastBody.classList.add('toast-body');
  closeButton.setAttribute('data-bs-dismiss', 'toast');
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('aria-label', 'Close');
  toast.setAttribute('id', 'liveToast');
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  
  
  toastHeader.append(headerTitle, closeButton);
  toast.append(toastHeader, toastBody);
  toastContainer.append(toast);
  container.append(toastContainer);

  toastHeader.innerHTML = `<div><i class="text-light bg-primary p-2 fa-solid fa-signature rounded"></i><span class="ms-2 text-dark">CodeHub</span></div>`
  toastBody.innerHTML = `${message}`;
  
  const bootstrapToast = new bootstrap.Toast(toast);
  bootstrapToast.show();

  return bootstrapToast;
}
