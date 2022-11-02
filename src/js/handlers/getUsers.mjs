import { getUsers } from "../api/users/read.mjs";
import { renderUserTemplates } from "../templates/users.mjs";

export async function setGetUsers() {
  const users = await getUsers();
  const container = document.querySelector('#usersContainer');
  renderUserTemplates(users, container);
}