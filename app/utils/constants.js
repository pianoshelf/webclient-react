/**
 * This file contains constants used throughout the Pianoshelf code base,
 * such as error numbers.
 */

let s = 1; // Starting point

// Error constants
export const errors = {

  // Server side errors
  NETWORK_ERROR: s++,
  API_ERROR: s++,

  // Authentication
  INVALID_EMAIL: s++,
  NO_EMAIL: s++,
  NO_PASSWORD: s++,
  NO_USERNAME: s++,
  NOT_STRONG_PASSWORD: s++,
  NOT_SAME_PASSWORD: s++,
  UNABLE_TO_LOG_IN: s++,
  USERNAME_TAKEN: s++,
  EMAIL_ALREADY_REGISTERED: s++,
  EMAIL_NOT_REGISTERED: s++,
  EXPIRED_LINK: s++,
  EMAIL_UNVERIFIED: s++,

  // Upload
  NO_FILE: s++,
  NO_TITLE: s++,
  NO_COMPOSER: s++,

};

// Success constants
export const success = {

  // Authentication
  LOGGED_IN: s++,
  REGISTERED: s++,
  PASSWORD_RESET: s++,
  PASSWORD_CONFIRM_RESET: s++,
  PASSWORD_CHANGED: s++,
  EMAIL_VERIFIED: s++,

  // Upload
  UPLOADED: s++,

};
