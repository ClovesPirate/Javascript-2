import * as handler from '../js/handlers/index.mjs';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

const path = location.pathname;

console.log(path);

if (path === '/index.html' || path === '/') {
  handler.setloginFormListener();
} else if (path === '/register/') {
  handler.setRegisterFormListener();
} else if (path === '/feed/') {
  handler.setGetPosts();
  handler.setCreatePostFormListener();
  handler.setUpdatePostFormListener();
  handler.setSearchPostsFormListener();
  handler.setFilterPostListener();
  handler.setLogoutEventListener();
  handler.setCreateCommentListener();
  handler.setGetProfile();
  handler.setUpdateMediaFormListener();
}