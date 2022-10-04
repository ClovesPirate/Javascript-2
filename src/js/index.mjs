import { setRegisterFormListener } from './handlers/register.mjs';
import { setloginFormListener } from './handlers/login.mjs';
import * as post from  './api/posts/index.mjs';
import * as templates from './templates/index.mjs';
import { setCreatePostFormListener } from './handlers/createPost.mjs';
import { getProfile } from './api/profile/getProfile.mjs';
import { setUpdatePostFormListener } from './handlers/updatePost.mjs';

const path = location.pathname;

if (path === '/profile/login/') {
  setloginFormListener();
} else if (path === '/profile/register/') {
  setRegisterFormListener();
} else if (path === '/feed/') {
  async function testTemplate() {
    const entries = await post.getPosts();
    const container = document.querySelector('#feedContainer');
    templates.renderPostTemplates(entries, container);
  }
  setCreatePostFormListener();
  setUpdatePostFormListener();

  async function testProfileTemplate() {
    const profile = await getProfile();
    console.log(profile);
    }
  
  testProfileTemplate();
  testTemplate()
}