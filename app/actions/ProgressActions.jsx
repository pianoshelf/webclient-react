
import defer from 'lodash/function/defer';

// Import external modules
import { Actions } from 'flummox';

export default class ProgressActions extends Actions {

  resetProgress() {
    return true;
  }

}

