
import fluxMixin from 'flummox/mixin';
import React from 'react';

export default React.createClass({
  mixins: [fluxMixin()],

  render() {
    return <div>{this.props.children}</div>;
  },
});

