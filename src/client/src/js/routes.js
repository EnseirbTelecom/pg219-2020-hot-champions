
import HomePage from '../pages/home.jsx';
import PositionPage from '../pages/positions.jsx';
import FormPage from '../pages/friend-form.jsx';
import SignupPage from '../pages/signup.jsx'

import LoginPage from '../pages/login-page.jsx';
import NotFoundPage from '../pages/404.jsx';

import {useSelector} from 'react-redux'

function securedRoute(path, component, name) {
  return {
    path,
    name, 
    async(to, from, resolve, reject) {
      if (localStorage.getItem("token")) {
        resolve({ component: component });
      } else {
        resolve({ component: LoginPage });
      }
    }
  }
}

var routes = [
  securedRoute('/',HomePage, "home"),
  securedRoute('/home/:lat/:lng',HomePage, "homeFriend"),
  securedRoute('/positions/', PositionPage, "positions"),
  securedRoute('/friend-form/',FormPage, "formpage"),
// {
//   path: '/',
//   component: HomePage,
// },
// {
//   path: '/positions/',
//   component: PositionPage,
// },

// {
//   path: '/friend-form/',
//   component: FormPage,
// },

  {
    path: '/login-page/',
    component: LoginPage,
  },
  {
    path: '/signup/',
    component: SignupPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
