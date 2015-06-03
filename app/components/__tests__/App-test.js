
jest.dontMock('../App');

import {TestUtils} from 'react-addons';

import App from '../App';

describe('App', () => {
  it('has working tests', () => {
    expect(1 + 1).toBe(2);
  });
});
