
import fluxMixin from 'flummox/mixin';
import React from 'react';
import { RouteHandler } from 'react-router';

const App = React.createClass({
  mixins: [fluxMixin()],

  render() {
    return <RouteHandler {...this.props} />;
  },
});

export default App;

