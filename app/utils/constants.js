/**
 * This file contains constants used throughout the PianoShelf code base,
 * such as error numbers.
 */

let c = 100; // Client error starting point
let s = 200; // Server error starting point

// Error constants
export const errors = {

  // Client side errors
  INVALID_EMAIL: c++,
  NO_EMAIL: c++,
  NO_PASSWORD: c++,
  NO_USERNAME: c++,
  NOT_SAME_PASSWORD: c++,

  // Server side errors
  UNABLE_TO_LOG_IN: s++,
  USERNAME_TAKEN: s++,

};


