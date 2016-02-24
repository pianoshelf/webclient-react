
import createAction from '../utils/createAction';
import {
  PROGRESS_RESET,
  PROGRESS_ADD,
  PROGRESS_REMOVE,
} from '../constants/progress';

/**
 * Resets progress state.
 */
export const resetProgress = createAction(PROGRESS_RESET);

/**
 * Adds a custom item to track progress with.
 * @param {String} progressName The name of the item we want to track.
 */
export const addProgress = createAction(PROGRESS_ADD, name => name);

/**
 * Removes the custom item.
 * @param {String} progressName The name of the item we want to track.
 */
export const removeProgress = createAction(PROGRESS_REMOVE, name => name);
