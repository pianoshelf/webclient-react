
import React from 'react';

// Import other components
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

export default function Profile({ children }) {
  return (
    <div className="profile">
      <NavBar />
      <ResponsiveContainer className="profile__container">
        {children}
      </ResponsiveContainer>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  children: React.PropTypes.node,
};
