
// Import external modules
import { expect } from 'chai';

// Import module to test
import * as profile from '../../app/actions/profile';
import { mockApiCall } from '../shared/mocks';

// Mock passthrough dispatch function
const dispatch = value => value;

describe('actions/profile', () => {
  it('can call #getProfile', () => {
    mockApiCall('get', '/api/profile/?username=someUsername');

    profile.getProfile('someUsername')(dispatch).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #updateProfileDescription', () => {
    mockApiCall('post', '/api/profile/', {
      description: 'someDescription',
    });

    profile.updateProfileDescription('someDescription')(dispatch).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getCommentsForUser', () => {
    mockApiCall('get', '/api/comment/?username=someUsername');

    profile.getCommentsForUser('someUsername')(dispatch).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getUploadsForUser', () => {
    mockApiCall('get', '/api/sheetmusic/uploads/?username=someUsername&page=5');

    profile.getUploadsForUser('someUsername', 5)(dispatch).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getVideosForUser', () => {
    mockApiCall('get', '/api/video/?username=someUsername');

    profile.getVideosForUser('someUsername')(dispatch).then(response => {
      expect(response.text).to.equal('success');
    });
  });
});
