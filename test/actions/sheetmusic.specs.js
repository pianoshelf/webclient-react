
// Import external modules
import { expect } from 'chai';

// Import module to test
import * as sheetmusic from '../../app/actions/sheetmusic';
import { mockApiCall } from '../shared/mocks';

describe('actions/sheetmusic', () => {
  it('can call #getSheetMusic', () => {
    mockApiCall('get', '/api/sheetmusic/1234');

    sheetmusic.getSheetMusic(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #updateSheetMusic', () => {
    mockApiCall('patch', '/api/sheetmusic/1234', {
      sheetmusic: 'data',
    });

    sheetmusic.updateSheetMusic(1234, 'data').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getComposers', () => {
    mockApiCall('get', '/api/composers/');

    sheetmusic.getComposers().then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getTopSheetMusic', () => {
    mockApiCall('get', '/api/sheetmusic/top');

    sheetmusic.getTopSheetMusic(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getTrendingSheetMusic', () => {
    mockApiCall('get', '/api/sheetmusic/trending?days=1234&results=5678');

    sheetmusic.getTrendingSheetMusic(1234, 5678).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getSheetMusicList', () => {
    mockApiCall('get', '/api/sheetmusic/?optionBool=true&optionInt=5&optionString=string');

    sheetmusic.getSheetMusicList({
      optionBool: true,
      optionInt: 5,
      optionString: 'string',
    }).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getRating', () => {
    mockApiCall('get', '/api/sheetmusic/getrating?sheet_id=1234');

    sheetmusic.getRating(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #postRating', () => {
    mockApiCall('post', '/api/sheetmusic/rate/', {
      sheetmusic: 1234,
      value: 5,
    });

    sheetmusic.postRating(1234, 5).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getUploads', () => {
    mockApiCall('get', '/api/sheetmusic/uploads/');

    sheetmusic.getUploads().then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #deleteSheetMusic', () => {
    mockApiCall('delete', '/api/sheetmusic/1234');

    sheetmusic.deleteSheetMusic(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #postVideo', () => {
    mockApiCall('post', '/api/video/', {
      link: 'link',
      title: 'title',
      grade: 'grade',
    });

    sheetmusic.postVideo('link', 'title', 'grade').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #postVideo with the sheet music ID', () => {
    mockApiCall('post', '/api/video/', {
      link: 'link',
      title: 'title',
      grade: 'grade',
      sheetmusicId: 1234,
    });

    sheetmusic.postVideo('link', 'title', 'grade', 1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #increaseViewCount', () => {
    mockApiCall('post', '/api/sheetmusic/viewCount/', {
      sheetmusic_id: 1234,
    });

    sheetmusic.increaseViewCount(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #search', () => {
    mockApiCall('get', '/api/search?query=myQuery');

    sheetmusic.search('myQuery').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getComments', () => {
    mockApiCall('get', '/api/comment/?sheetmusicId=1234');

    sheetmusic.getComments(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #removeComment', () => {
    mockApiCall('delete', '/api/comment/1234/');

    sheetmusic.removeComment(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #editComment', () => {
    mockApiCall('patch', '/api/comment/1234/', {
      commentText: 'commentText',
    });

    sheetmusic.editComment(1234, 'commentText').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #undoRemoveComment', () => {
    mockApiCall('post', '/api/comment/1234/undodelete/');

    sheetmusic.undoRemoveComment(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #upvoteComment', () => {
    mockApiCall('get', '/api/commentupvote/?commentId=1234&sheetmusicId=5678');

    sheetmusic.upvoteComment(1234, 5678).then(response => {
      expect(response.text).to.equal('success');
    });
  });

});
