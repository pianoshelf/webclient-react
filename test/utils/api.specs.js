
import nock from 'nock';

import config from '../../config';
import { get, post, patch, del } from '../../app/utils/api';

const ADDRESS = `http://localhost:${config.ports.django}`;

describe('utils/api', () => {
  describe('#get', () => {
    it('calls the correct endpoint', () => {
      const scope = nock(ADDRESS)
        .get('/api/some/random/url/')
        .reply(200, '"success"');
      return get({
        endpoint: '/some/random/url/',
      }).then(() => scope.done());
    });

    it('calls the correct auth endpoint', () => {
      const scope = nock(ADDRESS)
        .get('/api-auth/some/random/url/')
        .reply(200, '"success"');
      return get({
        endpoint: '/some/random/url/',
        auth: true,
      }).then(() => scope.done());
    });

    it('calls with correct params', () => {
      const scope = nock(ADDRESS)
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
      const scope = nock(ADDRESS)
        .post('/api/some/random/url/', {})
        .reply(200, '"success"');
      return post({
        endpoint: '/some/random/url/',
      }).then(() => scope.done());
    });

    it('calls with correct params', () => {
      const scope = nock(ADDRESS)
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
      const scope = nock(ADDRESS)
        .patch('/api/some/random/url/', {})
        .reply(200, '"success"');
      return patch({
        endpoint: '/some/random/url/',
      }).then(() => scope.done());
    });

    it('calls with correct params', () => {
      const scope = nock(ADDRESS)
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
      const scope = nock(ADDRESS)
        .delete('/api/some/random/url/', {})
        .reply(200, '"success"');
      return del({
        endpoint: '/some/random/url/',
      }).then(() => scope.done());
    });

    it('calls with correct params', () => {
      const scope = nock(ADDRESS)
        .delete('/api/some/random/url/', { hi: 'hi' })
        .reply(200, '"success"');
      return del({
        endpoint: '/some/random/url/',
        params: { hi: 'hi' },
      }).then(() => scope.done());
    });
  });
});
