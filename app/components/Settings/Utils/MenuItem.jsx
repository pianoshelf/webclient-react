
import React from 'react';
import { Link } from 'react-router';

export default function MenuItem({ name, link }) {
  return (
    <li className="settings__links-menu-list-item">
      <Link
        className="settings__links-menu-link"
        activeClassName="settings__links-menu-link--active"
        to={link}
      >
        {name}
      </Link>
    </li>
  );
}

MenuItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
};
