
import nock from 'nock';

import { get, post, patch, del } from '../../app/utils/api';

describe('utils/api', () => {
  describe('#get', () => {
    it('calls the correct endpoint', () => {
      const scope = nock('http://localhost:5000')
        .get('/api/some/random/url/')
        .reply(200, '"success"');
      return get({
        endpoint: '/some/random/url/',
      }).then(() => scope.done());
    });

    it('calls the correct auth endpoint', () => {
      const scope = nock('http://localhost:5000')
        .get('/api-auth/some/random/url/')
        .reply(200, '"success"');
      return get({
        endpoint: '/some/random/url/',
        auth: true,
      }).then(() => scope.done());
    });

    it('calls with correct params', () => {
      const scope = nock('http://localhost:5000')
        .get('/api/some/random/url/')
        .query({ hi: 'hi' })
        .reply(200, '"success"');
      return get({
        endpoint: '/some/random/url/',
        params: { hi: 'hi' },
      }).then(() => scope.done());
    });
  });

  describe('#post', () => {
    it('calls the correct endpoint', () => {
      const scope = nock('http://localhost:5000')
        .post('/api/some/random/url/', {})
        .reply(200, '"success"');
      return post({
        endpoint: '/some/random/url/',
      }).then(() => scope.done());
    });

    it('calls with correct params', () => {
      const scope = nock('http://localhost:5000')
        .post('/api/some/random/url/', { hi: 'hi' })
        .reply(200, '"success"');
      return post({
        endpoint: '/some/random/url/',
        params: { hi: 'hi' },
      }).then(() => scope.done());
    });
  });

  describe('#patch', () => {
    it('calls the correct endpoint', () => {
      const scope = nock('http://localhost:5000')
        .patch('/api/some/random/url/', {})
        .reply(200, '"success"');
      return patch({
        endpoint: '/some/random/url/',
      }).then(() => scope.done());
    });

    it('calls with correct params', () => {
      const scope = nock('http://localhost:5000')
        .patch('/api/some/random/url/', { hi: 'hi' })
        .reply(200, '"success"');
      return patch({
        endpoint: '/some/random/url/',
        params: { hi: 'hi' },
      }).then(() => scope.done());
    });
  });

  describe('#del', () => {
    it('calls the correct endpoint', () => {
      const scope = nock('http://localhost:5000')
        .delete('/api/some/random/url/', {})
        .reply(200, '"success"');
      return del({
        endpoint: '/some/random/url/',
      }).then(() => scope.done());
    });

    it('calls with correct params', () => {
      const scope = nock('http://localhost:5000')
        .delete('/api/some/random/url/', { hi: 'hi' })
        .reply(200, '"success"');
      return del({
        endpoint: '/some/random/url/',
        params: { hi: 'hi' },
      }).then(() => scope.done());
    });
  });
});
