
import testReducer from 'redux-test-reducer';

import listReducer from '../../../app/reducers/sheetmusic/lists';
import { createDoneAction } from '../../shared/actions';
import { success } from '../../../app/utils/constants';

const assertReducer = testReducer(listReducer);

describe('reducers/sheetmusic/lists', () => {
  it('can retrieve a list of sheet music');
  it('can error when retrieving a list of sheet music');
  it('can retrieve popular sheet music');
  it('can error when retrieving popular sheet music');
  it('can retrieve trending sheet music');
  it('can error when retrieving trending sheet music');
});
