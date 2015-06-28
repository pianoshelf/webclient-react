
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default React.createClass({

  handleSubmit(event) {
    return true;
  },

  render() {
    return (
      <div>
        <div className="authentication__title">Sign up for PianoShelf</div>
        <form className="authentication__form" onSubmit={this.handleSubmit}>
          <input className="authentication__input" type="text" name="username" placeholder="Username" />
          <input className="authentication__input" type="text" name="email" placeholder="Email" />
          <input className="authentication__input" type="password" name="password1" placeholder="Password" />
          <input className="authentication__input" type="password" name="password2" placeholder="Confirm Password" />
          <button className="authentication__button authentication__button--register" type="submit">
            <FontAwesome className="authentication__button-icon" name="star" />
            Sign up
          </button>
        </form>
        <hr className="authentication__hr" />
        <button className="authentication__button authentication__button--facebook" >
          <FontAwesome className="authentication__button-icon" name="facebook-square" />
          Sign up using Facebook
        </button>
      </div>
    );
  },

});

