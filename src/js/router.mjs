import * as handler from '../js/handlers/index.mjs';

/**
 * Switch for handling different tasks depending on location.pathname
 */
export default function router() {
  const path = location.pathname;
  const hostPath = '/Javascript-2'

  switch(path) {
    case `${hostPath}/index.html`:
    handler.setloginFormListener();
    break;
    case '/index.html':
    handler.setloginFormListener();
    break;
    case `${hostPath}/`:
    handler.setloginFormListener();
    break;
    case '/':
    handler.setloginFormListener();
    break;
    case `${hostPath}/register/`:
    handler.setRegisterFormListener();
    break;
    case '/register/':
    handler.setRegisterFormListener();
    break;
    case `${hostPath}/feed/`:
    handler.setCreatePostFormListener();
    handler.setGetPosts();
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