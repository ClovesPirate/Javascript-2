/**
 * Function for storing key/value pairs to localstorage
 * @param {string} key 
 * @param {string} value 
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
/**
 * Function for getting key/value pairs from localstorage
 * @param {string} key 
 * @returns parses the value of a JSON string.
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null
  }
}
/**
 * Function for removing keys from localstorage
 * @param {string} key 
 */
export function remove(key) {
  localStorage.removeItem(key);
}