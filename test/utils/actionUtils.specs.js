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
        meta: undefined,
      });
    });

    it('returns payload when it is a string', () => {
      expect(actionDone('hi')).to.deep.equal({
        error: false,
        payload: 'hi',
        meta: undefined,
      });
    });

    it('returns payload when it is an object', () => {
      expect(actionDone({ hi: 'hi' })).to.deep.equal({
        error: false,
        payload: { hi: 'hi' },
        meta: undefined,
      });
    });

    it('returns when no payload is provided', () => {
      expect(actionDone()).to.deep.equal({
        error: false,
        meta: undefined,
      });
    });
  });

  describe('#actionError', () => {
    it('returns payload when it is a number', () => {
      expect(actionError(0, 123)).to.deep.equal({
        error: true,
        meta: 123,
        code: 0,
      });
    });

    it('returns meta when it is a string', () => {
      expect(actionError(0, 'hi')).to.deep.equal({
        error: true,
        meta: 'hi',
        code: 0,
      });
    });

    it('returns meta when it is an object', () => {
      expect(actionError(0, { hi: 'hi' })).to.deep.equal({
        error: true,
        meta: { hi: 'hi' },
        code: 0,
      });
    });

    it('returns code when it is a number', () => {
      expect(actionError(65535, 'hi')).to.deep.equal({
        error: true,
        meta: 'hi',
        code: 65535,
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
