
import Helmet from 'react-helmet';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';

import { dispatchAndPromise } from '../utils/reduxUtils';
import { getUser } from '../actions/login';

@asyncConnect({
  promise: (params, { store }) => dispatchAndPromise(store.dispatch, [
    getUser(store),
  ]),
})
export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <Helmet
          title="Welcome"
          titleTemplate="%s | PianoShelf - free piano sheet music"
          meta={[
            { name: 'description', content: 'PianoShelf' },
          ]}
        />
        {this.props.children}
      </div>
    );
  }
}
