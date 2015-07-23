
// Import external modules
import React from 'react';
import { Route, Redirect } from 'react-router';

// Import internal modules
import { requireAuth, requireNoAuth } from './authUtils';

// Import components
import App from '../components/App';
import Authentication from '../components/authentication/Authentication';
import Copyright from '../components/static/Copyright';
import Homepage from '../components/Homepage';
import Login from '../components/authentication/Login';
import Logout from '../components/authentication/Logout';
import PrivacyPolicy from '../components/static/PrivacyPolicy';
import Register from '../components/authentication/Register';
import ResetPassword from '../components/authentication/ResetPassword';
import ResetPasswordConfirm from '../components/authentication/ResetPasswordConfirm';
import TermsOfService from '../components/static/TermsOfService';
import VerifyEmail from '../components/authentication/VerifyEmail';

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

      <Route path="/" component={Homepage} />
      <Route path="/copyright" component={Copyright} />
      <Route path="/privacypolicy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Redirect path="/terms.html" to="/terms" />
      <Redirect path="/copyright.html" to="/copyright" />

      <Route component={Authentication}>
        <Route path="/register" component={Register} onEnter={requireNoAuth(flux)} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} onEnter={requireNoAuth(flux)} />
        <Route path="/login/forgot" component={ResetPassword} onEnter={requireNoAuth(flux)} />
        <Route path="/login/reset/:uid/:token" component={ResetPasswordConfirm} onEnter={requireNoAuth(flux)} />
        <Route path="/login/verify/:key" component={VerifyEmail} />
        <Redirect from="/password-reset-confirm/:uid/:token" to="/login/reset/:uid/:token" />
        <Redirect from="/verify-email/:key" to="/login/verify/:key" />
      </Route>

    </Route>
  );
}

