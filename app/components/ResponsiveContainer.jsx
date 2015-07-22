
// Import external modules
import classNames from 'classnames';
import React from 'react';

// Export responsive container
export default React.createClass({

  propTypes: {

    // Children of the element
    children: React.PropTypes.node,

    // Class name for this element
    className: React.PropTypes.string,
  },

  render() {
    return (
      <div className={classNames('responsive-container', this.props.className)}>
        <div className="responsive-container__inner">
          {this.props.children}
        </div>
      </div>
    );
  },

});

