
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import includes from 'lodash/collection/includes';
import React from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import Button from './utils/Button';
import ErrorMessage from './utils/ErrorMessage';
import InfoText from './utils/InfoText';
import Input from './utils/Input';
import Title from './utils/Title';
import { errors, success } from '../../utils/constants';
import { resetPasswordConfirm } from '../../actions/login';

export const fieldNames = [
  'password1',
  'password2',
];

@reduxForm(
  {
    form: 'resetPasswordConfirm',
    fields: fieldNames,
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
    dispatch(resetPasswordConfirm(user, uid, token));
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
                  {...fields.password1}
                />
                <Input
                  placeholder="Confirm New Password"
                  name="password2"
                  type="password"
                  errorWhen={errorCode === errors.NOT_SAME_PASSWORD}
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
