import { setRegisterFormListener } from './handlers/register.mjs';
import { setloginFormListener } from './handlers/login.mjs';
import * as templates from './templates/index.mjs';
import { setCreatePostFormListener } from './handlers/createPost.mjs';
import { getProfile } from './api/profile/getProfile.mjs';
import { setUpdatePostFormListener } from './handlers/updatePost.mjs';
import { setGetPosts } from './handlers/getPost.mjs';

const path = location.pathname;

if (path === '/profile/login/') {
  setloginFormListener();
} else if (path === '/profile/register/') {
  setRegisterFormListener();
} else if (path === '/feed/') {
  setGetPosts();
  setCreatePostFormListener();
  setUpdatePostFormListener();

 


  // // Temporary
  // async function testProfileTemplate() {
  //   const profile = await getProfile();
  //   console.log(profile);
  //   }
  
  // testProfileTemplate();
}