
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { addons } from 'react/addons';
import { RouteHandler } from 'react-router';

let { PureRenderMixin } = addons;

// Import other components
import NavBar from 'app/components/NavBar';

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

