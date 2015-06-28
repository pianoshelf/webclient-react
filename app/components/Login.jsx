
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({

  handleSubmit(event) {
    return true;
  },

  render() {
    return (
      <div>
        <div className="authentication__title">Log in to PianoShelf</div>
        <form className="authentication__form" onSubmit={this.handleSubmit}>
          <input className="authentication__input" type="text" name="username" placeholder="Username" />
          <input className="authentication__input" type="password" name="password" placeholder="Password" />
          <button className="authentication__button authentication__button--login" type="submit">
            <FontAwesome className="authentication__button-icon" name="sign-in" />
            Log in
          </button>
        </form>
        <Link className="authentication__link" to="forgot-password">I forgot my password</Link>
        <hr className="authentication__hr" />
        <button className="authentication__button authentication__button--facebook" >
          <FontAwesome className="authentication__button-icon" name="facebook-square" />
          Sign in using Facebook
        </button>
      </div>
    );
  },

});

