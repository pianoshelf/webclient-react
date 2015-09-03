
import React from 'react';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    children: React.PropTypes.node,
  },

  render() {
    return (
      <div className="sheetmusic__detail">
        <div className="sheetmusic__detail-title">{this.props.title}</div>
        <div className="sheetmusic__detail-content">{this.props.children}</div>
      </div>
    );
  },
});
