
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
});
