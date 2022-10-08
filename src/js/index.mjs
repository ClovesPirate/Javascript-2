import * as handler from '../js/handlers/index.mjs';

const path = location.pathname;

if (path === '/profile/login/') {
  handler.setloginFormListener();
} else if (path === '/profile/register/') {
  handler.setRegisterFormListener();
} else if (path === '/feed/') {
  handler.setGetPosts();
  handler.setCreatePostFormListener();
  handler.setUpdatePostFormListener();
  handler.setSearchPostsFormListener();
  handler.setFilterPostListener();
  handler.setLogoutEventListener();
  handler.setCreateCommentListener();
}