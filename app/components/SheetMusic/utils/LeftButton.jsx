
import FontAwesome from 'react-fontawesome';
import React from 'react';

function previous(previousSlide) {
  return event => {
    event.preventDefault();
    previousSlide();
  };
}

export default function LeftButton({ currentSlide, previousSlide }) {
  return (
    <a href="#" onClick={previous(previousSlide)} className="sheetmusic-viewer-arrow">
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
