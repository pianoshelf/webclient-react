
import { expect } from 'chai';
import { spy } from 'sinon';

import createAction from '../../app/utils/createAction';

const ACTION_NAME = 'ACTION_NAME';

describe('utils/createAction', () => {
  it('dispatches with start progress state', () => {
    const dispatch = spy();
    const action = createAction(ACTION_NAME, () => {});
    action()(dispatch);
    expect(dispatch).to.have.been.calledWithExactly({
      type: ACTION_NAME,
      progress: 'start',
    });
  });

  it('returns the error progress state', () => {
    const dispatch = value => value;
    const action = createAction(ACTION_NAME, () => ({
      error: true,
      code: 123,
      payload: { hi: 'hi' },
    }));
    expect(action()(dispatch)).to.eventually.deep.equal({
      type: ACTION_NAME,
      progress: 'error',
      code: 123,
      payload: { hi: 'hi' },
    });
  });

  it('dispatches with error progress state', () => {
    const dispatch = spy();
    const action = createAction(ACTION_NAME, () => ({
      error: true,
      code: 123,
      payload: { hi: 'hi' },
    }));
    action()(dispatch).then(() => {
      expect(dispatch).to.have.been.calledWithExactly({
        type: ACTION_NAME,
        progress: 'error',
        code: 123,
        payload: { hi: 'hi' },
      });
    });
  });

  it('returns the done progress state', () => {
    const dispatch = value => value;
    const action = createAction(ACTION_NAME, () => ({
      error: false,
      payload: { hi: 'hi' },
    }));
    expect(action()(dispatch)).to.eventually.deep.equal({
      type: ACTION_NAME,
      progress: 'done',
      payload: { hi: 'hi' },
    });
  });

  it('dispatches with done progress state', () => {
    const dispatch = spy();
    const action = createAction(ACTION_NAME, () => ({
      error: false,
      payload: { hi: 'hi' },
    }));
    action()(dispatch).then(() => {
      expect(dispatch).to.have.been.calledWithExactly({
        type: ACTION_NAME,
        progress: 'done',
        payload: { hi: 'hi' },
      });
    });
  });
});
