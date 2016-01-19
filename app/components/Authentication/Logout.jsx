
import fluxMixin from 'flummox/mixin';
import Helmet from 'react-helmet';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import InfoText from './utils/InfoText';
import { CanLogoutMixin } from '../../utils/authUtils';

function retrieveInitialData(flux) {
  const loginActions = flux.getActions('login');
  return loginActions.logout(flux);
}

export default React.createClass({

  mixins: [
    PureRenderMixin,
    CanLogoutMixin,
    fluxMixin({
      login: store => store.state,
    }),
  ],

  statics: {
    routeWillRun({ flux }) {
      return retrieveInitialData(flux);
    },
  },

  componentDidMount() {
    if (this.state.loggedIn) retrieveInitialData(this.flux);
  },

  render() {
    return (
      <div>
        <Helmet title="Logging out..." />
        <InfoText>
          You are now being logged out...
        </InfoText>
      </div>
    );
  },

});

