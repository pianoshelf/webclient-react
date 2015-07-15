
import fluxMixin from 'flummox/mixin';
import React from 'react';

export default React.createClass({
  mixins: [fluxMixin()],

  statics: {
    routeWillRun({ flux }) {
      return [
        flux.getActions('progress').resetProgress(),
        flux.getActions('login').getUser(flux),
      ];
    },
  },

  render() {
    return <div>{this.props.children}</div>;
  },
});

