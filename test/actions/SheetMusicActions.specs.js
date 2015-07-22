
// Import external modules
import { expect } from 'chai';
import { Flummox } from 'flummox';

// Import module to test
import SheetMusicActions from '../../app/actions/SheetMusicActions';
import { mockApiCall } from '../shared/mocks';

// Declare Flux object
class Flux extends Flummox {
  constructor() {
    super();
    this.createActions('sheetmusic', SheetMusicActions);
  }
}

describe('SheetMusicActions', () => {
  let actions;

  beforeEach(() => {
    let flux = new Flux();
    actions = flux.getActions('sheetmusic');
  });

  it('can call #getSheetMusic', () => {
    mockApiCall('get', '/api/sheetmusic/1234');

    actions.getSheetMusic(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #updateSheetMusic', () => {
    mockApiCall('patch', '/api/sheetmusic/1234', {
      sheetmusic: 'data',
    });

    actions.updateSheetMusic(1234, 'data').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getComposers', () => {
    mockApiCall('get', '/api/composers/');

    actions.getComposers().then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getTopSheetMusic', () => {
    mockApiCall('get', '/api/sheetmusic/top');

    actions.getTopSheetMusic(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getTrendingSheetMusic', () => {
    mockApiCall('get', '/api/sheetmusic/trending?days=1234&results=5678');

    actions.getTrendingSheetMusic(1234, 5678).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getSheetMusicList', () => {
    mockApiCall('get', '/api/sheetmusic/?optionBool=true&optionInt=5&optionString=string');

    actions.getSheetMusicList({
      optionBool: true,
      optionInt: 5,
      optionString: 'string',
    }).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getRating', () => {
    mockApiCall('get', '/api/sheetmusic/getrating?sheet_id=1234');

    actions.getRating(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #postRating', () => {
    mockApiCall('post', '/api/sheetmusic/rate/', {
      sheetmusic: 1234,
      value: 5,
    });

    actions.postRating(1234, 5).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getUploads', () => {
    mockApiCall('get', '/api/sheetmusic/uploads/');

    actions.getUploads().then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #deleteSheetMusic', () => {
    mockApiCall('delete', '/api/sheetmusic/1234');

    actions.deleteSheetMusic(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #postVideo', () => {
    mockApiCall('post', '/api/video/', {
      link: 'link',
      title: 'title',
      grade: 'grade',
    });

    actions.postVideo('link', 'title', 'grade').then(response => {
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

    actions.postVideo('link', 'title', 'grade', 1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #increaseViewCount', () => {
    mockApiCall('post', '/api/sheetmusic/viewCount/', {
      sheetmusic_id: 1234,
    });

    actions.increaseViewCount(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #search', () => {
    mockApiCall('get', '/api/search?query=myQuery');

    actions.search('myQuery').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #getComments', () => {
    mockApiCall('get', '/api/comment/?sheetmusicId=1234');

    actions.getComments(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #removeComment', () => {
    mockApiCall('delete', '/api/comment/1234/');

    actions.removeComment(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #editComment', () => {
    mockApiCall('patch', '/api/comment/1234/', {
      commentText: 'commentText',
    });

    actions.editComment(1234, 'commentText').then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #undoRemoveComment', () => {
    mockApiCall('post', '/api/comment/1234/undodelete/');

    actions.undoRemoveComment(1234).then(response => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #upvoteComment', () => {
    mockApiCall('get', '/api/commentupvote/?commentId=1234&sheetmusicId=5678');

    actions.upvoteComment(1234, 5678).then(response => {
      expect(response.text).to.equal('success');
    });
  });

});
