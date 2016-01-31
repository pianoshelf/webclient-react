/**
 * Class for the top nav bar.
 */

// Import external modules
import classNames from 'classnames';
import fluxMixin from 'flummox/mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import { Link } from 'react-router';

// Import internal module
import ResponsiveContainer from '../Misc/ResponsiveContainer';

// Export class
export default React.createClass({

  propTypes: {
    /**
     * Whether the navbar dynamically disappears.
     */
    disappearing: React.PropTypes.bool,

    /**
     * The maximum YOffset at which we should pretend this.props.disappearing is false.
     */
    disappearingOffset: React.PropTypes.number,
  },

  mixins: [
    PureRenderMixin,
    fluxMixin({
      login: store => ({
        loggedIn: store.state.loggedIn,
        user: store.state.user,
      }),
    }),
  ],

  getInitialState() {
    return {
      disappearingMode: this.props.disappearing,
    };
  },

  componentDidMount() {
    if (this.props.disappearing) {
      this.handleStickyEvent_();
      window.addEventListener('load', this.handleStickyEvent_);
      window.addEventListener('scroll', this.handleStickyEvent_);
      window.addEventListener('resize', this.handleStickyEvent_);
    }
  },

  componentWillUnmount() {
    if (this.props.disappearing) {
      window.removeEventListener('load', this.handleStickyEvent_);
      window.removeEventListener('scroll', this.handleStickyEvent_);
      window.removeEventListener('resize', this.handleStickyEvent_);
    }
  },

  handleStickyEvent_() {
    const disappearingMode = this.props.disappearing &&
      window.pageYOffset < this.props.disappearingOffset;
    this.setState({ disappearingMode });
  },

  renderTitle_() {
    if (this.state.disappearingMode) {
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
    const navbarClass = classNames('navbar', {
      'navbar--homepage': this.state.disappearingMode,
    });

    const buttonClass = (important) => classNames('navbar__button', {
      'navbar__button--homepage': this.state.disappearingMode,
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

});
