
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
import { clearErrors, resetPassword } from '../../actions/login';
import { errors } from '../../utils/constants';

export const fieldNames = [
  'email',
];

@asyncConnect({
  promise: (params, { store }) => store.dispatch(clearErrors()),
})
@reduxForm(
  {
    form: 'resetPassword',
    fields: fieldNames,
    initialValues: { email: '' },
  },
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
    dispatch(resetPassword(email));
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
          Enter the email address you used to sign up for Pianoshelf, and we will email you
          a link to reset your password.
        </InfoText>
        <form className="authentication__form" onSubmit={handleSubmit(this.handleResetPassword)}>
          <div className="authentication__inputs">
            <Input
              placeholder="Email"
              name="email"
              errorWhen={errorCode === errors.NO_EMAIL || errorCode === errors.INVALID_EMAIL}
              focusOnLoad
              {...fields.email}
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
