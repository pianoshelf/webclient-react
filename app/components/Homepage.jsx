
import fluxMixin from 'flummox/mixin';
import React from 'react';

// Import components
import NavBar from 'app/components/NavBar';
import ResponsiveContainer from 'app/components/ResponsiveContainer';

export default React.createClass({
  mixins: [fluxMixin(['login'])],

  getInitialState() {
    return {
      ayyLmao: 'ayy lmao',
    };
  },

  render() {
    return (
      <div className="homepage">
        <NavBar homepage={true} />
        <ResponsiveContainer className="homepage__panel--main">
          <div className="homepage__main">
            <div className="homepage__main-message">
              Explore, share, and download sheet music for free.
            </div>
          </div>
        </ResponsiveContainer>
        <ResponsiveContainer className="homepage__panel--information">
          <div className="homepage__info-box">
          </div>
        </ResponsiveContainer>
      </div>
    );
  },

});

