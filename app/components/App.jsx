
import fluxMixin from 'flummox/mixin';
import React from 'react';
import { RouteHandler } from 'react-router';

export default React.createClass({
  mixins: [fluxMixin()],

  render() {
    return <RouteHandler />;
  },
});

