
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default function LeftButton({ currentSlide, previousSlide }) {
  return (
    <a href="#" onClick={previousSlide} className="sheetmusic-viewer-arrow">
      <If condition={currentSlide !== 0}>
        <FontAwesome name="angle-left" />
      </If>
    </a>
  );
}

LeftButton.propTypes = {
  currentSlide: React.PropTypes.number,
  previousSlide: React.PropTypes.func,
};
