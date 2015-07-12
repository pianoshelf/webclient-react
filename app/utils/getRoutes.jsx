
// Import external modules
import React from 'react';
import { Route } from 'react-router';

// Import internal modules
import requireAuth from './requireAuth';

// Import components
import App from '../components/App';
import Authentication from '../components/authentication/Authentication';
import ResetPassword from '../components/authentication/ResetPassword';
import ResetPasswordConfirm from '../components/authentication/ResetPasswordConfirm';
import Homepage from '../components/Homepage';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';

/**
 * A function that retrieves the default Route object for both
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
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/login/forgot" component={ResetPassword} />
        <Route path="/login/reset" component={ResetPasswordConfirm} onEnter={requireAuth(flux)} />
      </Route>
      <Route path="/" component={Homepage} />
    </Route>
  );
};

