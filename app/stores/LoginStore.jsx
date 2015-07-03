
import { Store } from 'flummox';

import { errors } from '../utils/constants';


export default class MessageStore extends Store {

  constructor(flux) {

    super();

    const loginActions = flux.getActions('login');
    let actions = [
      'login',
      'logout',
    ];

    // Register each action's success and failure handler
    actions.forEach(action => {
      this.registerAsync(loginActions[action],
        this[`${action}Start`] ? this[`${action}Start`] : null,
        this[`${action}Success`] ? this[`${action}Success`] : null,
        this[`${action}Error`] ? this[`${action}Error`] : null);
    });

    this.state = {};
  }

  /**
   * LOGIN methods
   */

  loginStart() {
    this.setState({
      inProgress: 'login'
    });
  }

  loginSuccess(res) {
    let data = JSON.parse(res.text);

    console.log('loggedin! heres the flux req obj', this.flux.request);

    this.setState({
      inProgress: 'login',
    });
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
      inProgress: null,
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

  registerStart() {
    this.setState({
      inProgress: 'register',
    });
  }

  registerSuccess(res) {
    this.setState({
      inProgress: 'register',
    });
  }

  registerError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    if (res.failedResponse) {
      errorCode = data.actionError;
    }

    this.setState({
      errorCode,
      inProgress: null,
    });
  }

  /**
   * FACEBOOK methods
   */
  facebookLoginStart() {
    this.setState({
      inProgress: 'facebookLogin',
    });

  }

  facebookLoginSuccess(res) {
    this.setState({
      inProgress: 'facebookLogin',
    });

  }

  facebookLoginError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    this.setState({
      errorCode,
      inProgress: null,
    });

  }

}

