
import classNames from 'classnames';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

import { errors } from '../../utils/constants';

let { LinkedStateMixin } = addons;

function retrieveInitialData(flux) {
  const loginActions = flux.getActions('login');
  return loginActions.clearErrors();
}

export default React.createClass({

  mixins: [LinkedStateMixin, fluxMixin({
    login: store => ({
      errorCode: store.state.errorCode,
    }),
    progress: store => ({
      registerInProgress: store.inProgress('register'),
      facebookInProgress: store.inProgress('facebookLogin'),
    }),
  }), ],

  statics: {
    routeWillRun({ flux, state }) {
      return retrieveInitialData(flux);
    },
  },

  getInitialState() {
    return {
      username: '',
      email: '',
      password1: '',
      password2: '',
    };
  },

  componentDidMount() {
    retrieveInitialData(this.flux);
    this.refs.initFocus.getDOMNode().focus();
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
      case errors.EMAIL_ALREADY_REGISTERED:
        return 'A user is already registered with this e-mail address.';
      default:
        return 'An unknown error occurred!';
    }
  },

  render() {
    let error = this.state.errorCode;

    // Assign the correct class names based on whether there's an error or not
    let classes = {
      username: classNames('authentication__input', {
        'authentication__input--error': error === errors.NO_USERNAME ||
                                        error === errors.USERNAME_TAKEN,
      }),
      email: classNames('authentication__input', {
        'authentication__input--error': error === errors.NO_EMAIL ||
                                        error === errors.INVALID_EMAIL ||
                                        error === errors.EMAIL_ALREADY_REGISTERED,
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
        <If condition={error && !this.state.registerInProgress && !this.state.facebookInProgress}>
          <div className="authentication__error">
            <FontAwesome className="authentication__error-icon" name="exclamation-circle" size="lg" />
            {this.getErrorMessage_()}
          </div>
        </If>
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <input className={classes.username}
              type="text"
              ref="initFocus"
              placeholder="Username"
              valueLink={this.linkState('username')} />
            <input className={classes.email}
              type="text"
              placeholder="Email"
              valueLink={this.linkState('email')} />
            <input className={classes.password1}
              type="password"
              placeholder="Password"
              valueLink={this.linkState('password1')} />
            <input className={classes.password2}
              type="password"
              placeholder="Confirm Password"
              valueLink={this.linkState('password2')} />
          </div>
          <button className="authentication__button authentication__button--register"
            type="submit"
            disabled={this.state.registerInProgress || this.state.facebookInProgress}>
            <If condition={this.state.registerInProgress}>
              <FontAwesome name="cog" spin={true} />
            <Else />
              <span>
                <FontAwesome className="authentication__button-icon" name="star" />
                Sign up
              </span>
            </If>
          </button>
        </form>
        <Link to="/login" className="authentication__link">I have an account</Link>
        <hr className="authentication__hr" />
        <button className="authentication__button authentication__button--facebook"
          onClick={this.handleFacebook_}
          disabled={this.state.registerInProgress || this.state.facebookInProgress}>
          <If condition={this.state.facebookInProgress}>
            <FontAwesome name="cog" spin={true} />
          <Else />
            <span>
              <FontAwesome className="authentication__button-icon" name="facebook-square" />
              Sign up using Facebook
            </span>
          </If>
        </button>
      </div>
    );
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
  },

});
