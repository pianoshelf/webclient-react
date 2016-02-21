
import Helmet from 'react-helmet';
import React from 'react';
import { connect } from 'react-redux';

import InfoText from './utils/InfoText';
import canLogout from '../../decorators/canLogout';
import { logout } from '../../actions/login';

@connect(
  state => ({
    loggedIn: state.login.loggedIn,
  }),
)
@canLogout
export default class Logout extends React.Component {
  static propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    store: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.loggedIn) this.props.store.dispatch(logout());
  }

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
