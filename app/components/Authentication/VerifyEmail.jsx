
import Helmet from 'react-helmet';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import InfoText from './utils/InfoText';
import { errors, success } from '../../utils/constants';
import { verifyEmail } from '../../actions/login';

@connect(
  state => ({
    errorCode: state.login.code,
    inProgress: state.progress.inProgress,
  }),
)
export default class VerifyEmail extends React.Component {
  static propTypes = {
    errorCode: React.PropTypes.number.isRequired,
    inProgress: React.PropTypes.array.isRequired,
    params: React.PropTypes.object,
    store: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.store.dispatch(verifyEmail(this.props.params.key));
  }

  render() {
    const { errorCode } = this.props;
    return (
      <div>
        <Helmet title="Verify Email" />
        <If condition={errorCode === success.EMAIL_VERIFIED}>
          <InfoText>
            Your email has been verified. Click <Link to="/">here</Link> to go to the homepage.
          </InfoText>
        <Else />
          <If condition={errorCode === errors.EMAIL_UNVERIFIED}>
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
  }
}
