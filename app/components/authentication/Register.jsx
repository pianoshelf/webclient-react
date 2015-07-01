
import classNames from 'classnames';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

import { errors } from 'app/utils/constants';

export default React.createClass({

  mixins: [fluxMixin({
    login: store => ({
      errorCode: store.state.errorCode,
      inProgress: store.state.inProgress,
    }),
  })],

  getInitialState() {
    return {
      inProgress: null,
    };
  },

  componentDidMount() {
    this.refs.username.getDOMNode().focus();
  },

  render() {
    let errorMessage = null;
    let error = this.state.errorCode;

    if (error &&
        !this.inProgress_('register') &&
        !this.inProgress_('facebookLogin')) {
      errorMessage = (
        <div className="authentication__error">
          <FontAwesome className="authentication__error-icon" name="exclamation-circle" size="lg" />
          {this.getErrorMessage_()}
        </div>
      );
    }

    // Assign the correct class names based on whether there's an error or not
    let classes = {
      username: classNames('authentication__input', {
        'authentication__input--error': error === errors.NO_USERNAME ||
                                        error === errors.USERNAME_TAKEN,
      }),
      email: classNames('authentication__input', {
        'authentication__input--error': error === errors.NO_EMAIL ||
                                        error === errors.INVALID_EMAIL,
      }),
      password1: classNames('authentication__input', {
        'authentication__input--error': error === errors.NO_PASSWORD,
      }),
      password2: classNames('authentication__input', {
        'authentication__input--error': error === errors.NOT_SAME_PASSWORD,
      }),
    };


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
    let registerButton = this.inProgress_('register') ? (
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
        disabled={this.inProgress_('register') || this.inProgress_('facebookLogin')}>
        {registerButton}
      </button>
    );
  },

  renderFacebookButton_() {
    let facebookButton = this.inProgress_('facebookLogin') ? (
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
        disabled={this.inProgress_('register') || this.inProgress_('facebookLogin')}>
        {facebookButton}
      </button>
    );
  },

  getErrorMessage_() {
    switch (this.state.errorCode) {
      case errors.NO_USERNAME:
        return 'You did not enter a username!';
      case errors.NO_EMAIL:
        return 'Please enter an email!';
      case errors.INVALID_EMAIL:
        return 'The email you provided is invalid.';
      case errors.NO_PASSWORD:
        return 'You did not enter a password!';
      case errors.NOT_SAME_PASSWORD:
        return 'The two password fields do not match.';
      case errors.USERNAME_TAKEN:
        return 'Sorry, that username is taken.';
      default:
        return 'An unknown error occurred!';
    }
  },

  inProgress_(inProgress) {
    return this.state.inProgress === inProgress;
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

