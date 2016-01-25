
import React from 'react';

import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';

export default function SheetMusic({ children }) {
  return (
    <div className="sheetmusic">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}

SheetMusic.propTypes = {
  children: React.PropTypes.node,
};
