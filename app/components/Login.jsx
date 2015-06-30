
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

import { errors } from 'app/utils/constants'

export default React.createClass({

  mixins: [fluxMixin({
    login: (store, props) => ({
      errorCode: store.state.errorCode,
      isLoggedIn: store.state.isLoggedIn,
      loginInProgress: store.state.loginInProgress,
      facebookInProgress: store.state.facebookInProgress,
    }),
  })],

  getInitialState() {
    return {
      loginInProgress: false,
      facebookInProgress: false,
      errorCode: 0,
      isLoggedIn: false,
    };
  },

  componentDidMount() {
    this.refs.username.getDOMNode().focus();
  },

  render() {
    let errorMessage = null;

    if (this.state.errorCode &&
        !this.state.loginInProgress &&
        !this.state.facebookInProgress) {
      errorMessage = (
        <div className="authentication__error">
          <FontAwesome className="authentication__error-icon" name="exclamation-circle" size="lg" />
          {this.getErrorMessage_()}
        </div>
      );
    }

    return (
      <div>
        <div className="authentication__title">Log in to PianoShelf</div>
        {errorMessage}
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <input className="authentication__input"
              type="text"
              ref="username"
              name="username"
              placeholder="Username" />
            <input className="authentication__input"
              type="password"
              ref="password"
              name="password"
              placeholder="Password" />
          </div>
          {this.renderLoginButton_()}
        </form>
        <Link className="authentication__link" to="forgot-password">I forgot my password</Link>
        <hr className="authentication__hr" />
        {this.renderFacebookButton_()}
      </div>
    );
  },

  renderLoginButton_() {
    let loginButton = this.state.loginInProgress ? (
      <span>
        <FontAwesome name="cog" spin={true} />
      </span>
    ) : (
      <span>
        <FontAwesome className="authentication__button-icon" name="sign-in" />
        Log in
      </span>
    );

    return (
      <button className="authentication__button authentication__button--login"
        type="submit"
        disabled={this.state.loginInProgress || this.state.facebookInProgress}>
        {loginButton}
      </button>
    );
  },

  renderFacebookButton_() {
    let facebookButton = this.state.facebookInProgress ? (
      <span>
        <FontAwesome name="cog" spin={true} />
      </span>
    ) : (
      <span>
        <FontAwesome className="authentication__button-icon" name="facebook-square" />
        Sign in using Facebook
      </span>
    );

    return (
      <button className="authentication__button authentication__button--facebook"
        onClick={this.handleFacebook_}
        disabled={this.state.loginInProgress || this.state.facebookInProgress}>
        {facebookButton}
      </button>
    );
  },

  getErrorMessage_() {
    switch (this.state.errorCode) {
      case errors.login.UNABLE_TO_LOG_IN:
        return 'Unable to log in with the provided username and password.';
      case errors.login.NO_USERNAME:
        return 'Username field is empty!';
      case errors.login.NO_PASSWORD:
        return 'Password field is empty!';
    }
  },

  handleSubmit_(event) {
    event.preventDefault();

    // Get parameters
    let username = this.refs.username.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;

    // Trigger action
    let loginActions = this.flux.getActions('login');
    loginActions.login(username, password);
  },

  handleFacebook_(event) {
    event.preventDefault();
  },

});

