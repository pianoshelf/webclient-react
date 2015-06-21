/**
 * Class for the top nav bar.
 */

// Import external modules
import React from 'react';

export default React.createClass({

  render() {
    return (
      <div className="navbar">
        <div className="navbar__container">
          <div className="navbar__logo" />
          <div className="navbar__title">PianoShelf</div>
          <div className="navbar__title--beta">BETA</div>
        </div>
      </div>
    );
  },
});
