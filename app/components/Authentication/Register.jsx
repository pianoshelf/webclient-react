
import defer from 'lodash/function/defer';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import includes from 'lodash/collection/includes';
import React from 'react';
import { Link } from 'react-router';

import Button from './utils/Button';
import ErrorMessage from './utils/ErrorMessage';
import Input from './utils/Input';
import Title from './utils/Title';
import { errors, success } from '../../utils/constants';
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
      email: '',
      password1: '',
      password2: '',
    };
  },

  componentDidUpdate() {
    if (this.state.errorCode === success.REGISTERED) {
      defer(this.handlePostRegister_);
    }
  },

  handleSubmit_(event) {
    event.preventDefault();

    // Extract form values
    const { username, email, password1, password2 } = this.state;
    const newUser = { username, email, password1, password2 };

    // Trigger action
    const loginActions = this.flux.getActions('login');
    loginActions.register(newUser, this.flux);
  },

  handleFacebook_(event) {
    event.preventDefault();
    this.facebookLogin();
  },

  handlePostRegister_() {
    const { username, password1 } = this.state;

    // Trigger action
    const loginActions = this.flux.getActions('login');
    loginActions.login(username, password1, this.flux);
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
    const registerInProgress = includes(this.state.inProgress, 'register') ||
                             includes(this.state.inProgress, 'login');
    const facebookInProgress = includes(this.state.inProgress, 'facebookLogin');

    return (
      <div>
        <Helmet title="Register" />
        <Title>Sign up for PianoShelf</Title>
        <ErrorMessage errorCode={this.state.errorCode}
          dontDisplayIf={this.state.loggedIn || registerInProgress || facebookInProgress}
        />
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <Input placeholder="Username"
              name="username"
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_USERNAME, errors.USERNAME_TAKEN]}
              focusOnLoad
              valueLink={this.linkState('username')}
            />
            <Input placeholder="Email"
              name="email"
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_EMAIL, errors.INVALID_EMAIL, errors.EMAIL_ALREADY_REGISTERED]}
              valueLink={this.linkState('email')}
            />
            <Input placeholder="Password"
              name="password1"
              password
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_PASSWORD, errors.NOT_STRONG_PASSWORD]}
              valueLink={this.linkState('password1')}
            />
            <Input placeholder="Confirm Password"
              name="password2"
              password
              errorCode={this.state.errorCode}
              errorWhen={[errors.NOT_SAME_PASSWORD]}
              valueLink={this.linkState('password2')}
            />
          </div>
          <Button color="blue-light" submittedIf={registerInProgress}
            disableIf={registerInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="star" />
            Sign up
          </Button>
        </form>
        <Link to="/login" className="authentication__link">I have an account</Link>
        <hr className="authentication__hr" />
        <form onSubmit={this.handleFacebook_}>
          <Button color="facebook" submittedIf={facebookInProgress}
            disableIf={registerInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="facebook-square" />
            Sign up using Facebook
          </Button>
        </form>
      </div>
    );
  },

});
