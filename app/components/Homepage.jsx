
// Import external modules
import Autosuggest from 'react-autosuggest';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
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

  getSuggestions(input, callback) {
    const regex = new RegExp('^' + input, 'i');
    const suggestions = ['hi', 'hi2'].filter(suburb => regex.test(suburb));

    setTimeout(() => callback(null, suggestions), 300); // Emulate API call
  },

  renderMainPanel_() {
    let inputAttributes = {
      className: 'homepage__main-search-input-field',
      placeholder: 'Search sheet music...',
    };

    return (
      <ResponsiveContainer className="homepage__panel-main">
        <div ref="main" className="homepage__main">
          <h2 className="homepage__main-message">
            Explore, share, and download sheet music for free.
          </h2>
          <div className="homepage__main-search">
            <div className="homepage__main-search-input">
              <FontAwesome className="homepage__main-search-input-icon" name="music" />
              <Autosuggest suggestions={this.getSuggestions} inputAttributes={inputAttributes} />
            </div>
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
      <ResponsiveContainer className="homepage__panel-information">
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

