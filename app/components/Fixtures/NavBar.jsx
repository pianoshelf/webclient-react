/**
 * Class for the top nav bar.
 */

// Import external modules
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import withState from 'recompose/withState';
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
@withState('showMenu', 'setMenuVisibility', false)
export default class NavBar extends React.Component {
  static propTypes = {
    transparent: React.PropTypes.bool,
    loggedIn: React.PropTypes.bool.isRequired,
    isLoaded: React.PropTypes.bool,
    user: React.PropTypes.object,
    showMenu: React.PropTypes.bool.isRequired,
    setMenuVisibility: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    transparent: false,
  };

  componentDidMount() {
    window.addEventListener('click', this.handleHideMenu);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleHideMenu);
  }

  getButtonClass = options => {
    const {
      important = false,
    } = options || {};
    return classNames('navbar__button', {
      'navbar__button--transparent': this.props.transparent,
      'navbar__button--important': important,
    });
  };

  handleHideMenu = () => {
    this.props.setMenuVisibility(() => false);
  };

  handleToggleMenu = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.setMenuVisibility(value => !value);
  };

  renderTitle() {
    if (this.props.transparent) {
      return (
        <div>
          <div className="navbar__title navbar__title--transparent">pianoshelf</div>
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
    const { username, firstName, lastName } = this.props.user;
    // TODO: Remove this!!!!!
    const avatar = 'http://www.pethealthnetwork.com/sites/default/files/8-common-myths-about-' +
      'surgery-and-cats-483673863.jpg';
    return (
      <div className="navbar__component-container">
        <Link to="/browse" className={this.getButtonClass()}>
          Browse
        </Link>
        <Link to="/upload" className={this.getButtonClass({ important: true })}>
          Upload
        </Link>
        <div className="navbar__user-widget">
          <a href="#" className="navbar__user-widget-link" onClick={this.handleToggleMenu}>
            <img src={avatar} className="navbar__user-text-avatar" />
            <span href="#profile" className="navbar__user-text">
              <If condition={firstName === '' || lastName === ''}>
                {username}
              <Else />
                {`${firstName} ${lastName}`}
              </If>
            </span>
            <FontAwesome className="navbar__user-text-down-arrow" name="chevron-down" />
          </a>
          <If condition={this.props.showMenu}>
            <ul className="navbar__user-widget-list">
              <li className="navbar__user-widget-list-item">
                <Link className="navbar__user-widget-list-item-link" to={`/user/${username}`}>
                  View Profile
                </Link>
              </li>
              <li className="navbar__user-widget-list-item">
                <Link className="navbar__user-widget-list-item-link" to="/logout">
                  <FontAwesome className="navbar__user-widget-list-icon" name="sign-out" />
                  Logout
                </Link>
              </li>
            </ul>
          </If>
        </div>
      </div>
    );
  }

  renderLoggedOutWidgets() {
    return (
      <div className="navbar__component-container">
        <Link to="/browse" className={this.getButtonClass()}>
          Browse
        </Link>
        <Link to="/login" className={this.getButtonClass()}>
          Log In
        </Link>
        <Link to="/register" className={this.getButtonClass({ important: true })}>
          Sign Up
        </Link>
      </div>
    );
  }

  render() {
    const navbarClass = classNames('navbar', {
      'navbar--transparent': this.props.transparent,
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
