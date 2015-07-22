
import React from 'react';

export default React.createClass({

  propTypes: {
    children: React.PropTypes.node,
  },

  render() {
    return (
      <p className="authentication__text">{this.props.children}</p>
    );
  },
});
