
import FontAwesome from 'react-fontawesome';
import React from 'react';

function next(nextSlide) {
  return event => {
    event.preventDefault();
    nextSlide();
  };
}

export default function RightButton({ currentSlide, nextSlide, slideCount }) {
  return (
    <a href="#" onClick={next(nextSlide)} className="sheetmusic-viewer-arrow">
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
