import { setRegisterFormListener } from './handlers/register.mjs';
import { setloginFormListener } from './handlers/login.mjs';
import { setCreatePostFormListener } from './handlers/createPost.mjs';
import { setUpdatePostFormListener } from './handlers/updatePost.mjs';
import { setGetPosts } from './handlers/getPost.mjs';
import { setSearchPostsFormListener } from './handlers/searchPosts.mjs';
import { setFilterPostListener } from './handlers/filterPosts.mjs';
import { setLogoutEventListener } from './handlers/logout.mjs';

const path = location.pathname;

if (path === '/profile/login/') {
  setloginFormListener();
} else if (path === '/profile/register/') {
  setRegisterFormListener();
} else if (path === '/feed/') {
  setGetPosts();
  setCreatePostFormListener();
  setUpdatePostFormListener();
  setSearchPostsFormListener();
  setFilterPostListener();
  setLogoutEventListener();
}