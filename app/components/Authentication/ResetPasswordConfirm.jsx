
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import includes from 'lodash/includes';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import Button from './utils/Button';
import ErrorMessage from './utils/ErrorMessage';
import InfoText from './utils/InfoText';
import Input from '../Misc/Input';
import Title from './utils/Title';
import { clearErrors, resetPasswordConfirm } from '../../actions/login';
import { createEventTracker } from '../../utils/analytics';
import { errors, success } from '../../utils/constants';
import { isDispatchedActionError } from '../../utils/actionUtils';

const trackEvent = createEventTracker('ResetPasswordConfirm');

export const FIELD_NAMES = [
  'password1',
  'password2',
];

@asyncConnect({
  promise: (params, { store }) => store.dispatch(clearErrors()),
})
@reduxForm(
  {
    form: 'resetPasswordConfirm',
    fields: FIELD_NAMES,
    initialValues: {
      password1: '',
      password2: '',
    },
  },
  state => ({
    errorCode: state.login.code,
    inProgress: state.progress.inProgress,
  })
)
export default class ResetPasswordConfirm extends React.Component {
  static propTypes = {
    errorCode: React.PropTypes.number.isRequired,
    inProgress: React.PropTypes.array.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired,
  };

  handleResetPasswordConfirm = (values, dispatch) => {
    const { password1, password2 } = values;
    const { token, uid } = this.props.params;
    const user = { password1, password2 };
    dispatch(resetPasswordConfirm(user, uid, token)).then(action => {
      if (isDispatchedActionError(action)) {
        trackEvent('error', 'Reset Password Confirm Error');
      } else {
        trackEvent('submit', 'Reset Password Confirm Success');
      }
    });
  };

  render() {
    const { fields, inProgress, errorCode, handleSubmit } = this.props;
    const resetInProgress = includes(inProgress, 'resetPasswordConfirm');

    return (
      <div>
        <Helmet title="Reset Password" />
        <Title>Reset your password</Title>
        <ErrorMessage errorCode={errorCode} dontDisplayIf={resetInProgress} />
        <If condition={errorCode === success.PASSWORD_CONFIRM_RESET}>
          <div>
            <InfoText>
              Click <Link to="/login/">here</Link> to go to the log in page.
            </InfoText>
          </div>
        <Else />
          <div>
            <InfoText>
              Enter a new password to reset your password.
            </InfoText>
            <form
              className="authentication__form"
              onSubmit={handleSubmit(this.handleResetPasswordConfirm)}
            >
              <div className="authentication__inputs">
                <Input
                  placeholder="New Password"
                  name="password1"
                  type="password"
                  errorWhen={errorCode === errors.NO_PASSWORD ||
                    errorCode === errors.NOT_STRONG_PASSWORD}
                  focusOnLoad
                  className="authentication__input"
                  {...fields.password1}
                />
                <Input
                  placeholder="Confirm New Password"
                  name="password2"
                  type="password"
                  errorWhen={errorCode === errors.NOT_SAME_PASSWORD}
                  className="authentication__input"
                  {...fields.password2}
                />
              </div>
              <Button color="red" disableIf={resetInProgress} submittedIf={resetInProgress}>
                <FontAwesome className="authentication__button-icon" name="paper-plane" />
                Reset password
              </Button>
            </form>
          </div>
        </If>
      </div>
    );
  }
}
