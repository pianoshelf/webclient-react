
// Import external modules
import React from 'react';
import Router from 'react-router';

// Import internal modules
import App from 'app/components/App';
import Authentication from 'app/components/Authentication';
import Homepage from 'app/components/Homepage';
import Register from 'app/components/Register';
import Login from 'app/components/Login';
import ForgotPassword from 'app/components/ForgotPassword';

// Extract router components from Router
const { Route, DefaultRoute, NotFoundRoute } = Router;

/**
 * The default Route object for both the server and client.
 *
 * @type {ReactElement}
 * @module Routes
 */
export default (
  <Route handler={App} path="/" >
    <Route name="authentication" handler={Authentication}>
      <Route name="register" path="/register" handler={Register} />
      <Route name="login" path="/login" handler={Login} />
      <Route name="forgot-password" path="/forgot-password" handler={ForgotPassword} />
    </Route>
    <Route name="search" />
    <Route name="sheetmusic" />
    <DefaultRoute name="home" handler={Homepage} />
  </Route>
);

