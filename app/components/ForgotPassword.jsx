

import FontAwesome from 'react-fontawesome';
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({

  componentDidMount() {
    this.refs.email.getDOMNode().focus();
  },

  render() {
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
          <button className="authentication__button authentication__button--reset-password" type="submit">
            <FontAwesome className="authentication__button-icon" name="paper-plane" />
            Reset password
          </button>
        </form>
        <Link className="authentication__link" to="login">I want to log in</Link>
      </div>
    );
  },

  handleSubmit_(event) {
    return true;
  }

});

