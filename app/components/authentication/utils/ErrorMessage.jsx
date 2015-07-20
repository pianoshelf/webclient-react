
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { errors } from '../../../utils/constants';

export default React.createClass({

  propTypes: {
    /**
     * The error number to display.
     */
    errorCode: React.PropTypes.number.isRequired,

    /**
     * A condition where the error will never display.
     */
    dontDisplayIf: React.PropTypes.bool.isRequired,
  },

  render() {
    if (this.props.errorCode && !this.props.dontDisplayIf) {
      return (
        <div className="authentication__error">
          <FontAwesome className="authentication__error-icon"
            name="exclamation-circle"
            size="lg" />
          {this.getErrorMessage_(this.props.errorCode)}
        </div>
      );
    } else {
      return null;
    }
  },

  getErrorMessage_(errorCode) {
    switch (errorCode) {
      case errors.INVALID_EMAIL:
        return 'The email you provided is invalid.';
      case errors.NO_EMAIL:
        return 'Please enter an email!';
      case errors.NO_PASSWORD:
        return 'You did not enter a password!';
      case errors.NO_USERNAME:
        return 'You did not enter a username!';
      case errors.NOT_SAME_PASSWORD:
        return 'The two password fields do not match.';
      case errors.UNABLE_TO_LOG_IN:
        return 'Unable to log in with the provided username and password.';
      case errors.USERNAME_TAKEN:
        return 'Sorry, that username is taken.';
      case errors.EMAIL_ALREADY_REGISTERED:
        return 'A user is already registered with this e-mail address.';
      default:
        return 'An unknown error occurred!';
    }
  },

});

