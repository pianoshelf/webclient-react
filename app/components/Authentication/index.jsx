
import React from 'react';

// Import other components
import NavBar from '../Fixtures/NavBar';

export default function Authentication({ children }) {
  return (
    <div className="authentication">
      <NavBar />
      <div className="authentication__box">
        <div className="authentication__box-inner">
          <div className="authentication__box-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Authentication.propTypes = {
  children: React.PropTypes.node,
};
