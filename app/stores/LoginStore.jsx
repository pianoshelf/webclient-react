
import BaseStore from './BaseStore';
import { errors, success } from '../utils/constants';

export default class LoginStore extends BaseStore {

  constructor(flux) {

    super();

    const loginActions = flux.getActions('login');

    this.registerAsync(loginActions.login,
                       null,
                       this.logInUser,
                       this.loginError);

    this.registerAsync(loginActions.register,
                       null,
                       this.registerUser,
                       this.registerError);

    this.registerAsync(loginActions.resetPassword,
                       null,
                       this.resetPasswordSuccess,
                       this.resetPasswordError);

    this.registerAsync(loginActions.resetPasswordConfirm,
                       null,
                       this.resetPasswordConfirmSuccess,
                       this.resetPasswordConfirmError);

    this.registerAsync(loginActions.facebookLogin,
                       null,
                       this.logInUser,
                       null);

    this.registerAsync(loginActions.getUser,
                       null,
                       this.logInUser,
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

  logInUser(res) {
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

  registerUser() {
    // Set error code to registered
    let errorCode = success.REGISTERED;
    this.setState({ errorCode });
  }

  resetPasswordSuccess() {
    // Set error code to password reset
    let errorCode = success.PASSWORD_RESET;
    this.setState({ errorCode });
  }

  resetPasswordConfirmSuccess() {
    // Set error code to password reset confirm
    let errorCode = success.PASSWORD_CONFIRM_RESET;
    this.setState({ errorCode });
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

  registerError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    if (res.failedResponse) {
      errorCode = data.actionError;
    } else if (data.username &&
               data.username[0] === 'This username is already taken. Please choose another.') {
      errorCode = errors.USERNAME_TAKEN;
    } else if (data.email &&
               data.email[0] === 'A user is already registered with this e-mail address.') {
      errorCode = errors.EMAIL_ALREADY_REGISTERED;
    }

    this.setState({ errorCode });
  }

  resetPasswordError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    if (res.failedResponse) {
      errorCode = data.actionError;
    } else if (data.email &&
               data.email[0] === 'Invalid Email') {
      errorCode = errors.EMAIL_NOT_REGISTERED;
    }

    this.setState({ errorCode });
  }

  resetPasswordConfirmError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    if (res.failedResponse) {
      errorCode = data.actionError;
    }

    this.setState({ errorCode });
  }

}

