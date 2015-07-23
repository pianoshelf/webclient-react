
import fluxMixin from 'flummox/mixin';
import Helmet from 'react-helmet';
import React from 'react';

export default React.createClass({
  mixins: [fluxMixin()],

  statics: {
    routeWillRun({ flux }) {
      return flux.getActions('login').getUser(flux);
    },
  },

  propTypes: {
    children: React.PropTypes.node,
  },

  render() {
    return (
      <Helmet
        title="Welcome"
        titleTemplate="%s | PianoShelf - free piano sheet music"
        meta={[
          { name: 'description', content: 'PianoShelf' },
        ]}>
        {this.props.children}
      </Helmet>
    );
  },
});
