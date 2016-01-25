
// Import external modules
import classNames from 'classnames';
import React from 'react';

export default function ResponsiveContainer({ children, className }) {
  return (
    <div className={classNames('responsive-container', className)}>
      <div className="responsive-container__inner">
        {children}
      </div>
    </div>
  );
}

ResponsiveContainer.propTypes = {
  /**
   * Children of the element.
   */
  children: React.PropTypes.node,

  /**
   * Class name for this element.
   */
  className: React.PropTypes.string,
};
