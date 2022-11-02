import * as handler from '../js/handlers/index.mjs';

/**
 * Switch for handling different tasks depending on location.pathname
 */
export default function router() {
  const path = location.pathname;

  switch(path) {
    case '/index.html':
    handler.setloginFormListener();
    break;
    case '/':
    handler.setloginFormListener();
    break;
    case '/register/':
    handler.setRegisterFormListener();
    break;
    case '/feed/':
    handler.setGetPosts();
    handler.setCreatePostFormListener();
    handler.setUpdatePostFormListener();
    handler.setSearchPostsFormListener();
    handler.setFilterPostListener();
    handler.setLogoutEventListener();
    handler.setCreateCommentListener();
    handler.setGetProfile();
    handler.setGetUsers();
    handler.setUpdateMediaFormListener();
    handler.setSearchUsersFormListener();
    break;
  }
}