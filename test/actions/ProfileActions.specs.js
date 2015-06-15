
// Import external modules
import { expect } from 'chai';

// Import module to test
import ProfileActions from 'app/actions/ProfileActions';
import { mockApiCall } from 'test/shared/mocks';

describe('ProfileActions', () => {
  let actions;

  beforeEach(() => {
    actions = new ProfileActions();
  });

  it('can call #getProfile', () => {
    mockApiCall('get', '/api/profile/?username=someUsername');

    return actions.getProfile('someUsername').then((response) => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #updateProfileDescription', () => {
    mockApiCall('post', '/api/profile/', {
      description: 'someDescription',
    });

    return actions.updateProfileDescription('someDescription').then((response) => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getCommentsForUser', () => {
    mockApiCall('get', '/api/comment/?username=someUsername');

    return actions.getCommentsForUser('someUsername').then((response) => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getUploadsForUser', () => {
    mockApiCall('get', '/api/sheetmusic/uploads/?username=someUsername&page=5');

    return actions.getUploadsForUser('someUsername', 5).then((response) => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getVideosForUser', () => {
    mockApiCall('get', '/api/video/?username=someUsername');

    return actions.getVideosForUser('someUsername').then((response) => {
      expect(response.text).to.equal('success');
    });
  });

});
