
import Helmet from 'react-helmet';
import React from 'react';

// Import other components
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

export default class NotFound extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  renderError() {
    const { children } = this.props;
    return (
      <div className="error__inner-container">
        <div className="error__inner-text-container">
          <div className="error__message-title">ERROR 404</div>
          <div className="error__message-details">
            <If condition={children}>
              {children}
            <Else />
              The page you were trying to find does not exist.
            </If>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="error">
        <Helmet title="404 Not Found" />
        <NavBar />
        <ResponsiveContainer className="error__container">
          {this.renderError()}
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  }
}
