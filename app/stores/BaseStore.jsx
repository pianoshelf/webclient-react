/**
 * Our base store object, helps us implement libraries such as
 * Immutable for our stores.
 */

// Import external libraries
import merge from 'lodash/object/merge';
import { Store } from 'flummox';

// Export base store
export default class BaseStore extends Store {

  static assignState(oldState, newState) {
    if (typeof oldState === 'undefined' || oldState === null)
      oldState = {};

    console.log('');
    console.log(oldState);
    console.log('becomes');
    console.log(newState);



    return merge(oldState, newState);
  }

  static serialize(state) {
    return JSON.stringify(state);
  }

  static deserialize(object) {
    return JSON.parse(object);
  }

}

