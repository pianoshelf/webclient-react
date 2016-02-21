
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
import { dispatchAndPromise } from '../../utils/reduxUtils';
import { errors } from '../../utils/constants';
import { resetPassword } from '../../actions/login';

export const fieldNames = [
  'email',
];

@reduxForm(
  { form: 'resetPassword', fields: fieldNames },
  state => ({
    errorCode: state.login.code,
    inProgress: state.progress.inProgress,
  })
)
export default class ResetPassword extends React.Component {
  static propTypes = {
    errorCode: React.PropTypes.number.isRequired,
    inProgress: React.PropTypes.array.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  handleResetPassword = (values, dispatch) => {
    const { email } = values;
    return dispatchAndPromise(dispatch, [
      resetPassword(email),
    ]);
  };

  render() {
    const { fields, inProgress, errorCode, handleSubmit } = this.props;
    const resetInProgress = includes(inProgress, 'resetPassword');

    return (
      <div>
        <Helmet title="Reset Password" />
        <Title>Reset your password</Title>
        <ErrorMessage errorCode={errorCode} dontDisplayIf={resetInProgress} />
        <InfoText>
          Enter the email address you used to sign up for PianoShelf, and we will email you
          a link to reset your password.
        </InfoText>
        <form className="authentication__form" onSubmit={handleSubmit(this.handleResetPassword)}>
          <div className="authentication__inputs">
            <Input placeholder="Email"
              name="email"
              errorCode={errorCode}
              errorWhen={[errors.NO_EMAIL, errors.INVALID_EMAIL]}
              focusOnLoad
              field={fields.email}
            />
          </div>
          <Button color="red" disableIf={resetInProgress} submittedIf={resetInProgress}>
            <FontAwesome className="authentication__button-icon" name="paper-plane" />
            Reset password
          </Button>
        </form>
        <Link to="/login" className="authentication__link">I want to log in</Link>
      </div>
    );
  }
}
