
// Import external modules
import { expect } from 'chai';

// Import module to test
import * as shelf from '../../app/actions/shelf';
import { mockApiCall } from '../shared/mocks';

describe('actions/shelf', () => {
  it('can call #getShelf', () => {
    mockApiCall('get', '/api/shelf/?username=someUsername');

    shelf.getShelf('someUsername').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #addToShelf', () => {
    mockApiCall('post', '/api/shelf/', {
      sheetmusic: 1234,
    });

    shelf.addToShelf(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #removeFromShelf', () => {
    mockApiCall('delete', '/api/shelf/', {
      sheetmusic: 1234,
    });

    shelf.removeFromShelf(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });
});
