
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

    this.registerAsync(loginActions.verifyEmail,
                       null,
                       this.verifyEmailSuccess,
                       this.verifyEmailError);

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
    this.setState({ errorCode: 0, user: null, loggedIn: false });
  }

  logInUser(res) {
    const data = JSON.parse(res.text);

    // Set error code to success
    const errorCode = success.LOGGED_IN;

    // Extract user information and set it as the state
    const { auth_token, username, first_name, last_name, email, is_superuser } = data;
    const user = {
      authToken: auth_token,
      firstName: first_name,
      lastName: last_name,
      isSuperuser: is_superuser,
      username,
      email,
    };

    // Set logged in state to true
    const loggedIn = true;

    // Set the state
    this.setState({ errorCode, user, loggedIn });
  }

  registerUser() {
    // Set error code to registered
    const errorCode = success.REGISTERED;
    this.setState({ errorCode });
  }

  resetPasswordSuccess() {
    // Set error code to password reset
    const errorCode = success.PASSWORD_RESET;
    this.setState({ errorCode });
  }

  resetPasswordConfirmSuccess() {
    // Set error code to password reset confirm
    const errorCode = success.PASSWORD_CONFIRM_RESET;
    this.setState({ errorCode });
  }

  verifyEmailSuccess() {
    // Set error code to verified email
    const errorCode = success.EMAIL_VERIFIED;
    this.setState({ errorCode });
  }

  loginError(res) {
    const data = JSON.parse(res.text);
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
    const data = JSON.parse(res.text);
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
    const data = JSON.parse(res.text);
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
    let data;
    let errorCode = 0;

    // When submitting a completely invalid token and uid, the backend spits out errors that aren't
    // JSON. This else statement exists so we can take care of that specific situation.
    // TODO(ankit): When the backend bug is fixed, remove this hack.
    try {
      data = JSON.parse(res.text);
    } catch (e) {
      this.setState({ errorCode: errors.EXPIRED_LINK });
      return;
    }

    if (res.failedResponse) {
      errorCode = data.actionError;
    } else if (data.token &&
               data.token[0] === 'Invalid value') {
      errorCode = errors.EXPIRED_LINK;
    } else if (data.uid &&
               data.uid[0] === 'Invalid value') {
      errorCode = errors.EXPIRED_LINK;
    }

    this.setState({ errorCode });
  }

  verifyEmailError(res) {
    const data = JSON.parse(res.text);
    let errorCode = 0;

    if (data.detail &&
        data.detail === 'Not found') {
      errorCode = errors.EMAIL_UNVERIFIED;
    }

    this.setState({ errorCode });
  }
}
