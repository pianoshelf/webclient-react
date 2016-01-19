
// Import external modules
import { Actions } from 'flummox';

export default class ProgressActions extends Actions {

  resetProgress() {
    return true;
  }

  /**
   * Adds a custom item to track progress with.
   * @param String progressName The name of the item we want to track.
   */
  addProgress(progressName) {
    return progressName;
  }

  /**
   * Removes the custom item.
   * @param String progressName The name of the item we want to track.
   */
  removeProgress(progressName) {
    return progressName;
  }

}
