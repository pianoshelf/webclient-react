
import React from 'react';
import { addons } from 'react/addons';

// Import other components
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../ResponsiveContainer';
let { PureRenderMixin } = addons;

export default React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    children: React.PropTypes.node,
  },

  render() {
    return (
      <div className="static">
        <NavBar />
        <ResponsiveContainer className="static__container">
          {this.props.children}
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  },

});
