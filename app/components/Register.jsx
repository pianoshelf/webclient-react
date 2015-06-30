
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

// Pure render mixin
let { PureRenderMixin } = addons;

export default React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      registerInProgress: false,
      facebookInProgress: false,
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
        <div className="authentication__title">Sign up for PianoShelf</div>
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <input className="authentication__input"
              type="text"
              ref="username"
              name="username"
              placeholder="Username" />
            <input className="authentication__input"
              type="text"
              ref="email"
              name="email"
              placeholder="Email" />
            <input className="authentication__input"
              type="password"
              ref="password1"
              name="password1"
              placeholder="Password" />
            <input className="authentication__input"
              type="password"
              ref="password2"
              name="password2"
              placeholder="Confirm Password" />
          </div>
          {this.renderRegisterButton_()}
        </form>
        <Link className="authentication__link" to="login">I have an account</Link>
        <hr className="authentication__hr" />
        {this.renderFacebookButton_()}
      </div>
    );
  },


  renderRegisterButton_() {
    let registerButton = this.state.registerInProgress ? (
      <span>
        <FontAwesome name="cog" spin={true} />
      </span>
    ) : (
      <span>
        <FontAwesome className="authentication__button-icon" name="star" />
        Sign up
      </span>
    );

    return (
      <button className="authentication__button authentication__button--register"
        type="submit"
        disabled={this.state.registerInProgress || this.state.facebookInProgress}>
        {registerButton}
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
        Sign up using Facebook
      </span>
    );

    return (
      <button className="authentication__button authentication__button--facebook"
        onClick={this.handleFacebook_}
        disabled={this.state.registerInProgress || this.state.facebookInProgress}>
        {facebookButton}
      </button>
    );
  },

  getErrorMessage_() {
    switch (this.state.errorCode) {
      case errors.register.NO_USERNAME:
        return 'You did not enter a username!';
      case errors.register.NO_EMAIL:
        return 'Please enter an email!';
      case errors.register.INVALID_EMAIL:
        return 'The email you provided is invalid.';
      case errors.register.NO_PASSWORD:
        return 'You did not enter a password!';
      case errors.register.NOT_SAME_PASSWORD:
        return 'The two password fields do not match.';
      case errors.register.USERNAME_TAKEN:
        return 'Sorry, that username is taken.';
      case errors.register.UNABLE_TO_REGISTER:
        return 'Unable to register for a new account.';
    }
  },

  handleSubmit_(event) {
    event.preventDefault();

    // Set state to in progress.
    this.setState({ registerInProgress: true });
  },

  handleFacebook_(event) {
    event.preventDefault();

    // Set state to in progress.
    this.setState({ facebookInProgress: true });
  },

});

