
import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="authentication__title">{this.props.children}</div>
    );
  },
});
