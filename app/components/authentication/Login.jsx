
import classNames from 'classnames';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import includes from 'lodash/collection/includes';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

import { errors, success } from '../../utils/constants';
import { CanLoginMixin, AuthMessagesMixin, FacebookLoginMixin } from '../../utils/authUtils';

let { LinkedStateMixin } = addons;

export default React.createClass({

  mixins: [
    LinkedStateMixin,
    AuthMessagesMixin,
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

  componentDidMount() {
    this.refs.initFocus.getDOMNode().focus();
  },

  render() {
    let error = this.state.errorCode;

    let loginInProgress = includes(this.state.inProgress, 'login');
    let facebookInProgress = includes(this.state.inProgress, 'facebookLogin');

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
        <If condition={error && error !== success.LOGGED_IN &&
          !loginInProgress && !facebookInProgress}>
          <div className="authentication__error">
            <FontAwesome className="authentication__error-icon" name="exclamation-circle" size="lg" />
            {this.getErrorMessage(error)}
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
            disabled={loginInProgress || facebookInProgress}>
            <If condition={loginInProgress}>
              <FontAwesome name="cog" spin={true} />
            <Else />
              <span>
                <FontAwesome className="authentication__button-icon" name="sign-in" />
                Log in
              </span>
            </If>
          </button>
        </form>
        <Link to="/login/forgot" className="authentication__link">I forgot my password</Link>
        <hr className="authentication__hr" />
        <button className="authentication__button authentication__button--facebook"
          onClick={this.handleFacebook_}
          disabled={loginInProgress || facebookInProgress}>
          <If condition={facebookInProgress}>
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

