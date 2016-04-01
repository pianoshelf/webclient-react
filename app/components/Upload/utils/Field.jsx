
import React from 'react';

export default function Field({ tip, example, children }) {
  return (
    <div className="upload__options-input-field">
      <div className="upload__options-input">
        {children}
      </div>
      <If condition={tip}>
        <div className="upload__options-input-field-tip">
          <div className="upload__options-input-field-tip-box">
            <div className="upload__options-input-field-tip-box-tip">
              {tip}
            </div>
            <If condition={example}>
              <div className="upload__options-input-field-tip-box-example">
                <strong>e.g. </strong>
                {example}
              </div>
            </If>
          </div>
        </div>
      </If>
      <div className="upload__options-input-clear" />
    </div>
  );
}

Field.propTypes = {
  tip: React.PropTypes.string,
  example: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
};
