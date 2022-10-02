import { setRegisterFormListener } from './handlers/register.mjs';
import { setloginFormListener } from './handlers/login.mjs';
import * as post from  './api/posts/index.mjs';
import * as templates from './templates/index.mjs';

const path = location.pathname;

if (path === '/profile/login/') {
  setloginFormListener();
} else if (path === '/profile/register/') {
  setRegisterFormListener();
};

async function testTemplate() {
  const entries = await post.getPosts();
  const container = document.querySelector('#feedContainer');
  templates.renderPostTemplates(entries, container);
}

testTemplate()