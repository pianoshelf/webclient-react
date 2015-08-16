/**
 * Our base store object, helps us implement libraries such as
 * Immutable for our stores.
 */

// Import external libraries
import isArray from 'lodash/lang/isArray';
import merge from 'lodash/object/merge';
import { Store } from 'flummox';

// Export base store
export default class BaseStore extends Store {

  constructor() {
    super();
  }

  static assignState(oldState, newState) {
    let state = oldState;
    if (typeof state === 'undefined' || state === null) {
      state = {};
    }

    return merge(state, newState, (oldParam, newParam) => {
      if (isArray(oldParam)) return newParam;
    });
  }

  static serialize(state) {
    return JSON.stringify(state);
  }

  static deserialize(object) {
    return JSON.parse(object);
  }

}

