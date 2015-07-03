
import classNames from 'classnames';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

// Pure render mixin
let { PureRenderMixin } = addons;

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
    this.refs.email.getDOMNode().focus();
  },

  render() {

    let resetButton = this.inProgress_('resetPassword') ? (
      <span>
        <FontAwesome name="cog" spin={true} />
      </span>
    ) : (
      <span>
        <FontAwesome className="authentication__button-icon" name="paper-plane" />
        Reset password
      </span>
    );

    return (
      <div className="forgot-password">
        <div className="authentication__title">Reset your password</div>
        <p className="authentication__text">
          Enter the email address you used to sign up for PianoShelf, and we will email you
          a link to reset your password.
        </p>
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <input className="authentication__input"
              type="text"
              ref="email"
              name="email"
              placeholder="Email" />
          </div>
          <button className="authentication__button authentication__button--reset-password"
            type="submit"
            disabled={this.inProgress_('resetPassword')}>
            {resetButton}
          </button>
        </form>
        <Link className="authentication__link" to="login">I want to log in</Link>
      </div>
    );
  },

  inProgress_(inProgress) {
    return this.state.inProgress === inProgress;
  },

  handleSubmit_(event) {
    event.preventDefault();

    // Set state to in progress.
    this.setState({ resetInProgress: true });

    return true;
  }

});

