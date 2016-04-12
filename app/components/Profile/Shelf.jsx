
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ProfileNav from './utils/ProfileNav';
import SheetMusicResult from '../Misc/SheetMusicResult';
import { getShelf } from '../../actions/shelf';

@asyncConnect({
  promise: (params, { store, request }) => {
    const { username } = params;
    return store.dispatch(getShelf(username, request));
  },
})
@connect(
  state => ({
    shelf: state.profile.shelf,
    profile: state.profile.profile.user,
  }),
)
export default class Shelf extends React.Component {
  renderEmptyList() {
    if (true) {
      return (
        <div className="profile__content-not-found">
          Shelf is empty
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
    const { profile, shelf } = this.props;
    const { username } = profile;

    const sheetMusicElements = shelf.map((sheetMusic, index) => (
      <li className="profile__content-shelf-list-item" key={index}>
        <SheetMusicResult sheetMusic={sheetMusic} />
      </li>
    ));

    return (
      <div>
        <ProfileNav url="shelf" username={username} />
        <If condition={shelf.length === 0}>
          {this.renderEmptyList()}
        <Else />
          <ul className="profile__content-shelf-list">
            {sheetMusicElements}
          </ul>
        </If>
      </div>
    );
  }
}
