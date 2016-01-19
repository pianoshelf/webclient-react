
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';

export default React.createClass({

  displayName: 'SheetMusic',

  propTypes: {
    children: React.PropTypes.node,
  },

  mixins: [PureRenderMixin],

  render() {
    return (
      <div className="sheetmusic">
        <NavBar />
        {this.props.children}
        <Footer />
      </div>
    );
  },

});
