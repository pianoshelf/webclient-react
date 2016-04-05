
import React from 'react';

// Import other components
import MenuItem from './Utils/MenuItem';
import MenuList from './Utils/MenuList';
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

export default class Settings extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  renderLinks() {
    return (
      <MenuList title="Settings">
        <MenuItem name="Profile" link="/settings/profile/" />
        <MenuItem name="Change Password" link="/settings/password/" />
      </MenuList>
    );
  }

  renderSettingsWrapper() {
    return (
      <div className="settings__panel">
        <div className="settings__links">
          {this.renderLinks()}
        </div>
        <div className="settings__content">
          {this.props.children}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="settings">
        <NavBar />
        <ResponsiveContainer className="settings__container">
          {this.renderSettingsWrapper()}
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  }
}
