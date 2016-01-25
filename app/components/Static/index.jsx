
import React from 'react';

// Import other components
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

export default function Static({ children }) {
  return (
    <div className="static">
      <NavBar />
      <ResponsiveContainer className="static__container">
        {children}
      </ResponsiveContainer>
      <Footer />
    </div>
  );
}

Static.propTypes = {
  children: React.PropTypes.node,
};
