
import React from 'react';
import { addons } from 'react/addons';

import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

let { PureRenderMixin } = addons;

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
        <ResponsiveContainer className="sheetmusic__container">
          {this.props.children}
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  },

});

