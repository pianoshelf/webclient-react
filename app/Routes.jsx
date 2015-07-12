
// Import external modules
import React from 'react';
import { Route } from 'react-router';

// Import internal modules
import authenticateComponent from './utils/authenticateComponent';

// Import components
import App from './components/App';
import Authentication from './components/authentication/Authentication';
import ResetPassword from './components/authentication/ResetPassword';
import ResetPasswordConfirm from './components/authentication/ResetPasswordConfirm';
import Homepage from './components/Homepage';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';

/**
 * The default Route object for both the server and client.
 *
 * @type {ReactElement}
 * @module Routes
 */
export default (
  <Route component={App}>
    <Route component={Authentication}>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/login/forgot" component={ResetPassword} />
      <Route path="/login/reset" component={authenticateComponent(ResetPasswordConfirm)} />
    </Route>
    <Route path="/" component={Homepage} />
  </Route>
);


