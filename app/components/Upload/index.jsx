
import React from 'react';

// Import other components
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

export default class Upload extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  renderUploader() {
    return null;
  }

  render() {
    return (
      <div className="upload">
        <NavBar />
        <ResponsiveContainer className="upload__container">
          {this.renderUploader()}
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  }
}
