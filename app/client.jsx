/* eslint-disable react/prop-types */

// Import polyfills first
import 'babel-polyfill';
import 'whatwg-fetch';

// Import external modules
import base64 from 'base-64';
import React from 'react';
import utf8 from 'utf8';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';

// Import internal modules
import configureStore from './utils/configureStore';
import DevTools from './components/DevTools';
import getRoutes from './utils/getRoutes';
import { loadAnalytics, trackPageView } from './utils/analytics';

// Add our isomorphic constants
window.__SERVER__ = false;
window.__CLIENT__ = true;

// Load Google Analytics
loadAnalytics();

// Get react-root object
const reactRoot = document.getElementById('react-root');

// Import inline flux data
const inlineData = window.__INITIAL_STATE__;
const initialState = JSON.parse(utf8.decode(base64.decode(inlineData)));

// Create reducer, store, and history
const store = configureStore(initialState);

// Link history and redux store
const history = syncHistoryWithStore(browserHistory, store);

// Get all of the site's routes
const routes = getRoutes(store);

// Load asynchronous loading function
const loadAsync = props => (
  <ReduxAsyncConnect {...props} helpers={{ location: props.location }} />
);

// Track pageviews on every browser history change
browserHistory.listen(location => trackPageView(location));

// Scroll to top on every render
const scrollToTop = () => window.scrollTo(0, 0);

// Re-render everything on reactRoot
render(
  <Provider store={store} key="provider">
    <div>
      <DevTools />
      <Router
        render={loadAsync}
        history={history}
        routes={routes}
        onUpdate={scrollToTop}
      />
    </div>
  </Provider>,
  reactRoot
);
