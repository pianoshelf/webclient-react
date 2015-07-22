
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
import { errors } from '../../utils/constants';
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
      password: '',
    };
  },

  render() {
    let loginInProgress = includes(this.state.inProgress, 'login');
    let facebookInProgress = includes(this.state.inProgress, 'facebookLogin');

    return (
      <div>
        <Title>Log in to PianoShelf</Title>
        <ErrorMessage errorCode={this.state.errorCode}
          dontDisplayIf={this.state.loggedIn ||
            loginInProgress || facebookInProgress} />
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <Input placeholder="Username"
              name="username"
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_USERNAME]}
              focusOnLoad={true}
              valueLink={this.linkState('username')} />
            <Input placeholder="Password"
              name="password"
              password={true}
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_PASSWORD]}
              valueLink={this.linkState('password')} />
          </div>
          <Button color="orange" submittedIf={loginInProgress}
              disableIf={loginInProgress || facebookInProgress}>
            <FontAwesome className="authentication__button-icon" name="sign-in" />
            Log in
          </Button>
        </form>
        <Link to="/login/forgot" className="authentication__link">I forgot my password</Link>
        <hr className="authentication__hr" />
        <form onSubmit={this.handleFacebook_}>
          <Button color="facebook" submittedIf={facebookInProgress}
              disableIf={loginInProgress || facebookInProgress}>
            <FontAwesome className="authentication__button-icon" name="facebook-square" />
            Sign in using Facebook
          </Button>
        </form>
      </div>
    );
  },

  handleSubmit_(event) {
    event.preventDefault();

    let { username, password } = this.state;

    // Trigger action
    let loginActions = this.flux.getActions('login');
    loginActions.login(username, password, this.flux);
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

});

