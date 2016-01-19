
import Fa from 'react-fontawesome';
import React from 'react';

export default React.createClass({
  propTypes: {
    currentSlide: React.PropTypes.number,
    slideCount: React.PropTypes.number,
    previousSlide: React.PropTypes.func,
  },
  render() {
    if (this.props.currentSlide === 0) return null;
    return (
      <a href="#" onClick={this.props.previousSlide}
        className="sheetmusic-viewer-arrow"
      >
        <Fa name="angle-left" />
      </a>
    );
  },
});
