
import React from 'react';

import { sheetMusicPropType } from '../../../utils/sheetMusicUtils';

export default React.createClass({
  propTypes: {
    /**
     * Make sure a valid sheet music was inputted.
     */
    sheetMusic: sheetMusicPropType().isRequired,
  },

  render() {
    return (
      <div className="search__result">
        {this.props.sheetMusic.title}
      </div>
    );
  },
});
