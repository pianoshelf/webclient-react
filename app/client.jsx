
// Import polyfills first
import 'babel-polyfill';

// Import external modules
import base64 from 'base-64';
import React from 'react';
import utf8 from 'utf8';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncReduxAndRouter } from 'react-router-redux';

// Import internal modules
import configureStore from './utils/configureStore';
import getRoutes from './utils/getRoutes';

// Add our isomorphic constants
window.__SERVER__ = false;
window.__CLIENT__ = true;

// Get react-root object
const reactRoot = document.getElementById('react-root');

// Import inline flux data
const inlineData = window.__INITIAL_STATE__;
const initialState = JSON.parse(utf8.decode(base64.decode(inlineData)));

// Create reducer, store, and history
const store = configureStore(initialState);

// Link history and redux store
syncReduxAndRouter(browserHistory, store);

// Get all of the site's routes
const routes = getRoutes(store);

// Re-render everything on reactRoot
render(
  <Provider store={store}>
    { <Router history={browserHistory} routes={routes} /> }
  </Provider>,
  reactRoot
);

// Reset our progress bar
// flux.getActions('progress').resetProgress();
