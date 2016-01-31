
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default function RightButton({ currentSlide, nextSlide, slideCount }) {
  return (
    <a href="#" onClick={nextSlide} className="sheetmusic-viewer-arrow">
      <If condition={currentSlide + 1 !== slideCount}>
        <FontAwesome name="angle-right" />
      </If>
    </a>
  );
}

RightButton.propTypes = {
  currentSlide: React.PropTypes.number,
  previousSlide: React.PropTypes.func,
  slideCount: React.PropTypes.number,
};
