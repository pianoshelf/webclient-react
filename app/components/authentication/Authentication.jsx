
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { addons } from 'react/addons';
import { RouteHandler } from 'react-router';

// Import other components
import NavBar from '../NavBar';

let { PureRenderMixin } = addons;

export default React.createClass({

  render() {
    return (
      <div className="authentication">
        <NavBar />
        <div className="authentication__box">
          <div className="authentication__box-inner">
            <div className="authentication__box-container">
              <RouteHandler />
            </div>
          </div>
        </div>
      </div>
    );
  },

});

