
import React from 'react';

export default function MenuList({ title, children }) {
  return (
    <div className="settings__links-menu">
      <div className="settings__links-menu-title">
        {title}
      </div>
      <ul className="settings__links-menu-list">
        {children}
      </ul>
    </div>
  );
}

MenuList.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};
