
// Import module to test
import * as search from '../../app/actions/search';
import mockApiCall from '../shared/mockApiCall';

// Mock passthrough dispatch function
const dispatch = value => value;

describe('actions/search', () => {
  describe('#search', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/search/',
        params: {
          query: 'myQuery',
        },
      });
      return search.search('myQuery')(dispatch)
        .then(() => scope.done());
    });
  });
});
