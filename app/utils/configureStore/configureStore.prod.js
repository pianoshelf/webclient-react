
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../../reducers';

const enhancer = applyMiddleware(thunkMiddleware);

export default function configureStore(initialState) {
  return createStore(reducers, initialState, enhancer);
}
