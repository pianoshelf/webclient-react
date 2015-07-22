
// Import external modules
import { expect } from 'chai';
import { Flummox } from 'flummox';

// Import module to test
import ProfileActions from '../../app/actions/ProfileActions';
import { mockApiCall } from '../shared/mocks';

// Declare Flux object
class Flux extends Flummox {
  constructor() {
    super();
    this.createActions('profile', ProfileActions);
  }
}

describe('ProfileActions', () => {
  let actions;

  beforeEach(() => {
    let flux = new Flux();
    actions = flux.getActions('profile');
  });

  it('can call #getProfile', () => {
    mockApiCall('get', '/api/profile/?username=someUsername');

    actions.getProfile('someUsername').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #updateProfileDescription', () => {
    mockApiCall('post', '/api/profile/', {
      description: 'someDescription',
    });

    actions.updateProfileDescription('someDescription').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getCommentsForUser', () => {
    mockApiCall('get', '/api/comment/?username=someUsername');

    actions.getCommentsForUser('someUsername').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getUploadsForUser', () => {
    mockApiCall('get', '/api/sheetmusic/uploads/?username=someUsername&page=5');

    actions.getUploadsForUser('someUsername', 5).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getVideosForUser', () => {
    mockApiCall('get', '/api/video/?username=someUsername');

    actions.getVideosForUser('someUsername').then(response => {
      expect(response.text).to.equal('success');
    });
  });

});
