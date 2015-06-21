
import fluxMixin from 'flummox/mixin';
import React from 'react';

// Import components
import NavBar from 'app/components/NavBar';

export default React.createClass({
  mixins: [fluxMixin(['login'])],

  getInitialState() {
    return {
      ayyLmao: 'ayy lmao',
    };
  },

  render() {
    return (
      <div>
        <NavBar homepage={true} />


      </div>
    );
  },

});

