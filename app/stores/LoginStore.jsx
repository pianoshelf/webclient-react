
import { Store } from 'flummox';
import { errors } from '../utils/constants';

export default class MessageStore extends Store {

  constructor(flux) {

    super();

    const loginActions = flux.getActions('login');
    let actions = [
      'login',
      'register',
    ];

    // Register each action's success and failure handler
    actions.forEach(action => {
      this.registerAsync(loginActions[action],
        null,
        this[`${action}Success`] ? this[`${action}Success`] : null,
        this[`${action}Error`] ? this[`${action}Error`] : null);
    });

    this.state = {
      errorCode: 0,
    };
  }

  /**
   * LOGIN methods
   */

  loginSuccess(res) {
    let data = JSON.parse(res.text);

    console.log('loggedin! heres the flux req obj', this.flux.request);
  }

  loginError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    if (res.failedResponse) {
      // Intentionally failed response
      errorCode = data.actionError;

    } else if (data.non_field_errors &&
        data.non_field_errors[0] === 'Unable to log in with provided credentials.') {
      // Standard 'unable to log in' error
      errorCode = errors.UNABLE_TO_LOG_IN;
    }

    this.setState({
      errorCode,
    });
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

    this.setState({
      errorCode,
    });
  }

  /**
   * FACEBOOK methods
   */

  facebookLoginError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    this.setState({
      errorCode,
    });

  }

}

