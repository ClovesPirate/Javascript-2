import { getUsers } from "../api/users/read.mjs";
import { renderUserTemplates } from "../templates/users.mjs";

export async function setSearchUsersFormListener() {
  const searchControl = document.querySelector('#filterUsers');
  searchControl.addEventListener('keyup', handleUserControlInput);
}
  
export async function handleUserControlInput(event) {
  const container = document.querySelector('#usersContainer');
  const users = await getUsers();
  const inputValue = event.target.value.toLowerCase();

  const result = users.filter((user) => {
    if (user.name.toLowerCase().startsWith(inputValue)) {
      return true;
    }
  })

  container.innerHTML = "";
  return renderUserTemplates(result, container);
}