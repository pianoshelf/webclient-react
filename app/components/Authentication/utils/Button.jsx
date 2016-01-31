
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default function Button({ submittedIf, disableIf, children, color }) {
  const className = classNames('authentication__button', `authentication__button--${color}`);

  return (
    <button className={className} type="submit" disabled={disableIf}>
      <If condition={submittedIf}>
        <FontAwesome name="cog" spin />
      <Else />
        <span>
          {children}
        </span>
      </If>
    </button>
  );
}

Button.propTypes = {
  /**
   * Condition in which to display the cog instead of the text.
   */
  submittedIf: React.PropTypes.bool.isRequired,

  /**
   * Condition in which to disable the button.
   */
  disableIf: React.PropTypes.bool.isRequired,

  /**
   * Children of the element
   */
  children: React.PropTypes.node,

  /**
   * Color of the button
   */
  color: React.PropTypes.oneOf([
    'orange',
    'blue-light',
    'red',
    'facebook',
  ]).isRequired,
};
