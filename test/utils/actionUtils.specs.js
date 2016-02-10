/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';

import {
  actionDone,
  actionError,
  isActionError,
  isDispatchedActionError,
} from '../../app/utils/actionUtils';

describe('utils/actionUtils', () => {
  describe('#actionDone', () => {
    it('returns payload when it is a number', () => {
      expect(actionDone(123)).to.deep.equal({
        error: false,
        payload: 123,
      });
    });

    it('returns payload when it is a string', () => {
      expect(actionDone('hi')).to.deep.equal({
        error: false,
        payload: 'hi',
      });
    });

    it('returns payload when it is an object', () => {
      expect(actionDone({ hi: 'hi' })).to.deep.equal({
        error: false,
        payload: { hi: 'hi' },
      });
    });

    it('returns when no payload is provided', () => {
      expect(actionDone()).to.deep.equal({
        error: false,
      });
    });
  });

  describe('#actionError', () => {
    it('returns payload when it is a number', () => {
      expect(actionError(0, 123)).to.deep.equal({
        error: true,
        payload: 123,
        code: 0,
      });
    });

    it('returns payload when it is a string', () => {
      expect(actionError(0, 'hi')).to.deep.equal({
        error: true,
        payload: 'hi',
        code: 0,
      });
    });

    it('returns payload when it is an object', () => {
      expect(actionError(0, { hi: 'hi' })).to.deep.equal({
        error: true,
        payload: { hi: 'hi' },
        code: 0,
      });
    });

    it('returns code when it is a number', () => {
      expect(actionError(65535, 'hi')).to.deep.equal({
        error: true,
        payload: 'hi',
        code: 65535,
      });
    });

    it('returns code when no payload is provided', () => {
      expect(actionError(100)).to.deep.equal({
        error: true,
        code: 100,
      });
    });
  });

  describe('#isActionError', () => {
    it('returns the correct value', () => {
      expect(isActionError(actionDone())).to.be.false;
      expect(isActionError(actionError(123))).to.be.true;
    });
  });

  describe('#isDispatchedActionError', () => {
    it('returns the correct value', () => {
      expect(isDispatchedActionError({ type: 'ACTION', progress: 'done' })).to.be.false;
      expect(isDispatchedActionError({ type: 'ACTION', progress: 'error' })).to.be.true;
    });
  });
});
