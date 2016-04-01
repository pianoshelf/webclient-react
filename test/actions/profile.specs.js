
// Import module to test
import * as profile from '../../app/actions/profile';
import mockApiCall from '../shared/mockApiCall';

// Mock passthrough dispatch function
const dispatch = value => value;

describe('actions/profile', () => {
  describe('#getProfile', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/profile/',
        params: {
          username: 'someUsername',
        },
      });
      return profile.getProfile('someUsername')(dispatch)
        .then(() => scope.isDone());
    });
  });

  describe('#updateProfileDescription', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/profile/',
        params: {
          description: 'someDescription',
        },
      });
      return profile.updateProfileDescription('someDescription')(dispatch)
        .then(() => scope.isDone());
    });
  });

  describe('#getCommentsForUser', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/comment/',
        params: {
          username: 'someUsername',
        },
      });
      return profile.getCommentsForUser('someUsername')(dispatch)
        .then(() => scope.isDone());
    });
  });

  describe('#getUploadsForUser', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/sheetmusic/uploads/',
        params: {
          username: 'someUsername',
          page: 5,
        },
        returnData: [],
        returnMeta: { pagination: { count: 1 } },
      });
      return profile.getUploadsForUser('someUsername', 5)(dispatch)
        .then(() => scope.isDone());
    });
  });

  describe('#getVideosForUser', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/video/',
        params: {
          username: 'someUsername',
        },
      });
      return profile.getVideosForUser('someUsername')(dispatch)
        .then(() => scope.isDone());
    });
  });
});
