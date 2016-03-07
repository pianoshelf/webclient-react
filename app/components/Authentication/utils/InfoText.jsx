
import React from 'react';

export default function InfoText({ children }) {
  return (
    <p className="authentication__text">{children}</p>
  );
}

InfoText.propTypes = {
  children: React.PropTypes.node,
};
