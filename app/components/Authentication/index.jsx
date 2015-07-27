
import React from 'react';
import { addons } from 'react/addons';

// Import other components
import NavBar from '../Fixtures/NavBar';
let { PureRenderMixin } = addons;

export default React.createClass({

  displayName: 'Authentication',

  mixins: [PureRenderMixin],

  propTypes: {
    children: React.PropTypes.node,
  },

  render() {
    return (
      <div className="authentication">
        <NavBar />
        <div className="authentication__box">
          <div className="authentication__box-inner">
            <div className="authentication__box-container">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  },

});

