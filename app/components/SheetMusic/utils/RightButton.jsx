
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default React.createClass({
  propTypes: {
    currentSlide: React.PropTypes.number,
    slideCount: React.PropTypes.number,
    nextSlide: React.PropTypes.func,
  },
  render() {
    if (this.props.currentSlide + 1 === this.props.slideCount) return null;
    return (
      <a href="#" onClick={this.props.nextSlide}
        className="sheetmusic-viewer-arrow">
        <FontAwesome name="angle-right" />
      </a>
    );
  },
});
