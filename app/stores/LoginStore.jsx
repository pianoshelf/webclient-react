
import { Store } from 'flummox';
import { errors, success } from '../utils/constants';

export default class MessageStore extends Store {

  constructor(flux) {

    super();

    // TODO(ankit): Make this into something a little bit more straightforward.
    const loginActions = flux.getActions('login');

    this.registerAsync(loginActions.login,
                       null,
                       this.loginSuccess,
                       this.loginError);

    this.registerAsync(loginActions.register,
                       null,
                       this.loginSuccess,
                       this.registerError);

    this.registerAsync(loginActions.facebookLogin,
                       null,
                       null,
                       this.facebookLoginError);

    this.registerAsync(loginActions.getUser,
                       null,
                       this.loginSuccess,
                       this.resetErrorCode);

    this.register(loginActions.clearErrors, this.resetErrorCode);
    this.register(loginActions.logout, this.resetErrorCode);

    this.state = {};
  }

  /**
   * Method for resetting the user state.
   */
  resetErrorCode() {
    this.setState({ errorCode: 0, user: null });
  }

  /**
   * LOGIN methods
   */

  loginSuccess(res) {
    let data = JSON.parse(res.text);

    // Set error code to success
    let errorCode = success.LOGGED_IN;

    // Extract user information and set it as the state
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

