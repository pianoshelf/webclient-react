
// Import external modules
import { expect } from 'chai';

// Import module to test
import * as sheetmusic from '../../app/actions/sheetmusic';
import { mockApiCall } from '../shared/mocks';

// Mock passthrough dispatch function
const dispatch = value => value;

describe('actions/sheetmusic', () => {

  describe('#getSheetMusic', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/sheetmusic/1234');
      expect(
        sheetmusic.getSheetMusic(1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#updateSheetMusic', () => {
    it('calls the correct API', () => {
      mockApiCall('patch', '/api/sheetmusic/1234', {
        sheetmusic: 'data',
      });
      expect(
        sheetmusic.updateSheetMusic(1234, 'data')(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#getComposers', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/composers/');
      expect(
        sheetmusic.getComposers()(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#getTopSheetMusic', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/sheetmusic/top');
      expect(
        sheetmusic.getTopSheetMusic(1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#getTrendingSheetMusic', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/sheetmusic/trending?days=1234&results=5678');
      expect(
        sheetmusic.getTrendingSheetMusic(1234, 5678)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#getSheetMusicList', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/sheetmusic/?optionBool=true&optionInt=5&optionString=string');
      expect(
        sheetmusic.getSheetMusicList({
          optionBool: true,
          optionInt: 5,
          optionString: 'string',
        })(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#getRating', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/sheetmusic/getrating?sheet_id=1234');
      expect(
        sheetmusic.getRating(1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#postRating', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api/sheetmusic/rate/', {
        sheetmusic: 1234,
        value: 5,
      });
      expect(
        sheetmusic.postRating(1234, 5)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#getUploads', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/sheetmusic/uploads/');
      expect(
        sheetmusic.getUploads()(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#deleteSheetMusic', () => {
    it('calls the correct API', () => {
      mockApiCall('delete', '/api/sheetmusic/1234');
      expect(
        sheetmusic.deleteSheetMusic(1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#postVideo', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api/video/', {
        link: 'link',
        title: 'title',
        grade: 'grade',
      });
      expect(
        sheetmusic.postVideo('link', 'title', 'grade')(dispatch)
      ).to.eventually.equal('success');
    });

    it('calls the correct API with the sheet music ID', () => {
      mockApiCall('post', '/api/video/', {
        link: 'link',
        title: 'title',
        grade: 'grade',
        sheetmusicId: 1234,
      });
      expect(
        sheetmusic.postVideo('link', 'title', 'grade', 1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#increaseViewCount', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api/sheetmusic/viewCount/', {
        sheetmusic_id: 1234,
      });
      expect(
        sheetmusic.increaseViewCount(1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#search', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/search?query=myQuery');
      expect(
        sheetmusic.search('myQuery')(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#getComments', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/comment/?sheetmusicId=1234');
      expect(
        sheetmusic.getComments(1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#removeComment', () => {
    it('calls the correct API', () => {
      mockApiCall('delete', '/api/comment/1234/');
      expect(
        sheetmusic.removeComment(1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#editComment', () => {
    it('calls the correct API', () => {
      mockApiCall('patch', '/api/comment/1234/', {
        commentText: 'commentText',
      });
      expect(
        sheetmusic.editComment(1234, 'commentText')(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#undoRemoveComment', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api/comment/1234/undodelete/');
      expect(
        sheetmusic.undoRemoveComment(1234)(dispatch)
      ).to.eventually.equal('success');
    });
  });


  describe('#upvoteComment', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api/commentupvote/?commentId=1234&sheetmusicId=5678');
      expect(
        sheetmusic.upvoteComment(1234, 5678)(dispatch)
      ).to.eventually.equal('success');
    });
  });
});
