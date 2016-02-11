
// Import module to test
import * as shelf from '../../app/actions/shelf';
import mockApiCall from '../shared/mockApiCall';

// Mock passthrough dispatch function
const dispatch = value => value;

describe('actions/shelf', () => {
  describe('#getShelf', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/shelf/',
        params: {
          username: 'someUsername',
        },
      });
      return shelf.getShelf('someUsername')(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#addToShelf', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/shelf/',
        params: {
          sheetmusic: 1234,
        },
      });
      return shelf.addToShelf(1234)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#removeFromShelf', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'delete',
        path: '/api/shelf/',
        params: {
          sheetmusic: 1234,
        },
      });
      return shelf.removeFromShelf(1234)(dispatch)
        .then(() => scope.done());
    });
  });
});
