
import classNames from 'classnames';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

import { errors } from '../../utils/constants';
import { CanLoginMixin, AuthMessagesMixin } from '../../utils/authUtils';

let { LinkedStateMixin, PureRenderMixin } = addons;

function retrieveInitialData(flux) {
  const loginActions = flux.getActions('login');
  return loginActions.getUser(flux);
}

export default React.createClass({

  mixins: [PureRenderMixin, LinkedStateMixin, AuthMessagesMixin, fluxMixin({
    login: store => store.state,
    progress: store => ({
      resetInProgress: store.inProgress('resetPassword'),
    }),
  }), ],

  statics: {
    routeWillRun({ flux, state }) {
      return retrieveInitialData(flux);
    },
  },

  getInitialState() {
    return {
      email: '',
    };
  },

  componentDidMount() {
    retrieveInitialData(this.flux);
    this.refs.initFocus.getDOMNode().focus();
  },

  render() {
    let error = this.state.errorCode;

    // Assign the correct class names based on whether there's an error or not
    let classes = {
      email: classNames('authentication__input', {
        'authentication__input--error': error === errors.NO_EMAIL ||
                                        error === errors.INVALID_EMAIL,
      }),
    };

    return (
      <div>
        <div className="authentication__title">Reset your password</div>
        <If condition={error && error !== success.LOGGED_IN &&
            !this.state.resetInProgress}>
          <div className="authentication__error">
            <FontAwesome className="authentication__error-icon" name="exclamation-circle" size="lg" />
            {this.getErrorMessage(error)}
          </div>
        </If>
        <p className="authentication__text">
          Enter the email address you used to sign up for PianoShelf, and we will email you
          a link to reset your password.
        </p>
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <input className="authentication__input"
              type="text"
              ref="initFocus"
              placeholder="Email"
              valueLink={this.linkState('email')} />
          </div>
          <button className="authentication__button authentication__button--reset-password"
            type="submit"
            disabled={this.state.resetInProgress}>
            <If condition={this.state.resetInProgress}>
              <FontAwesome name="cog" spin={true} />
            <Else />
              <span>
                <FontAwesome className="authentication__button-icon" name="paper-plane" />
                Reset password
              </span>
            </If>
          </button>
        </form>
        <Link to="/login" className="authentication__link">I want to log in</Link>
      </div>
    );
  },

  handleSubmit_(event) {
    event.preventDefault();

    let { email } = this.state;

    // Trigger action
    let loginActions = this.flux.getActions('login');
    loginActions.resetPassword(email, this.flux);
  },

});

