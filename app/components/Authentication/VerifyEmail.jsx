
import fluxMixin from 'flummox/mixin';
import Helmet from 'react-helmet';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import { Link } from 'react-router';

import InfoText from './utils/InfoText';

import { errors, success } from '../../utils/constants';

function retrieveInitialData(flux, params) {
  const loginActions = flux.getActions('login');
  return loginActions.verifyEmail(params.key, flux);
}

export default React.createClass({

  propTypes: {
    params: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
    fluxMixin({
      login: store => store.state,
      progress: store => store.state,
    }),
  ],

  statics: {
    routeWillRun({ flux, state }) {
      return retrieveInitialData(flux, state.params);
    },
  },

  componentDidMount() {
    retrieveInitialData(this.flux, this.props.params);
  },

  render() {
    return (
      <div>
        <Helmet title="Verify Email" />
        <If condition={this.state.errorCode === success.EMAIL_VERIFIED}>
          <InfoText>
            Your email has been verified. Click <Link to="/">here</Link> to go to the homepage.
          </InfoText>
        <Else />
          <If condition={this.state.errorCode === errors.EMAIL_UNVERIFIED}>
            <InfoText>
              Sorry, your email cannot be verified. This link has either expired or is invalid.
            </InfoText>
          <Else />
            <InfoText>
              Verifying your email...
            </InfoText>
          </If>
        </If>
      </div>
    );
  },

});
