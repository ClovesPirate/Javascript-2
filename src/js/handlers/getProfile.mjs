import { getProfile } from "../api/profile/index.mjs";
import { renderProfileTemplate } from "../templates/profile.mjs";

export async function setGetProfile() {
  const profile = await getProfile();
  const container = document.querySelector('#profileContainer');
  renderProfileTemplate(profile, container);
}