/**
 * Class for the top nav bar.
 */

// Import external modules
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({

  render() {
    return (
      <div className="navbar">
        <div className="navbar__container">
          <Link className="navbar__logo" to="home" />
          {/*
          <div className="navbar__title">PianoShelf</div>
          <div className="navbar__title--beta">BETA</div>
          */}
          <Link to="register" className="navbar__button navbar__button--important">Sign Up</Link>
          <Link to="login" className="navbar__button">Log In</Link>
        </div>
      </div>
    );
  },
});
