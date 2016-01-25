
import React from 'react';

export default function Detail({ title, children }) {
  return (
    <div className="sheetmusic__detail">
      <div className="sheetmusic__detail-title">{title}</div>
      <div className="sheetmusic__detail-content">{children}</div>
    </div>
  );
}

Detail.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
};
