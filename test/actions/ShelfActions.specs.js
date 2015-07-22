
// Import external modules
import { expect } from 'chai';
import { Flummox } from 'flummox';

// Import module to test
import ShelfActions from '../../app/actions/ShelfActions';
import { mockApiCall } from '../shared/mocks';

// Declare Flux object
class Flux extends Flummox {
  constructor() {
    super();
    this.createActions('shelf', ShelfActions);
  }
}

describe('ShelfActions', () => {
  let actions;

  beforeEach(() => {
    let flux = new Flux();
    actions = flux.getActions('shelf');
  });

  it('can call #getShelf', () => {
    mockApiCall('get', '/api/shelf/?username=someUsername');

    actions.getShelf('someUsername').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #addToShelf', () => {
    mockApiCall('post', '/api/shelf/', {
      sheetmusic: 1234,
    });

    actions.addToShelf(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #removeFromShelf', () => {
    mockApiCall('delete', '/api/shelf/', {
      sheetmusic: 1234,
    });

    actions.removeFromShelf(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

});
