
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import includes from 'lodash/collection/includes';
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
import { errors } from '../../utils/constants';
import { register, facebookLogin } from '../../actions/login';

export const fieldNames = [
  'username',
  'email',
  'password1',
  'password2',
];

@reduxForm(
  { form: 'register', fields: fieldNames },
  state => ({
    errorCode: state.login.code,
    inProgress: state.progress.inProgress,
  })
)
@canFacebookLogin
@canLogin
export default class Register extends React.Component {
  static propTypes = {
    errorCode: React.PropTypes.number.isRequired,
    inProgress: React.PropTypes.array.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  /**
   * Handlers
   */
  handleRegister = (values, dispatch) => {
    const { username, email, password1, password2 } = values;
    const newUser = { username, email, password1, password2 };
    return dispatchAndPromise(dispatch, [
      register(newUser),
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
    const registerInProgress = includes(inProgress, 'register') ||
                               includes(inProgress, 'login');
    const facebookInProgress = includes(inProgress, 'facebookLogin');

    return (
      <div>
        <Helmet title="Register" />
        <Title>Sign up for PianoShelf</Title>
        <ErrorMessage errorCode={errorCode}
          dontDisplayIf={registerInProgress || facebookInProgress}
        />
        <form
          className="authentication__form"
          onSubmit={handleSubmit(this.handleRegister)}
        >
          <div className="authentication__inputs">
            <Input placeholder="Username"
              name="username"
              errorCode={errorCode}
              errorWhen={[errors.NO_USERNAME, errors.USERNAME_TAKEN]}
              focusOnLoad
              field={fields.username}
            />
            <Input placeholder="Email"
              name="email"
              errorCode={errorCode}
              errorWhen={[errors.NO_EMAIL, errors.INVALID_EMAIL, errors.EMAIL_ALREADY_REGISTERED]}
              field={fields.email}
            />
            <Input placeholder="Password"
              name="password1"
              password
              errorCode={errorCode}
              errorWhen={[errors.NO_PASSWORD, errors.NOT_STRONG_PASSWORD]}
              field={fields.password1}
            />
            <Input placeholder="Confirm Password"
              name="password2"
              password
              errorCode={errorCode}
              errorWhen={[errors.NOT_SAME_PASSWORD]}
              field={fields.password2}
            />
          </div>
          <Button color="blue-light" submittedIf={registerInProgress}
            disableIf={registerInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="star" />
            Sign up
          </Button>
        </form>
        <Link to="/login" className="authentication__link">I have an account</Link>
        <hr className="authentication__hr" />
        <form
          onSubmit={handleSubmit(this.handleFacebook)}
        >
          <Button color="facebook" submittedIf={facebookInProgress}
            disableIf={registerInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="facebook-square" />
            Sign up using Facebook
          </Button>
        </form>
      </div>
    );
  }
}
