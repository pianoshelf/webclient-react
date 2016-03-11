
import Helmet from 'react-helmet';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';

import InfoText from './utils/InfoText';
import { clearErrors, logout } from '../../actions/login';
import { deleteAuthToken } from '../../utils/authUtils';

@asyncConnect({
  promise: (params, { store }) => store.dispatch(clearErrors()),
})
@connect(
  state => ({
    loggedIn: state.login.loggedIn,
  }),
  { logout }
)
export default class Logout extends React.Component {
  static propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    location: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  /**
   * Component Lifecycle
   */

  // When the user loads this component, log them out, else handle post-logout tasks.
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.logout();
    } else {
      this.handlePostLogout();
    }
  }

  // When user is logged out, handle post-logout tasks.
  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn && !this.props.loggedIn) {
      this.handlePostLogout();
    }
  }

  /**
   * Handlers
   */
  handlePostLogout = () => {
    // Delete authorization token cookie
    const { router } = this.context;
    const { location } = this.props;
    deleteAuthToken();

    if (location.query && location.query.redirect) {
      router.push(location.query.redirect);
    } else {
      router.push('/');
    }
  };

  /**
   * Render method
   */
  render() {
    return (
      <div>
        <Helmet title="Logging out..." />
        <InfoText>
          You are now being logged out...
        </InfoText>
      </div>
    );
  }
}
