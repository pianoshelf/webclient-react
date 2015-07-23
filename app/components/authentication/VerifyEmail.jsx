
import fluxMixin from 'flummox/mixin';
import Helmet from 'react-helmet';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

import InfoText from './utils/InfoText';

import { errors, success } from '../../utils/constants';

let { PureRenderMixin } = addons;

function retrieveInitialData(flux, params) {
  const loginActions = flux.getActions('login');
  return loginActions.verifyEmail(params.key, flux);
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
      return retrieveInitialData(flux, state.params);
    },
  },

  propTypes: {
    params: React.PropTypes.object,
  },

  componentDidMount() {
    retrieveInitialData(this.flux, this.props.params);
  },

  render() {
    return (
      <Helmet title="Verify Email">
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
      </Helmet>
    );
  },

});
