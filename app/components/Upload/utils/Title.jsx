
import React from 'react';

export default function Title({ step, text }) {
  return (
    <div className="upload__options-title">
      <span className="upload__options-title-step">
        Step {step}
      </span>
      {text}
    </div>
  );
}

Title.propTypes = {
  step: React.PropTypes.number,
  text: React.PropTypes.string.isRequired,
};
