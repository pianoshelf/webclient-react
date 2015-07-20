
import React from 'react';

export default React.createClass({
  render() {
    return (
      <p className="authentication__text">{this.props.children}</p>
    );
  },
});
