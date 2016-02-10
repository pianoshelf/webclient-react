
import { expect } from 'chai';
import sinon from 'sinon';

import createAction from '../../app/utils/createAction';

const ACTION_NAME = 'ACTION_NAME';

describe('utils/createAction', () => {
  it('dispatches with start progress state', () => {
    const dispatch = sinon.spy();
    createAction(ACTION_NAME)(dispatch);
    expect(dispatch).to.have.been.calledWithExactly({
      type: ACTION_NAME,
      progress: 'start',
    });
  });

  it('dispatches with error progress state', () => {
    const dispatch = sinon.spy();
    createAction(ACTION_NAME, {
      error: true,
      code: 123,
      payload: { hi: 'hi' },
    })(dispatch).then(() => {
      expect(dispatch).to.have.been.calledWithExactly({
        type: ACTION_NAME,
        progress: 'error',
        code: 123,
        payload: { hi: 'hi' },
      });
    });
  });

  it('dispatches with done progress state', () => {
    const dispatch = sinon.spy();
    createAction(ACTION_NAME, {
      error: false,
      payload: { hi: 'hi' },
    })(dispatch).then(() => {
      expect(dispatch).to.have.been.calledWithExactly({
        type: ACTION_NAME,
        progress: 'done',
        payload: { hi: 'hi' },
      });
    });
  });
});
