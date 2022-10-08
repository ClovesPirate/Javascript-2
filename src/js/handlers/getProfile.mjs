import { getProfile } from "../api/profile/read.mjs";
import { renderProfileTemplate } from "../templates/profile.mjs";

export async function setGetProfile() {
  const profile = await getProfile();
  console.log(profile);
  const container = document.querySelector('#profileContainer');
  renderProfileTemplate(profile, container);
}