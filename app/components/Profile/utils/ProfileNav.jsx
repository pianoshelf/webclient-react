
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { Link } from 'react-router';

function getClassNameFromURL(linkName, url) {
  return classNames('profile__content-panel-content-link', {
    'profile__content-panel-content-link--active': linkName === url,
  });
}

export default function ProfileNav({ username, url }) {
  return (
    <ul className="profile__content-panel-content-link-list">
      <li className="profile__content-panel-content-link-item">
        <Link
          to={`/${username}`}
          className={getClassNameFromURL('shelf', url)}
        >
          <FontAwesome
            name="music"
            className="profile__content-panel-content-link-icon"
          />
          Shelf
        </Link>
      </li>
      <li className="profile__content-panel-content-link-item">
        <Link
          to={`/${username}/uploads`}
          className={getClassNameFromURL('uploads', url)}
        >
          <FontAwesome
            name="file-text-o"
            className="profile__content-panel-content-link-icon"
          />
          Uploads
        </Link>
      </li>
    </ul>
  );
}

