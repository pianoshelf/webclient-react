
// Import external modules
import Autosuggest from 'react-autosuggest';
import fluxMixin from 'flummox/mixin';
import React from 'react';
import { Link } from 'react-router';

// Import components
import NavBar from 'app/components/NavBar';
import ResponsiveContainer from 'app/components/ResponsiveContainer';

export default React.createClass({
  mixins: [fluxMixin(['login'])],

  render() {
    return (
      <div className="homepage">
        <NavBar homepage={true} yOffsetLimit={50} />
        {this.renderMainPanel_()}
        {this.renderInfoPanel_()}
      </div>
    );
  },

  renderMainPanel_() {
    let inputAttributes = {
      className: 'homepage__main-search-input',
      placeholder: 'Search sheet music...',
    };

    return (
      <ResponsiveContainer className="homepage__panel--main">
        <div ref="main" className="homepage__main">
          <h2 className="homepage__main-message">
            Explore, share, and download sheet music for free.
          </h2>
          <div className="homepage__main-search">
            <Autosuggest inputAttributes={inputAttributes} />
          </div>
          <div className="homepage__main-register">
            or <Link to="register" className="homepage__main-register-link">sign up now</Link>.
          </div>
        </div>
      </ResponsiveContainer>
    );
  },

  renderInfoPanel_() {
    return (
      <ResponsiveContainer className="homepage__panel--information">
        <div className="homepage__info-box homepage__info-box--top-left">

        </div>
        <div className="homepage__info-box homepage__info-box--bottom-left">

        </div>
        <div className="homepage__info-box homepage__info-box--top-right">

        </div>
        <div className="homepage__info-box homepage__info-box--bottom-right">

        </div>
      </ResponsiveContainer>
    );
  }

});

