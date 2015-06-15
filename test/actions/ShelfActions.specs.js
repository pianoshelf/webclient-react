
// Import external modules
import { expect } from 'chai';

// Import module to test
import ShelfActions from 'app/actions/ShelfActions';
import { mockApiCall } from 'test/shared/mocks';

describe('ShelfActions', () => {
  let actions;

  beforeEach(() => {
    actions = new ShelfActions();
  });

  it('can call #getShelf', () => {
    mockApiCall('get', '/api/shelf/?username=someUsername');

    return actions.getShelf('someUsername').then((response) => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #addToShelf', () => {
    mockApiCall('post', '/api/shelf/', {
      sheetmusic: 1234,
    });

    return actions.addToShelf(1234).then((response) => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #removeFromShelf', () => {
    mockApiCall('delete', '/api/shelf/', {
      sheetmusic: 1234,
    });

    return actions.removeFromShelf(1234).then((response) => {
      expect(response.text).to.equal('success');
    });
  });

});
