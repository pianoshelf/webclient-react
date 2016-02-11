
// Import module to test
import * as sheetmusic from '../../app/actions/sheetmusic';
import mockApiCall from '../shared/mockApiCall';

// Mock passthrough dispatch function
const dispatch = value => value;

describe('actions/sheetmusic', () => {
  describe('#getSheetMusic', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/sheetmusic/1234/',
      });
      return sheetmusic.getSheetMusic(1234)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#updateSheetMusic', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'patch',
        path: '/api/sheetmusic/1234/',
        params: {
          sheetmusic: 'data',
        },
      });
      return sheetmusic.updateSheetMusic(1234, 'data')(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#getComposers', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/composers/',
      });
      return sheetmusic.getComposers()(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#getTopSheetMusic', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/sheetmusic/top',
      });
      return sheetmusic.getTopSheetMusic(1234)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#getTrendingSheetMusic', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/sheetmusic/trending/',
        params: {
          days: 1234,
          results: 5678,
        },
      });
      return sheetmusic.getTrendingSheetMusic(1234, 5678)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#getSheetMusicList', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/sheetmusic/',
        params: {
          order_by: 1,
          page: 2,
          page_size: 3,
          sort_by: 4,
        },
      });
      return sheetmusic.getSheetMusicList({
        orderBy: 1,
        page: 2,
        pageSize: 3,
        sortBy: 4,
      })(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#getRating', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/sheetmusic/getrating',
        params: {
          sheet_id: 1234,
        },
      });
      return sheetmusic.getRating(1234)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#postRating', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/sheetmusic/rate/',
        params: {
          sheetmusic: 1234,
          value: 5,
        },
      });
      return sheetmusic.postRating(1234, 5)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#getUploads', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/sheetmusic/uploads/',
      });
      return sheetmusic.getUploads()(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#deleteSheetMusic', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'delete',
        path: '/api/sheetmusic/1234/',
      });
      return sheetmusic.deleteSheetMusic(1234)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#postVideo', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/video/',
        params: {
          link: 'link',
          title: 'title',
          grade: 'grade',
        },
      });
      return sheetmusic.postVideo('link', 'title', 'grade')(dispatch)
        .then(() => scope.done());
    });

    it('calls the correct API with the sheet music ID', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/video/',
        params: {
          link: 'link',
          title: 'title',
          grade: 'grade',
          sheetmusicId: 1234,
        },
      });
      return sheetmusic.postVideo('link', 'title', 'grade', 1234)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#increaseViewCount', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/sheetmusic/viewCount/',
        params: {
          sheetmusic_id: 1234,
        },
      });
      return sheetmusic.increaseViewCount(1234)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#search', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/search/',
        params: {
          query: 'myQuery',
        },
      });
      return sheetmusic.search('myQuery')(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#getComments', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/comment/',
        params: {
          sheetmusicId: 1234,
        },
      });
      return sheetmusic.getComments(1234)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#removeComment', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'delete',
        path: '/api/comment/1234/',
      });
      return sheetmusic.removeComment(1234)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#editComment', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'patch',
        path: '/api/comment/1234/',
        params: {
          commentText: 'commentText',
        },
      });
      return sheetmusic.editComment(1234, 'commentText')(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#undoRemoveComment', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/comment/1234/undodelete/',
      });
      return sheetmusic.undoRemoveComment(1234)(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#upvoteComment', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/commentupvote/',
        params: {
          commentId: 1234,
          sheetmusicId: 5678,
        },
      });
      return sheetmusic.upvoteComment(1234, 5678)(dispatch)
        .then(() => scope.done());
    });
  });
});
