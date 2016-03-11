
import React from 'react';

export default function Title({ children }) {
  return (
    <div className="authentication__title">{children}</div>
  );
}

Title.propTypes = {
  children: React.PropTypes.node,
};
