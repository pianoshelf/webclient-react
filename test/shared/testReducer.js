
import { expect } from 'chai';

export default function testReducer(reducer) {
  return function assertReducer({ from, to, action }) {
    expect(reducer(from, action)).to.deep.equal(to);
  }
}
