/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import { spy } from 'sinon';

import createReducer from '../../app/utils/createReducer';

// Sample action names
const ACTION_NAME_1 = 'ACTION_NAME_1';
const ACTION_NAME_2 = 'ACTION_NAME_2';
const ACTION_NAME_3 = 'ACTION_NAME_3';

describe('utils/createReducer', () => {
  it('calls the right function given an action type', () => {
    const reducer = createReducer({}, {
      [ACTION_NAME_1]: () => ({ actionCalled: 1 }),
      [ACTION_NAME_2]: () => ({ actionCalled: 2 }),
      [ACTION_NAME_3]: () => ({ actionCalled: 3 }),
    });
    expect(
      reducer({}, {
        type: ACTION_NAME_2,
        progress: 'done',
      })
    ).to.deep.equal({ actionCalled: 2 });
  });

  it('returns prevState when handler is a function and progress is not done', () => {
    const innerReducer = spy();
    const reducer = createReducer({}, {
      [ACTION_NAME_1]: innerReducer,
    });
    expect(
      reducer({
        hello: 'hello',
      }, { type: ACTION_NAME_1, progress: 'start' })
    ).to.deep.equal({
      hello: 'hello',
    });
    expect(innerReducer).to.not.have.been.called;
  });

  it('calls the correct progress function when object is provided', () => {
    const startReducer = spy();
    const progressReducer = spy();
    const doneReducer = spy();
    const errorReducer = spy();
    const reducer = createReducer({}, {
      [ACTION_NAME_1]: {
        start: startReducer,
        progress: progressReducer,
        done: doneReducer,
        error: errorReducer,
      },
    });
    reducer({}, {
      type: ACTION_NAME_1,
      progress: 'progress',
    });
    expect(startReducer).to.not.have.been.called;
    expect(progressReducer).to.have.been.called;
    expect(doneReducer).to.not.have.been.called;
    expect(errorReducer).to.not.have.been.called;
  });

  it('calls inner reducer with only prevState when progress is \'start\'', () => {
    const innerReducer = spy();
    const reducer = createReducer({}, {
      [ACTION_NAME_1]: { start: innerReducer },
    });
    reducer({ hi: 'hi' }, {
      type: ACTION_NAME_1,
      progress: 'start',
    });
    expect(innerReducer).to.have.been.calledWithExactly({ hi: 'hi' });
  });

  it('calls inner reducer with prevState and payload when progress is \'progress\'', () => {
    const innerReducer = spy();
    const reducer = createReducer({}, {
      [ACTION_NAME_1]: { progress: innerReducer },
    });
    reducer({ hi: 'hi' }, {
      type: ACTION_NAME_1,
      progress: 'progress',
      payload: { hello: 'hello' },
    });
    expect(innerReducer).to.have.been.calledWithExactly({ hi: 'hi' }, { hello: 'hello' });
  });

  it('calls inner reducer with prevState and payload when progress is \'done\'', () => {
    const innerReducer = spy();
    const reducer = createReducer({}, {
      [ACTION_NAME_1]: { done: innerReducer },
    });
    reducer({ hi: 'hi' }, {
      type: ACTION_NAME_1,
      progress: 'done',
      payload: { hello: 'hello' },
    });
    expect(innerReducer).to.have.been.calledWithExactly({ hi: 'hi' }, { hello: 'hello' });
  });

  it('calls inner reducer with prevState, payload, and code when progress is \'error\'', () => {
    const innerReducer = spy();
    const reducer = createReducer({}, {
      [ACTION_NAME_1]: { error: innerReducer },
    });
    reducer({ hi: 'hi' }, {
      type: ACTION_NAME_1,
      progress: 'error',
      code: 123,
      meta: { hello: 'hello' },
    });
    expect(innerReducer).to.have.been.calledWithExactly({ hi: 'hi' }, 123, { hello: 'hello' });
  });

  it('returns original state when there is an invalid state', () => {
    const reducer = createReducer({}, {
      [ACTION_NAME_1]: {
        start() {},
        done() {},
        error() {},
      },
    });
    expect(reducer({
      hi: 'hi',
      hello: 'hello',
    }, {
      type: ACTION_NAME_1,
      progress: 'progress',
    })).to.deep.equal({
      hi: 'hi',
      hello: 'hello',
    });
  });
});
