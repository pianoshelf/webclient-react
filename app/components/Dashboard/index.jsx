
import React from 'react';

// Import other components
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

export default class Dashboard extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  renderDashboard() {
    return null;
  }

  render() {
    return (
      <div className="dashboard">
        <NavBar />
        <ResponsiveContainer className="dashboard__container">
          {this.renderDashboard()}
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  }
}
