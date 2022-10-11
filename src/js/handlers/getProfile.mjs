import { getProfile } from "../api/profile/index.mjs";
import { renderProfileTemplate } from "../templates/profile.mjs";
import { renderFriendTemplates } from "../templates/users.mjs";
/**
 * Handler for getting profile
 */
export async function setGetProfile() {
  const profile = await getProfile();
  const container = document.querySelector('#profileContainer');
  const friendContainer = document.querySelector('#friendsContainer');
  renderProfileTemplate(profile, container);
  renderFriendTemplates(profile.following, friendContainer);
}

