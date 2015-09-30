
import classNames from 'classnames';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { errors, success } from '../../../utils/constants';

export default React.createClass({

  propTypes: {
    /**
     * The error number to display.
     */
    errorCode: React.PropTypes.number,

    /**
     * A condition where the error will never display.
     */
    dontDisplayIf: React.PropTypes.bool.isRequired,
  },

  getErrorMessage_(errorCode) {
    switch (errorCode) {
    case errors.INVALID_EMAIL:
      return [true, 'The email you provided is invalid.'];
    case errors.NO_EMAIL:
      return [true, 'Please enter an email!'];
    case errors.NO_PASSWORD:
      return [true, 'You did not enter a password!'];
    case errors.NO_USERNAME:
      return [true, 'You did not enter a username!'];
    case errors.NOT_STRONG_PASSWORD:
      return [true, 'Your password must be 6 or more characters.'];
    case errors.NOT_SAME_PASSWORD:
      return [true, 'The two password fields do not match.'];
    case errors.UNABLE_TO_LOG_IN:
      return [true, 'Unable to log in with the provided username and password.'];
    case errors.USERNAME_TAKEN:
      return [true, 'Sorry, that username is taken.'];
    case errors.EMAIL_ALREADY_REGISTERED:
      return [true, 'A user is already registered with this e-mail address.'];
    case errors.EMAIL_NOT_REGISTERED:
      return [
        true,
        'Either the email you specified is not registered with PianoShelf or your email address' +
          'hasn\'t been activated yet.',
      ];
    case errors.EXPIRED_LINK:
      return [true, 'This link has expired and you cannot reset your password.'];
    case success.PASSWORD_RESET:
      return [false, 'Please check your email for the link to reset your password.'];
    case success.PASSWORD_CONFIRM_RESET:
      return [false, 'Your password has been reset.'];
    default:
      return [true, 'An unknown error occurred!'];
    }
  },

  render() {
    if (this.props.errorCode && !this.props.dontDisplayIf) {
      let [ isError, errorMessage ] = this.getErrorMessage_(this.props.errorCode);

      let className = classNames({
        'authentication__message': true,
        'authentication__message--info': !isError,
        'authentication__message--error': isError,
      });

      return (
        <div className={className}>
          <FontAwesome className="authentication__message-icon"
            name={isError ? 'exclamation-circle' : 'info-circle'}
            size="lg" />
          {errorMessage}
        </div>
      );
    } else {
      return null;
    }
  },

});

