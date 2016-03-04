
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import includes from 'lodash/includes';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import Button from './utils/Button';
import loadFacebook from '../../decorators/loadFacebook';
import ErrorMessage from './utils/ErrorMessage';
import Input from '../Misc/Input';
import Title from './utils/Title';
import { clearErrors, register, facebookLogin } from '../../actions/login';
import { errors, success } from '../../utils/constants';
import { setAuthToken } from '../../utils/api';

export const fieldNames = [
  'username',
  'email',
  'password1',
  'password2',
];

@asyncConnect({
  promise: (params, { store }) => store.dispatch(clearErrors()),
})
@reduxForm(
  {
    form: 'register',
    fields: fieldNames,
    initialValues: {
      username: '',
      email: '',
      password1: '',
      password2: '',
    },
  },
  state => ({
    errorCode: state.login.code,
    inProgress: state.progress.inProgress,
    loggedIn: state.login.loggedIn,
    user: state.login.user,
  })
)
@loadFacebook
export default class Register extends React.Component {
  static propTypes = {
    errorCode: React.PropTypes.number.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    inProgress: React.PropTypes.array.isRequired,
    location: React.PropTypes.object.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  };

  /**
   * Component Lifecycle
   */

  // If the user is already logged in, handle post-login tasks
  componentDidMount() {
    if (this.props.loggedIn) {
      this.handlePostRegister();
    }
  }

  // If the user logs in, handle post-login tasks
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.handlePostRegister();
    }
  }

  /**
   * Handlers
   */
  handlePostRegister = () => {
    // Set authorization token
    const { router, store } = this.context;
    const { user, location } = this.props;
    setAuthToken(user.authToken, store);

    if (location.query && location.query.redirect) {
      router.push(location.query.redirect);
    } else {
      router.push('/');
    }
  };

  registerUser = (values, dispatch) => {
    const { username, email, password1, password2 } = values;
    const newUser = { username, email, password1, password2 };
    return dispatch(register(newUser));
  };

  registerUserOnFacebook = (values, dispatch) => {
    this.facebookLogin().then(response => {
      if (response.status === 'connected') {
        const { accessToken } = response;
        dispatch(facebookLogin({ accessToken }));
      }
    });
  };

  /**
   * Render method
   */
  render() {
    const { fields, inProgress, errorCode, handleSubmit } = this.props;
    const registerInProgress = includes(inProgress, 'register') || includes(inProgress, 'login');
    const facebookInProgress = includes(inProgress, 'facebookLogin');

    return (
      <div>
        <Helmet title="Register" />
        <Title>Sign up for Pianoshelf</Title>
        <ErrorMessage
          errorCode={errorCode}
          dontDisplayIf={registerInProgress || facebookInProgress ||
            errorCode === success.REGISTERED || errorCode === success.LOGGED_IN}
        />
        <form
          className="authentication__form"
          onSubmit={handleSubmit(this.registerUser)}
        >
          <div className="authentication__inputs">
            <Input
              placeholder="Username"
              name="username"
              errorWhen={errorCode === errors.NO_USERNAME || errorCode === errors.USERNAME_TAKEN}
              focusOnLoad
              {...fields.username}
            />
            <Input
              placeholder="Email"
              name="email"
              errorWhen={errorCode === errors.NO_EMAIL || errorCode === errors.INVALID_EMAIL ||
                errorCode === errors.EMAIL_ALREADY_REGISTERED}
              {...fields.email}
            />
            <Input
              placeholder="Password"
              name="password1"
              type="password"
              errorWhen={errorCode === errors.NO_PASSWORD ||
                errorCode === errors.NOT_STRONG_PASSWORD}
              {...fields.password1}
            />
            <Input
              placeholder="Confirm Password"
              name="password2"
              type="password"
              errorWhen={errorCode === errors.NOT_SAME_PASSWORD}
              {...fields.password2}
            />
          </div>
          <Button
            color="blue-light"
            submittedIf={registerInProgress}
            disableIf={registerInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="star" />
            Sign up
          </Button>
        </form>
        <Link to="/login" className="authentication__link">I have an account</Link>
        <hr className="authentication__hr" />
        <form
          onSubmit={handleSubmit(this.registerUserOnFacebook)}
        >
          <Button
            color="facebook"
            submittedIf={facebookInProgress}
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
