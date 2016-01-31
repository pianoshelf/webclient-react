
import React from 'react';

// Import other components
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

export default function Search({ children }) {
  return (
    <div className="search">
      <NavBar />
      <ResponsiveContainer className="search__container">
        {children}
      </ResponsiveContainer>
      <Footer />
    </div>
  );
}

Search.propTypes = {
  children: React.PropTypes.node,
};
