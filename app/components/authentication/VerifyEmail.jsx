
import fluxMixin from 'flummox/mixin';
import React from 'react';
import { addons } from 'react/addons';

import InfoText from './utils/InfoText';

let { PureRenderMixin } = addons;

function retrieveInitialData(flux, state) {
  const loginActions = flux.getActions('login');
}

export default React.createClass({

  mixins: [
    PureRenderMixin,
    fluxMixin({
      login: store => store.state,
      progress: store => store.state,
    }),
  ],

  statics: {
    routeWillRun({ flux, state }) {
      return retrieveInitialData(flux, state);
    },
  },

  propTypes: {
    params: React.PropTypes.object,
  },

  componentDidMount() {
    let loginActions = this.flux.getActions('login');
    loginActions.verifyEmail(this.props.params.key, this.flux);
  },

  render() {
    return (
      <div>
        <InfoText>
          Verifying your email...
        </InfoText>
      </div>
    );
  },

});
