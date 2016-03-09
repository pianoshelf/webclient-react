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
    isPageLoading: state.reduxAsyncConnect.promise.loading,
  }),
)
export default class NavBar extends React.Component {
  static propTypes = {
    disappearing: React.PropTypes.bool,
    disappearingOffset: React.PropTypes.number,
    loggedIn: React.PropTypes.bool.isRequired,
    isPageLoading: React.PropTypes.bool,
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

  render() {
    const navbarClass = classNames('navbar', {
      'navbar--homepage': this.state.disappearingMode,
    });

    const buttonClass = (important) => classNames('navbar__button', {
      'navbar__button--homepage': this.state.disappearingMode,
      'navbar__button--important': important,
    });

    const logoClass = classNames('navbar__logo', {
      'navbar__logo--loading': this.props.isPageLoading,
    });

    return (
      <ResponsiveContainer className={navbarClass}>
        <Link to="/" className={logoClass} />
        <div className="navbar__logo-buffer" />
        {this.renderTitle()}
        <If condition={this.props.loggedIn}>
          <div>
            <Link to="/logout" className={buttonClass(false /* important */)}>Logout</Link>
          </div>
        <Else />
          <div>
            <Link to="/register" className={buttonClass(true /* important */)}>Sign Up</Link>
            <Link to="/login" className={buttonClass(false /* important */)}>Log In</Link>
            <Link to="/browse" className={buttonClass(false /* important */)}>Browse</Link>
          </div>
        </If>
      </ResponsiveContainer>
    );
  }
}
