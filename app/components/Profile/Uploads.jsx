
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ProfileNav from './utils/ProfileNav';
import SheetMusicResult from '../Misc/SheetMusicResult';
import { getUploadsForUser } from '../../actions/profile';

@asyncConnect({
  promise: (params, { store, request }) => {
    const { username } = params;
    return store.dispatch(getUploadsForUser(username, 1, request));
  },
})
@connect(
  state => ({
    uploads: state.profile.uploads,
    profile: state.profile.profile.user,
  }),
)
export default class Uploads extends React.Component {
  renderEmptyList() {
    if (true) {
      return (
        <div className="profile__content-not-found">
          No uploads
        </div>
      );
    }

    return (
      <div className="profile__content-empty">
        <Link to="/browse" className="profile__content-empty-link">
          <FontAwesome name="search" className="profile__content-empty-link-icon" />
          <div className="profile__content-empty-link-message">
            You do not have any sheet music in your shelf.
          </div>
          <div className="profile__content-empty-link-message">
            Browse sheet music now!
          </div>
        </Link>
      </div>
    );
  }

  render() {
    const { profile, uploads } = this.props;
    const { username } = profile;

    const sheetMusicElements = uploads.map((sheetMusic, index) => (
      <li className="profile__content-upload-list-item" key={index}>
        <SheetMusicResult sheetMusic={sheetMusic} />
      </li>
    ));

    return (
      <div>
        <ProfileNav url="uploads" username={username} />
        <If condition={uploads.length === 0}>
          {this.renderEmptyList()}
        <Else />
          <ul className="profile__content-upload-list">
            {sheetMusicElements}
          </ul>
        </If>
      </div>
    );
  }
}
