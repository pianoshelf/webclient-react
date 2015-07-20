
import defer from 'lodash/function/defer';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import includes from 'lodash/collection/includes';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

import Button from './utils/Button';
import ErrorMessage from './utils/ErrorMessage';
import Input from './utils/Input';
import Title from './utils/Title';
import { errors, success } from '../../utils/constants';
import { CanLoginMixin, FacebookLoginMixin } from '../../utils/authUtils';

let { LinkedStateMixin } = addons;

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

  render() {
    let registerInProgress = includes(this.state.inProgress, 'register') ||
                             includes(this.state.inProgress, 'login');
    let facebookInProgress = includes(this.state.inProgress, 'facebookLogin');

    return (
      <div>
        <Title>Sign up for PianoShelf</Title>
        <ErrorMessage errorCode={this.state.errorCode}
          dontDisplayIf={this.state.errorCode === success.LOGGED_IN ||
            registerInProgress || facebookInProgress} />
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <Input placeholder="Username"
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_USERNAME, errors.USERNAME_TAKEN]}
              focusOnLoad={true}
              valueLink={this.linkState('username')} />
            <Input placeholder="Email"
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_EMAIL, errors.INVALID_EMAIL, errors.EMAIL_ALREADY_REGISTERED]}
              valueLink={this.linkState('email')} />
            <Input placeholder="Password"
              password={true}
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_PASSWORD, errors.NOT_STRONG_PASSWORD]}
              valueLink={this.linkState('password1')} />
            <Input placeholder="Confirm Password"
              password={true}
              errorCode={this.state.errorCode}
              errorWhen={[errors.NOT_SAME_PASSWORD]}
              valueLink={this.linkState('password2')} />
          </div>
          <Button color="blue-light" submittedIf={registerInProgress}
              disableIf={registerInProgress || facebookInProgress}>
            <FontAwesome className="authentication__button-icon" name="star" />
            Sign up
          </Button>
        </form>
        <Link to="/login" className="authentication__link">I have an account</Link>
        <hr className="authentication__hr" />
        <form onSubmit={this.handleFacebook_}>
          <Button color="facebook" submittedIf={facebookInProgress}
              disableIf={registerInProgress || facebookInProgress}>
            <FontAwesome className="authentication__button-icon" name="facebook-square" />
            Sign up using Facebook
          </Button>
        </form>
      </div>
    );
  },

  componentDidUpdate() {
    if (this.state.errorCode === success.REGISTERED) {
      defer(this.handlePostRegister_);
    }
  },

  handleSubmit_(event) {
    event.preventDefault();

    // Extract form values
    let { username, email, password1, password2 } = this.state;
    let newUser = { username, email, password1, password2 };

    // Trigger action
    let loginActions = this.flux.getActions('login');
    loginActions.register(newUser, this.flux);
  },

  handleFacebook_(event) {
    event.preventDefault();
    this.facebookLogin();
  },

  facebookLoginHandler(response) {
    if (response.status === 'connected') {
      let { accessToken } = response;

      // Trigger action
      let loginActions = this.flux.getActions('login');
      loginActions.facebookLogin({ accessToken }, this.flux);
    }
  },

  handlePostRegister_() {
    let { username, password1 } = this.state;

    // Trigger action
    let loginActions = this.flux.getActions('login');
    loginActions.login(username, password1, this.flux);
  },

});

