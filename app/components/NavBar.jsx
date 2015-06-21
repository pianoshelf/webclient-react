/**
 * Class for the top nav bar.
 */

// Import external modules
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router';

// Import internal module
import ResponsiveContainer from 'app/components/ResponsiveContainer';

export default React.createClass({

  render() {
    let navbarClass = classNames('navbar', {
      'navbar--homepage': this.props.homepage,
    });

    return (
      <ResponsiveContainer className={navbarClass}>
        <Link className="navbar__logo" to="home" />
        {/*
        <div className="navbar__title">PianoShelf</div>
        <div className="navbar__title--beta">BETA</div>
        */}
        <Link to="register" className="navbar__button navbar__button--important">Sign Up</Link>
        <Link to="login" className="navbar__button">Log In</Link>
      </ResponsiveContainer>
    );
  },
});
