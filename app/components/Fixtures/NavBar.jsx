/**
 * Class for the top nav bar.
 */

// Import external modules
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Import internal module
import ResponsiveContainer from '../Misc/ResponsiveContainer';

@connect(
  state => ({
    loggedIn: state.login.loggedIn,
    user: state.login.user,
    isLoaded: state.reduxAsyncConnect.loaded,
  }),
)
export default class NavBar extends React.Component {
  static propTypes = {
    disappearing: React.PropTypes.bool,
    disappearingOffset: React.PropTypes.number,
    loggedIn: React.PropTypes.bool.isRequired,
    isLoaded: React.PropTypes.bool,
  };

  state = {
    disappearingMode: this.props.disappearing,
  };

  componentDidMount() {
    if (this.props.disappearing) {
      this.handleStickyEvent();
      window.addEventListener('load', this.handleStickyEvent);
      window.addEventListener('scroll', this.handleStickyEvent);
      window.addEventListener('resize', this.handleStickyEvent);
    }
  }

  componentWillUnmount() {
    if (this.props.disappearing) {
      window.removeEventListener('load', this.handleStickyEvent);
      window.removeEventListener('scroll', this.handleStickyEvent);
      window.removeEventListener('resize', this.handleStickyEvent);
    }
  }

  getButtonClass = options => {
    const {
      important = false,
    } = options || {};
    return classNames('navbar__button', {
      'navbar__button--homepage': this.state.disappearingMode,
      'navbar__button--important': important,
    });
  };

  handleStickyEvent = () => {
    const disappearingMode = this.props.disappearing &&
      window.pageYOffset < this.props.disappearingOffset;
    this.setState({ disappearingMode });
  };

  renderTitle() {
    if (this.state.disappearingMode) {
      return (
        <div>
          <div className="navbar__title navbar__title--homepage">pianoshelf</div>
        </div>
      );
    }
    return (
      <div>
        <div className="navbar__title">pianoshelf</div>
      </div>
    );
  }

  renderLoggedInWidgets() {
    return (
      <div className="navbar__component-container">
        <Link to="/logout" className={this.getButtonClass()}>Logout</Link>
      </div>
    );
  }

  renderLoggedOutWidgets() {
    return (
      <div className="navbar__component-container">
        <Link to="/browse" className={this.getButtonClass()}>Browse</Link>
        <Link to="/login" className={this.getButtonClass()}>Log In</Link>
        <Link to="/register" className={this.getButtonClass({ important: true })}>Sign Up</Link>
      </div>
    );
  }

  render() {
    const navbarClass = classNames('navbar', {
      'navbar--homepage': this.state.disappearingMode,
    });

    const logoClass = classNames('navbar__logo', {
      'navbar__logo--loading': !this.props.isLoaded,
    });

    return (
      <ResponsiveContainer className={navbarClass}>
        <Link to="/" className={logoClass} />
        <div className="navbar__logo-buffer" />
        {this.renderTitle()}
        <If condition={this.props.loggedIn}>
          {this.renderLoggedInWidgets()}
        <Else />
          {this.renderLoggedOutWidgets()}
        </If>
      </ResponsiveContainer>
    );
  }
}
