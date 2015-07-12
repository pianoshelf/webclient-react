
import { Store } from 'flummox';
import { errors, success } from '../utils/constants';

export default class MessageStore extends Store {

  constructor(flux) {

    super();

    // TODO(ankit): Make this into something a little bit more straightforward.
    const loginActions = flux.getActions('login');
    let actions = [
      'login',
      'register',
      'resetPassword',
    ];

    // Register each action's success and failure handler
    actions.forEach(action => {
      this.registerAsync(loginActions[action],
        null,
        this[`${action}Success`] ? this[`${action}Success`] : null,
        this[`${action}Error`] ? this[`${action}Error`] : null);
    });

    this.register(loginActions.getUser, this.loginSuccess);
    this.register(loginActions.clearErrors, this.resetErrorCode);
    this.state = {};
  }

  /**
   * Method for resetting the error code.
   */
  resetErrorCode() {
    this.setState({ errorCode: 0, user: {} });
  }

  /**
   * LOGIN methods
   */

  loginSuccess(res) {
    let data = JSON.parse(res.text);

    // Set error code to success
    let errorCode = success.LOGGED_IN;

    // Extract user information
    let { auth_token, username, first_name, last_name, email, is_superuser } = data;
    let user = {
      authToken: auth_token,
      firstName: first_name,
      lastName: last_name,
      isSuperuser: is_superuser,
      username,
      email,
    };

    // Set the state
    this.setState({ errorCode, user });
  }

  loginError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    if (res.failedResponse) {
      errorCode = data.actionError;
    } else if (data.non_field_errors &&
        data.non_field_errors[0] === 'Unable to log in with provided credentials.') {
      errorCode = errors.UNABLE_TO_LOG_IN;
    }

    this.setState({ errorCode });
  }

  /**
   * LOGOUT methods
   */

  logoutSuccess(res) {

    this.setState({

    });
  }

  /**
   * REGISTER methods
   */

  registerError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    if (res.failedResponse) {
      errorCode = data.actionError;
    } else if (data.username && data.username[0] === 'This username is already taken. Please choose another.') {
      errorCode = errors.USERNAME_TAKEN;
    } else if (data.email && data.email[0] === 'A user is already registered with this e-mail address.') {
      errorCode = errors.EMAIL_ALREADY_REGISTERED;
    }

    this.setState({ errorCode });
  }

  /**
   * FACEBOOK methods
   */

  facebookLoginError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    this.setState({ errorCode });

  }

  /**
   * RESET PASSWORD methods
   */
  resetPasswordSuccess(res) {

  }

  resetPasswordError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    if (res.failedResponse) {
      errorCode = data.actionError;
    }

    this.setState({ errorCode });
  }


}

