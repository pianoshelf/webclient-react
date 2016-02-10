
// Import external modules
import { expect } from 'chai';

// Import module to test
import * as profile from '../../app/actions/profile';
import { mockApiCall } from '../shared/mocks';

// Mock passthrough dispatch function
const dispatch = value => value;

describe('actions/profile', () => {
  describe('#getProfile', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/profile/?username=someUsername');
      expect(
        profile.getProfile('someUsername')(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#updateProfileDescription', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api/profile/', {
        description: 'someDescription',
      });
      expect(
        profile.updateProfileDescription('someDescription')(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#getCommentsForUser', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/comment/?username=someUsername');
      expect(
        profile.getCommentsForUser('someUsername')(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#getUploadsForUser', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/sheetmusic/uploads/?username=someUsername&page=5');
      expect(
        profile.getUploadsForUser('someUsername', 5)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#getVideosForUser', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/video/?username=someUsername');
      expect(
        profile.getVideosForUser('someUsername')(dispatch)
      ).to.eventually.equal('success');
    });
  });
});
