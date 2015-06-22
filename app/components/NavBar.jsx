/**
 * Class for the top nav bar.
 */

// Import external modules
import classNames from 'classnames';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

// Import internal module
import ResponsiveContainer from 'app/components/ResponsiveContainer';

// Get mixins
let PureRenderMixin = addons.PureRenderMixin;

// Export class
export default React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    // Whether we're on the homepage.
    homepage: React.PropTypes.bool,

    // The maximum YOffset at which we should pretend this.props.homepage is false.
    yOffsetLimit: React.PropTypes.number,
  },

  getInitialState() {
    return {
      homepageMode: this.props.homepage, // Make sure we initialize the state to the props.
    };
  },

  componentDidMount() {
    if (this.props.homepage) {
      window.addEventListener('load', this.handleStickyEvent);
      window.addEventListener('scroll', this.handleStickyEvent);
      window.addEventListener('resize', this.handleStickyEvent);
    }
  },

  componentWillUnmount() {
    if (this.props.homepage) {
      window.removeEventListener('load', this.handleStickyEvent);
      window.removeEventListener('scroll', this.handleStickyEvent);
      window.removeEventListener('resize', this.handleStickyEvent);
    }
  },

  renderTitle_() {
    if (this.state.homepageMode) {
      return <div>
        <div className="navbar__title navbar__title--homepage">PianoShelf</div>
        <div className="navbar__title-beta navbar__title-beta--homepage">BETA</div>
      </div>;
    } else {
      return <div>
        <div className="navbar__title">PianoShelf</div>
        <div className="navbar__title-beta">BETA</div>
      </div>;
    }
  },

  render() {
    let navbarClass = classNames('navbar', {
      'navbar--homepage': this.state.homepageMode,
    });

    let buttonClass = (important) => classNames('navbar__button', {
      'navbar__button--homepage': this.state.homepageMode,
      'navbar__button--important': important,
    });

    return (
      <ResponsiveContainer className={navbarClass}>
        <Link className="navbar__logo" to="home" />
        <div className="navbar__logo-buffer" />
        {this.renderTitle_()}
        <Link to="register" className={buttonClass(true /* important */)}>Sign Up</Link>
        <Link to="login" className={buttonClass(false /* important */)}>Log In</Link>
      </ResponsiveContainer>
    );
  },

  handleStickyEvent() {
    window.requestAnimationFrame(() => {
      let windowOffset = window.pageYOffset;
      let homepageMode = this.props.homepage && windowOffset < this.props.yOffsetLimit;
      this.setState({ homepageMode });
    });
  },

});
