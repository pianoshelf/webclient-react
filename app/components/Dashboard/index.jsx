
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Import other components
import Footer from '../Fixtures/Footer';
import NavBar from '../Fixtures/NavBar';
import ResponsiveContainer from '../Misc/ResponsiveContainer';
import SheetMusicResult from '../Misc/SheetMusicResult';
import { getUploadsForUser } from '../../actions/profile';
import { getShelf } from '../../actions/shelf';

@asyncConnect({
  promise: (params, { store, request }) => {
    const user = store.getState().login.user.username;
    return Promise.all([
      store.dispatch(getShelf(user, request)),
      store.dispatch(getUploadsForUser(user, 1, request)),
    ]);
  },
})
@connect(
  state => ({
    shelf: state.profile.shelf,
    uploads: state.profile.uploads,
  }),
)
export default class Dashboard extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  renderMyShelf() {
    const { shelf } = this.props;

    const sheetMusicElements = shelf.map((sheetMusic, index) => (
      <li className="dashboard__list-container-item" key={index}>
        <SheetMusicResult sheetMusic={sheetMusic} />
      </li>
    ));

    return (
      <div className="dashboard__list">
        <div className="dashboard__list-title">
          My Shelf
        </div>
        <If condition={shelf.length === 0}>
          <ul className="dashboard__list-container">
            <li className="dashboard__list-container-item">
              <Link to="/browse" className="dashboard__list-container-callout">
                <FontAwesome name="search" className="dashboard__list-container-icon" />
                <div className="dashboard__list-container-message">
                  You do not have any sheet music in your shelf.
                </div>
                <div className="dashboard__list-container-message">
                  Browse sheet music now!
                </div>
              </Link>
            </li>
          </ul>
        <Else />
          <ul className="dashboard__list-container">
            {sheetMusicElements}
            <li className="dashboard__list-container-item" key="sheetmusic">
              <Link to="/browse" className="dashboard__list-container-callout">
                <FontAwesome name="search" className="dashboard__list-container-icon" />
                <div className="dashboard__list-container-message">
                  Browse more sheet music.
                </div>
              </Link>
            </li>
          </ul>
        </If>
      </div>
    );
  }

  renderMySheetMusic() {
    const { uploads } = this.props;

    const sheetMusicElements = uploads.map((sheetMusic, index) => (
      <li className="dashboard__list-container-item" key={index}>
        <SheetMusicResult sheetMusic={sheetMusic} />
      </li>
    ));

    return (
      <div className="dashboard__list">
        <div className="dashboard__list-title">
          My Sheet Music
        </div>
        <If condition={uploads.length === 0}>
          <ul className="dashboard__list-container">
            <li className="dashboard__list-container-item">
              <Link to="/upload" className="dashboard__list-container-callout">
                <FontAwesome name="plus" className="dashboard__list-container-icon" />
                <div className="dashboard__list-container-message">
                  You have no sheet music.
                </div>
                <div className="dashboard__list-container-message">
                  Upload one now!
                </div>
              </Link>
            </li>
          </ul>
        <Else />
          <ul className="dashboard__list-container">
            {sheetMusicElements}
            <li className="dashboard__list-container-item" key="sheetmusic">
              <Link to="/upload" className="dashboard__list-container-callout">
                <FontAwesome name="plus" className="dashboard__list-container-icon" />
                <div className="dashboard__list-container-message">
                  Upload more sheet music.
                </div>
              </Link>
            </li>
          </ul>
        </If>
      </div>
    );
  }

  renderDashboard() {
    return (
      <div className="dashboard__wrapper">
        <div className="dashboard__wrapper-half dashboard__wrapper-half--left">
          {this.renderMyShelf()}
        </div>
        <div className="dashboard__wrapper-half dashboard__wrapper-half--right">
          {this.renderMySheetMusic()}
        </div>
      </div>
    );
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
