
// Import external modules
import React from 'react';
import Router from 'react-router';

// Import internal modules
import App from 'app/components/App';
import Main from 'app/components/Main';

// Extract router components from Router
const { Route, DefaultRoute, NotFoundRoute } = Router;

/**
 * The default Route object for both the server and client.
 *
 * @type {ReactElement}
 * @module Routes
 */
export default (
  <Route handler={App} path="/">
    <Route name="register" />
    <Route name="login" />
    <DefaultRoute name="home" handler={Main} />
  </Route>
);

