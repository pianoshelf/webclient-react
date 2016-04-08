
import Helmet from 'react-helmet';
import React from 'react';
import withState from 'recompose/withState';

// Import other components
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

const NAVBAR_DISAPPEARING_OFFSET = 50;

@withState('transparentNavBar', 'setNavBarTransparency', true)
export default class Profile extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    transparentNavBar: React.PropTypes.bool.isRequired,
    setNavBarTransparency: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.handleScrollChange();
    window.addEventListener('load', this.handleScrollChange);
    window.addEventListener('scroll', this.handleScrollChange);
    window.addEventListener('resize', this.handleScrollChange);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleScrollChange);
    window.removeEventListener('scroll', this.handleScrollChange);
    window.removeEventListener('resize', this.handleScrollChange);
  }

  handleScrollChange = () => {
    this.props.setNavBarTransparency(() => (
      window.pageYOffset < NAVBAR_DISAPPEARING_OFFSET
    ));
  };

  renderMainPanel() {
    return (
      <ResponsiveContainer className="profile__main-panel">
        <div style={{ height: 10000 }} />
      </ResponsiveContainer>
    );
  }

  render() {
    const { transparentNavBar } = this.props;
    const title = 'Profile';
    return (
      <div className="profile">
        <Helmet title={title} />
        <NavBar transparent={transparentNavBar} />
        <div className="profile__container">
          {this.renderMainPanel()}
        </div>
        <Footer />
      </div>
    );
  }
}
