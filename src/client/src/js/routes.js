
import HomePage from '../pages/home.jsx';
import PositionPage from '../pages/positions.jsx';
import FormPage from '../pages/friend-form.jsx';
import SignupPage from '../pages/signup.jsx'

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import LoginPage from '../pages/login-page.jsx';
import NotFoundPage from '../pages/404.jsx';

import API from '../utils/API'

function securedRoute(path, component) {
  return {
    path,
    async(to, from, resolve, reject) {
      if (!API.isAuth()) {
        resolve({ component: component });
      } else {
        resolve({ component: LoginPage });
      }
    }
  }
}

var routes = [
  securedRoute('/',HomePage),
  securedRoute('/positions/', PositionPage),
  securedRoute('/friend-form/',FormPage),
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
