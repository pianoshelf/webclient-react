
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import includes from 'lodash/collection/includes';
import Helmet from 'react-helmet';
import React from 'react';
import { Link } from 'react-router';

import Button from './utils/Button';
import ErrorMessage from './utils/ErrorMessage';
import Input from './utils/Input';
import Title from './utils/Title';
import { errors } from '../../utils/constants';
import { CanLoginMixin, FacebookLoginMixin } from '../../utils/authUtils';

export default React.createClass({

  mixins: [
    LinkedStateMixin,
    CanLoginMixin,
    FacebookLoginMixin,
    fluxMixin({
      login: store => store.state,
      progress: store => store.state,
    }),
  ],

  getInitialState() {
    return {
      username: '',
      password: '',
    };
  },

  handleSubmit_(event) {
    event.preventDefault();

    const { username, password } = this.state;

    // Trigger action
    const loginActions = this.flux.getActions('login');
    loginActions.login(username, password, this.flux);
  },

  handleFacebook_(event) {
    event.preventDefault();
    this.facebookLogin();
  },

  facebookLoginHandler(response) {
    if (response.status === 'connected') {
      const { accessToken } = response;

      // Trigger action
      const loginActions = this.flux.getActions('login');
      loginActions.facebookLogin({ accessToken }, this.flux);
    }
  },

  render() {
    const loginInProgress = includes(this.state.inProgress, 'login');
    const facebookInProgress = includes(this.state.inProgress, 'facebookLogin');

    return (
      <div>
        <Helmet title="Log in" />
        <Title>Log in to PianoShelf</Title>
        <ErrorMessage errorCode={this.state.errorCode}
          dontDisplayIf={this.state.loggedIn || loginInProgress || facebookInProgress}
        />
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <Input placeholder="Username"
              name="username"
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_USERNAME]}
              focusOnLoad
              valueLink={this.linkState('username')}
            />
            <Input placeholder="Password"
              name="password"
              password
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_PASSWORD]}
              valueLink={this.linkState('password')}
            />
          </div>
          <Button color="orange" submittedIf={loginInProgress}
            disableIf={loginInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="sign-in" />
            Log in
          </Button>
        </form>
        <Link to="/login/forgot" className="authentication__link">I forgot my password</Link>
        <hr className="authentication__hr" />
        <form onSubmit={this.handleFacebook_}>
          <Button color="facebook" submittedIf={facebookInProgress}
            disableIf={loginInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="facebook-square" />
            Sign in using Facebook
          </Button>
        </form>
      </div>
    );
  },

});
