
import nock from 'nock';
import { expect } from 'chai';

import { get, post, patch, del } from '../../app/utils/api';

describe('utils/api', () => {
  describe('#get', () => {
    it('calls the correct endpoint', () => {
      nock('http://localhost:5000')
        .intercept('/api/some/random/url/', 'GET')
        .reply(200, '"success"');
      expect(
        get({
          endpoint: '/api/some/random/url/',
        })
      ).to.eventually.equal('success');
    });

    it('calls the correct auth endpoint', () => {
      nock('http://localhost:5000')
        .intercept('/api-auth/some/random/url/', 'GET', {})
        .reply(200, '"success"');
      expect(
        get({
          endpoint: '/some/random/url/',
          auth: true,
        })
      ).to.eventually.equal('success');
    });

    it('calls with correct params', () => {
      nock('http://localhost:5000')
        .intercept('/some/random/url/', 'GET', { hi: 'hi' })
        .reply(200, '"success"');
      expect(
        get({
          endpoint: '/some/random/url/',
          params: { hi: 'hi' },
        })
      ).to.eventually.equal('success');
    });
  });

  describe('#post', () => {
    it('calls the correct endpoint', () => {
      nock('http://localhost:5000')
        .intercept('/some/random/url/', 'POST', {})
        .reply(200, '"success"');
      expect(
        post({
          endpoint: '/some/random/url/',
        })
      ).to.eventually.equal('success');
    });

    it('calls with correct params', () => {
      nock('http://localhost:5000')
        .intercept('/some/random/url/', 'POST', { hi: 'hi' })
        .reply(200, '"success"');
      expect(
        post({
          endpoint: '/some/random/url/',
          params: { hi: 'hi' },
        })
      ).to.eventually.equal('success');
    });
  });

  describe('#patch', () => {
    it('calls the correct endpoint', () => {
      nock('http://localhost:5000')
        .intercept('/some/random/url/', 'PATCH', {})
        .reply(200, '"success"');
      expect(
        patch({
          endpoint: '/some/random/url/',
        })
      ).to.eventually.equal('success');
    });

    it('calls with correct params', () => {
      nock('http://localhost:5000')
        .intercept('/some/random/url/', 'PATCH', { hi: 'hi' })
        .reply(200, '"success"');
      expect(
        patch({
          endpoint: '/some/random/url/',
          params: { hi: 'hi' },
        })
      ).to.eventually.equal('success');
    });
  });

  describe('#del', () => {
    it('calls the correct endpoint', () => {
      nock('http://localhost:5000')
        .intercept('/some/random/url/', 'DELETE', {})
        .reply(200, '"success"');
      expect(
        del({
          endpoint: '/some/random/url/',
        })
      ).to.eventually.equal('success');
    });

    it('calls with correct params', () => {
      nock('http://localhost:5000')
        .intercept('/some/random/url/', 'DELETE', { hi: 'hi' })
        .reply(200, '"success"');
      expect(
        del({
          endpoint: '/some/random/url/',
          params: { hi: 'hi' },
        })
      ).to.eventually.equal('success');
    });
  });
});
