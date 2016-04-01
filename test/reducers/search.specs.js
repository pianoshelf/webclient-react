
import testReducer from 'redux-test-reducer';

import searchReducer from '../../app/reducers/search';
import { createDoneAction, createErrorAction } from '../shared/actions';

import { SEARCH_SHEETMUSIC } from '../../app/constants/search';

const assertReducer = testReducer(searchReducer);

describe('reducers/search', () => {
  it('lists out sheet music properties when retrieving a list of sheet music', () => {
    assertReducer({
      from: {
        errorCode: 0,
        count: 0,
        free: [],
      },
      to: {
        errorCode: 0,
        count: 1234,
        free: [{
          shortDescription: 'description',
          id: 1234,
          uniqueUrl: '',
          musicKey: '',
          difficulty: 0,
          composer: 'Bruce Springsteen',
          musicStyle: 'pop',
          date: '',
          title: 'Philadelphia',
          fileSize: undefined,
          comments: undefined,
          images: undefined,
          inShelf: undefined,
          license: undefined,
          lilypondFile: undefined,
          longDescription: undefined,
          midiFile: undefined,
          originalFormat: undefined,
          submittedBy: undefined,
          thumbnailUrl: undefined,
          videos: [],
          viewCount: undefined,
        }],
      },
      action: createDoneAction(SEARCH_SHEETMUSIC, {
        count: 1234,
        free: [{
          description: 'description',
          id: 1234,
          uniqueurl: '',
          key: '',
          pop: 2,
          difficulty: 0,
          composer_name: 'Bruce Springsteen',
          style: 'pop',
          date: '',
          title: 'Philadelphia',
        }],
      }),
    });
  });

  it('shows an error when an error is returned', () => {
    assertReducer({
      from: {
        errorCode: 0,
        count: 0,
        free: [],
      },
      to: {
        errorCode: 123,
        count: 0,
        free: [],
      },
      action: createErrorAction(SEARCH_SHEETMUSIC, 123),
    });
  });
});
