
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({

  componentDidMount() {
    this.refs.username.getDOMNode().focus();
  },

  render() {
    return (
      <div>
        <div className="authentication__title">Log in to PianoShelf</div>
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
          <button className="authentication__button authentication__button--login" type="submit">
            <FontAwesome className="authentication__button-icon" name="sign-in" />
            Log in
          </button>
        </form>
        <Link className="authentication__link" to="forgot-password">I forgot my password</Link>
        <hr className="authentication__hr" />
        <button className="authentication__button authentication__button--facebook" onClick={this.handleFacebook_}>
          <FontAwesome className="authentication__button-icon" name="facebook-square" />
          Sign in using Facebook
        </button>
      </div>
    );
  },

  handleSubmit_(event) {
    return true;
  },

  handleFacebook_(event) {
    return true;
  },

});

