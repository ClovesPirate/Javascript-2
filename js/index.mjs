import { setRegisterFormListener } from './handlers/register.mjs';
import { setloginFormListener } from './handlers/login.mjs';

const path = location.pathname;

if (path === '/profile/login/') {
  setloginFormListener();
} else if (path === '/profile/register/') {
  setRegisterFormListener();
};

