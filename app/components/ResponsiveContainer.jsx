
// Import external modules
import classNames from 'classnames';
import React from 'react';

// Export responsive container
export default React.createClass({
  render() {
    return (
      <div className={classNames('responsivecontainer', this.props.className)}>
        <div className="responsivecontainer__inner">
          {this.props.children}
        </div>
      </div>
    );
  }
});

