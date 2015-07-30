
import React from 'react';
import { addons } from 'react/addons';

// Import other components
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';
let { PureRenderMixin } = addons;

export default React.createClass({

  displayName: 'Search',

  mixins: [PureRenderMixin],

  propTypes: {
    children: React.PropTypes.node,
  },

  render() {
    return (
      <div className="search">
        <NavBar />
        <ResponsiveContainer className="search__container">
          {this.props.children}
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  },

});
