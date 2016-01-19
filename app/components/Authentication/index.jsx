
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

// Import other components
import NavBar from '../Fixtures/NavBar';

export default React.createClass({

  displayName: 'Authentication',

  propTypes: {
    children: React.PropTypes.node,
  },

  mixins: [PureRenderMixin],

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
