
import React from 'react';
import { addons } from 'react/addons';

// Import other components
import NavBar from '../Fixtures/NavBar';
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
        {this.props.children}
      </div>
    );
  },

});
