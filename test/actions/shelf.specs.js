
// Import external modules
import { expect } from 'chai';

// Import module to test
import * as shelf from '../../app/actions/shelf';
import { mockApiCall } from '../shared/mocks';

// Mock passthrough dispatch function
const dispatch = value => value;

describe('actions/shelf', () => {
  describe('#getShelf', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/shelf/?username=someUsername');
      expect(
        shelf.getShelf('someUsername')(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#addToShelf', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api/shelf/', {
        sheetmusic: 1234,
      });
      expect(
        shelf.addToShelf(1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#removeFromShelf', () => {
    it('calls the correct API', () => {
      mockApiCall('delete', '/api/shelf/', {
        sheetmusic: 1234,
      });
      expect(
        shelf.removeFromShelf(1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });
});
