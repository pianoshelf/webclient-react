
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import includes from 'lodash/collection/includes';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import Button from './utils/Button';
import loadFacebook from '../../decorators/loadFacebook';
import ErrorMessage from './utils/ErrorMessage';
import Input from '../Misc/Input';
import Title from './utils/Title';
import { clearErrors, login, facebookLogin } from '../../actions/login';
import { errors, success } from '../../utils/constants';
import { setAuthToken } from '../../utils/api';

export const fieldNames = [
  'username',
  'password',
];

@asyncConnect({
  promise: (params, { store }) => store.dispatch(clearErrors()),
})
@reduxForm(
  {
    form: 'login',
    fields: fieldNames,
    initialValues: { username: '', password: '' },
  },
  state => ({
    errorCode: state.login.code,
    inProgress: state.progress.inProgress,
    loggedIn: state.login.loggedIn,
    user: state.login.user,
  })
)
@loadFacebook
export default class Login extends React.Component {
  /**
   * PropTypes
   */
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
      this.handlePostLogin();
    }
  }

  // If the user logs in, handle post-login tasks
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.handlePostLogin();
    }
  }

  /**
   * Handlers
   */
  handlePostLogin = () => {
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

  logUserIn = (values, dispatch) => {
    const { username, password } = values;
    return dispatch(login(username, password));
  };

  logFacebookUserIn = (values, dispatch) => {
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
    const loginInProgress = includes(inProgress, 'login');
    const facebookInProgress = includes(inProgress, 'facebookLogin');

    return (
      <div>
        <Helmet title="Log in" />
        <Title>Log in to Pianoshelf</Title>
        <ErrorMessage
          errorCode={errorCode}
          dontDisplayIf={loginInProgress || facebookInProgress ||
            errorCode === success.LOGGED_IN}
        />
        <form className="authentication__form" onSubmit={handleSubmit(this.logUserIn)}>
          <div className="authentication__inputs">
            <Input
              errorWhen={errorCode === errors.NO_USERNAME}
              placeholder="Username"
              name="username"
              focusOnLoad
              {...fields.username}
            />
            <Input
              errorWhen={errorCode === errors.NO_PASSWORD}
              placeholder="Password"
              name="password"
              type="password"
              {...fields.password}
            />
          </div>
          <Button
            color="orange"
            submittedIf={loginInProgress}
            disableIf={loginInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="sign-in" />
            Log in
          </Button>
        </form>
        <Link to="/login/forgot" className="authentication__link">I forgot my password</Link>
        <hr className="authentication__hr" />
        <form onSubmit={handleSubmit(this.logFacebookUserIn)}>
          <Button
            color="facebook"
            submittedIf={facebookInProgress}
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
