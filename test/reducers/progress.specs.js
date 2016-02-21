
import testReducer from 'redux-test-reducer';

import progressReducer from '../../app/reducers/progress';
import { createDoneAction } from '../shared/actions';

import {
  PROGRESS_RESET,
  PROGRESS_ADD,
  PROGRESS_REMOVE,
} from '../../app/constants/progress';

const assertReducer = testReducer(progressReducer);

describe('reducers/progress', () => {
  it('resets the array', () => {
    assertReducer({
      from: { inProgress: ['1', '2', '3'] },
      to: { inProgress: [] },
      action: createDoneAction(PROGRESS_RESET),
    });
  });

  it('adds an item to progress array', () => {
    assertReducer({
      from: { inProgress: ['1', '2', '3'] },
      to: { inProgress: ['1', '2', '3', 'hi'] },
      action: createDoneAction(PROGRESS_ADD, 'hi'),
    });
  });

  it('removes an item from progress array', () => {
    assertReducer({
      from: { inProgress: ['1', '2', '3'] },
      to: { inProgress: ['1', '3'] },
      action: createDoneAction(PROGRESS_REMOVE, '2'),
    });
  });

  it('returns same state when removing something that does not exist', () => {
    assertReducer({
      from: { inProgress: ['1', '2', '3'] },
      to: { inProgress: ['1', '2', '3'] },
      action: createDoneAction(PROGRESS_REMOVE, 'hi'),
    });
  });
});
