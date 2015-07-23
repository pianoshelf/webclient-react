
// Import external modules
import React from 'react';
import { Route, Redirect } from 'react-router';

// Import internal modules
import { requireNoAuth } from './authUtils';

// Main components
import App from '../components/App';
import Homepage from '../components/Homepage';

// Authentication related components
import Authentication from '../components/Authentication';
import Login from '../components/Authentication/Login';
import Logout from '../components/Authentication/Logout';
import Register from '../components/Authentication/Register';
import ResetPassword from '../components/Authentication/ResetPassword';
import ResetPasswordConfirm from '../components/Authentication/ResetPasswordConfirm';
import VerifyEmail from '../components/Authentication/VerifyEmail';

// Static components
import Static from '../components/Static';
import Copyright from '../components/Static/Copyright';
import PrivacyPolicy from '../components/Static/PrivacyPolicy';
import TermsOfService from '../components/Static/TermsOfService';

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

      { /* Homepage */ }
      <Route path="/" component={Homepage} />

      { /* Authentication routes */ }
      <Route component={Authentication}>
        <Route path="/login" component={Login} onEnter={requireNoAuth(flux)} />
        <Route path="/login/forgot" component={ResetPassword} onEnter={requireNoAuth(flux)} />
        <Route path="/login/reset/:uid/:token" component={ResetPasswordConfirm} onEnter={requireNoAuth(flux)} />
        <Route path="/login/verify/:key" component={VerifyEmail} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} onEnter={requireNoAuth(flux)} />
        <Redirect from="/password-reset-confirm/:uid/:token" to="/login/reset/:uid/:token" />
        <Redirect from="/verify-email/:key" to="/login/verify/:key" />
      </Route>

      { /* Static routes */ }
      <Route component={Static}>
        <Route path="/copyright" component={Copyright} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Redirect path="/terms.html" to="/terms" />
        <Redirect path="/copyright.html" to="/copyright" />
      </Route>

    </Route>
  );
}

