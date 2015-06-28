
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
          <button className="authentication__button authentication__button--register" type="submit">
            <FontAwesome className="authentication__button-icon" name="star" />
            Sign up
          </button>
        </form>
        <Link className="authentication__link" to="login">I have an account</Link>
        <hr className="authentication__hr" />
        <button className="authentication__button authentication__button--facebook" onClick={this.handleFacebook_}>
          <FontAwesome className="authentication__button-icon" name="facebook-square" />
          Sign up using Facebook
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

