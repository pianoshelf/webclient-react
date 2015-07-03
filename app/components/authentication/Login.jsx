
import classNames from 'classnames';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

import { errors } from '../../utils/constants';

let { LinkedStateMixin } = addons;

export default React.createClass({

  mixins: [LinkedStateMixin, fluxMixin({
    login: store => ({
      errorCode: store.state.errorCode,
      isLoggedIn: store.state.isLoggedIn,
      inProgress: store.state.inProgress,
    }),
  }), ],

  getInitialState() {
    return {
      errorCode: 0,
      isLoggedIn: false,
      inProgress: null,
      username: '',
      password: '',
    };
  },

  componentDidMount() {
    this.refs.initFocus.getDOMNode().focus();
  },

  getErrorMessage_() {
    switch (this.state.errorCode) {
      case errors.UNABLE_TO_LOG_IN:
        return 'Unable to log in with the provided username and password.';
      case errors.NO_USERNAME:
        return 'Username field is empty!';
      case errors.NO_PASSWORD:
        return 'Password field is empty!';
      default:
        return 'An unknown error occurred!';
    }
  },

  render() {
    let error = this.state.errorCode;

    // Assign the correct class names based on whether there's an error or not
    let classes = {
      username: classNames('authentication__input', {
        'authentication__input--error': error === errors.NO_USERNAME,
      }),
      password: classNames('authentication__input', {
        'authentication__input--error': error === errors.NO_PASSWORD,
      }),
    };

    return (
      <div>
        <div className="authentication__title">Log in to PianoShelf</div>
        <If condition={error && !this.inProgress_('login') && !this.inProgress_('facebookLogin')}>
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
            <input className={classes.password}
              type="password"
              placeholder="Password"
              valueLink={this.linkState('password')} />
          </div>
          <button className="authentication__button authentication__button--login"
            type="submit"
            disabled={this.inProgress_('login') || this.inProgress_('facebookLogin')}>
            <If condition={this.inProgress_('login')}>
              <FontAwesome name="cog" spin={true} />
            <Else />
              <span>
                <FontAwesome className="authentication__button-icon" name="sign-in" />
                Log in
              </span>
            </If>
          </button>
        </form>
        <Link className="authentication__link" to="forgot-password">I forgot my password</Link>
        <hr className="authentication__hr" />
        <button className="authentication__button authentication__button--facebook"
          onClick={this.handleFacebook_}
          disabled={this.inProgress_('login') || this.inProgress_('facebookLogin')}>
          <If condition={this.inProgress_('facebookLogin')}>
            <FontAwesome name="cog" spin={true} />
          <Else />
            <span>
              <FontAwesome className="authentication__button-icon" name="facebook-square" />
              Sign in using Facebook
            </span>
          </If>
        </button>
      </div>
    );
  },

  inProgress_(inProgress) {
    return this.state.inProgress === inProgress;
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
  },

});

