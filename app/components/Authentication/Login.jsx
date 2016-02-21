
import FontAwesome from 'react-fontawesome';
import includes from 'lodash/collection/includes';
import Helmet from 'react-helmet';
import React from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import Button from './utils/Button';
import canLogin from '../../decorators/canLogin';
import canFacebookLogin from '../../decorators/canFacebookLogin';
import ErrorMessage from './utils/ErrorMessage';
import Input from './utils/Input';
import Title from './utils/Title';
import { dispatchAndPromise } from '../../utils/reduxUtils';
import { login, facebookLogin } from '../../actions/login';
import { errors } from '../../utils/constants';

export const fieldNames = [
  'username',
  'password',
];

@reduxForm(
  { form: 'login', fields: fieldNames },
  state => ({
    errorCode: state.login.code,
    inProgress: state.progress.inProgress,
  })
)
@canFacebookLogin
@canLogin
export default class Login extends React.Component {
  /**
   * PropTypes
   */
  static propTypes = {
    errorCode: React.PropTypes.number.isRequired,
    inProgress: React.PropTypes.array.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  /**
   * Handlers
   */
  handleLogin = (values, dispatch) => {
    const { username, password } = values;
    return dispatchAndPromise(dispatch, [
      login(username, password),
    ]);
  };

  handleFacebookRegister = (values, dispatch) => {
    return this.facebookLogin().then(response => {
      if (response.status === 'connected') {
        const { accessToken } = response;
        return dispatchAndPromise(dispatch, [
          facebookLogin({ accessToken }),
        ]);
      }
    });
  };

  /**
   * Render method
   */
  render() {
    const { fields, inProgress, errorCode, handleSubmit } = this.props;
    const loginInProgress = includes(inProgress, 'login');
    const facebookInProgress = includes(inProgress, 'facebookLogin');

    return (
      <div>
        <Helmet title="Log in" />
        <Title>Log in to PianoShelf</Title>
        <ErrorMessage errorCode={errorCode}
          dontDisplayIf={loginInProgress || facebookInProgress}
        />
        <form className="authentication__form" onSubmit={handleSubmit(this.handleLogin)}>
          <div className="authentication__inputs">
            <Input placeholder="Username"
              name="username"
              errorCode={errorCode}
              errorWhen={[errors.NO_USERNAME]}
              focusOnLoad
              field={fields.username}
            />
            <Input placeholder="Password"
              name="password"
              password
              errorCode={errorCode}
              errorWhen={[errors.NO_PASSWORD]}
              field={fields.password}
            />
          </div>
          <Button color="orange" submittedIf={loginInProgress}
            disableIf={loginInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="sign-in" />
            Log in
          </Button>
        </form>
        <Link to="/login/forgot" className="authentication__link">I forgot my password</Link>
        <hr className="authentication__hr" />
        <form onSubmit={handleSubmit(this.handleFacebook)}>
          <Button color="facebook" submittedIf={facebookInProgress}
            disableIf={loginInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="facebook-square" />
            Sign in using Facebook
          </Button>
        </form>
      </div>
    );
  }
}
