/**
 * Class for the top nav bar.
 */

// Import external modules
import classNames from 'classnames';
import fluxMixin from 'flummox/mixin';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

// Import internal module
import ResponsiveContainer from './ResponsiveContainer';

// Get mixins
let PureRenderMixin = addons.PureRenderMixin;

// Export class
export default React.createClass({

  mixins: [
    PureRenderMixin,
    fluxMixin({
      login: store => ({
        loggedIn: store.state.loggedIn,
        user: store.state.user,
      }),
    }),
  ],

  propTypes: {
    // Whether we're on the homepage.
    homepage: React.PropTypes.bool,

    // The maximum YOffset at which we should pretend this.props.homepage is false.
    yOffsetLimit: React.PropTypes.number,
  },

  getInitialState() {
    return {
      homepageMode: this.props.homepage,
    };
  },

  componentDidMount() {
    if (this.props.homepage) {
      this.handleStickyEvent();
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
      return (
        <div>
          <div className="navbar__title navbar__title--homepage">PianoShelf</div>
          <div className="navbar__title-beta navbar__title-beta--homepage">BETA</div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="navbar__title">PianoShelf</div>
          <div className="navbar__title-beta">BETA</div>
        </div>
      );
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
        <Link to="/" className="navbar__logo" />
        <div className="navbar__logo-buffer" />
        {this.renderTitle_()}
        <If condition={this.state.loggedIn}>
          <div>
            <Link to="/logout" className={buttonClass(false /* important */)}>Logout</Link>
          </div>
        <Else />
          <div>
            <Link to="/register" className={buttonClass(true /* important */)}>Sign Up</Link>
            <Link to="/login" className={buttonClass(false /* important */)}>Log In</Link>
          </div>
        </If>
      </ResponsiveContainer>
    );
  },

  handleStickyEvent() {
    let homepageMode = this.props.homepage &&
      window.pageYOffset < this.props.yOffsetLimit;
    this.setState({ homepageMode });
  },

});
