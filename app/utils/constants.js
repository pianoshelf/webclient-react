/**
 * This file contains constants used throughout the PianoShelf code base,
 * such as error numbers.
 */

let s = 1; // Starting point

// Error constants
export const errors = {

  // Client side errors
  INVALID_EMAIL: s++,
  NO_EMAIL: s++,
  NO_PASSWORD: s++,
  NO_USERNAME: s++,
  NOT_SAME_PASSWORD: s++,

  // Server side errors
  UNABLE_TO_LOG_IN: s++,
  USERNAME_TAKEN: s++,
  EMAIL_ALREADY_REGISTERED: s++,

};

// Success constants
export const success = {

  // Authentication
  LOGGED_IN: s++,
  REGISTERED: s++,

};

