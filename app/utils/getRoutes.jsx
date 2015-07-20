
// Import external modules
import React from 'react';
import { Route, Redirect } from 'react-router';

// Import internal modules
import { requireAuth, requireNoAuth } from './authUtils';

// Import components
import App from '../components/App';
import Authentication from '../components/authentication/Authentication';
import ResetPassword from '../components/authentication/ResetPassword';
import ResetPasswordConfirm from '../components/authentication/ResetPasswordConfirm';
import Homepage from '../components/Homepage';
import Login from '../components/authentication/Login';
import Logout from '../components/authentication/Logout';
import Register from '../components/authentication/Register';

/**
 * A function that retrieves the route configuration for both
 * the server and client.
 *
 * @param {Flux} flux The flux object.
 *
 * @return {React.Component} The set of routes objects.
 */
export default function getRoutes(flux) {
  return (
    <Route component={App}>
      <Route component={Authentication}>
        <Route path="/register" component={Register} onEnter={requireNoAuth(flux)} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} onEnter={requireNoAuth(flux)} />
        <Route path="/login/forgot" component={ResetPassword} onEnter={requireNoAuth(flux)} />
        <Route path="/login/reset/:uid/:token" component={ResetPasswordConfirm} />
        <Redirect from="/password-reset-confirm/:uid/:token" to="/login/reset/:uid/:token" />
      </Route>
      <Route path="/" component={Homepage} />
    </Route>
  );
}

