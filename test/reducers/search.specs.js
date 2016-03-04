
import testReducer from 'redux-test-reducer';

import searchReducer from '../../app/reducers/search';
import { createStartAction, createDoneAction, createErrorAction } from '../shared/actions';
import { success } from '../../app/utils/constants';

import { SEARCH_SHEETMUSIC } from '../../app/constants/search';

const assertReducer = testReducer(searchReducer);

describe('reducers/search', () => {
  it('sets progress to true when beginning a request', () => {
    assertReducer({
      from: {
        errorCode: 0,
        count: 0,
        free: [],
        paid: [],
        progress: false,
      },
      to: {
        errorCode: 0,
        count: 0,
        free: [],
        paid: [],
        progress: true,
      },
      action: createStartAction(SEARCH_SHEETMUSIC),
    });
  });

  it('lists out sheet music properties when retrieving a list of sheet music', () => {
    assertReducer({
      from: {
        errorCode: 0,
        count: 0,
        free: [],
        paid: [],
        progress: true,
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
        paid: [{
          pageUrl: 'url',
          detailedDescription: 'some description',
          musicFormat: 'music format',
          source: 'source',
          shortDescription: 'short description',
          instrument: 'instrument',
          level: null,
          thumbnailUrl: 'thumbnail',
          title: 'title',
        }],
        progress: false,
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
        paid: [{
          page_url: 'url',
          detailed_description: 'some description',
          music_format: 'music format',
          source: 'source',
          short_description: 'short description',
          instrument: 'instrument',
          level: null,
          thumbnail_url: 'thumbnail',
          title: 'title',
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
        paid: [],
        progress: true,
      },
      to: {
        errorCode: 123,
        count: 0,
        free: [],
        paid: [],
        progress: false,
      },
      action: createErrorAction(SEARCH_SHEETMUSIC, 123),
    });
  });
});
