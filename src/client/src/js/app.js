// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles

import '../css/app.scss';

// Import App Component
import {AppFF} from '../components/app.jsx';

// Global State
import {createStore} from 'redux';
import allReducer from '../reducers'
import {Provider} from 'react-redux'
const store = createStore(allReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Init F7 Vue Plugin
localStorage.setItem("friendClicked", false);
Framework7.use(Framework7React)
// Mount React App
ReactDOM.render(
  <Provider store={store}>
    <AppFF></AppFF>
  </Provider>,
  document.getElementById('app'),
);