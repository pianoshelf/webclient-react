
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import DevTools from '../../components/DevTools';
import reducers from '../../reducers';

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument(),
);

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, enhancer);

  // Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../../reducers', () => {
      const nextRootReducer = require('../../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
