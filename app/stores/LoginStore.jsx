
import { Store } from 'flummox';

import { errors } from 'app/utils/constants';


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
      loginInProgress: true
    });
  }

  loginSuccess(res) {
    let data = JSON.parse(res.text);

    this.setState({
      loginInProgress: false,
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
      errorCode = errors.login.UNABLE_TO_LOG_IN;
    }

    this.setState({
      errorCode,
      loginInProgress: false,
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
      registerInProgress: true,
    });
  }

  registerSuccess(res) {


    this.setState({
      registerInProgress: false,
    });
  }

  registerError(res) {
    let data = JSON.parse(res.text);
    let errorCode = 0;

    if (res.failedResponse) {
      errorCode = data.actionError;
    }

    this.setState({
      registerInProgress: false,
    });
  }

}

