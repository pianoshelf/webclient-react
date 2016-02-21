
// Import external modules
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Import internal modules
import NavBar from './Fixtures/NavBar';
import Footer from './Fixtures/Footer';
import ResponsiveContainer from './Misc/ResponsiveContainer';
import SheetMusicCarousel from './Misc/SheetMusicCarousel';
import { dispatchAndPromiseAll } from '../utils/reduxUtils';
import { getMostPopularSheetMusic } from '../actions/sheetmusic';

@asyncConnect({
  promise: (params, { store }) => dispatchAndPromiseAll(store.dispatch, [
    getMostPopularSheetMusic(store),
  ]),
})
@connect(
  state => ({
    loggedIn: state.login.loggedIn,
    popularSheetMusic: state.sheetmusic.lists.popular,
  }),
)
export default class Homepage extends React.Component {
  static propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    popularSheetMusic: React.PropTypes.array.isRequired,
  };

  renderMainPanel() {
    const { loggedIn } = this.props;
    return (
      <ResponsiveContainer className="homepage__main-panel">
        <div ref="main" className="homepage__main">
          <h2 className="homepage__main-message">
            Explore, share, and download sheet music for free.
          </h2>
          <div className="homepage__main-search">
            <Link to="/browse" className="homepage__main-search-input">Browse Sheet Music</Link>
          </div>
          <If condition={!loggedIn}>
            <div className="homepage__main-register">
              or <Link to="/register" className="homepage__main-register-link">sign up now</Link>.
            </div>
          </If>
        </div>
      </ResponsiveContainer>
    );
  }

  renderInfoPanel() {
    return (
      <ResponsiveContainer className="homepage__panel-information">
        <div>
          <div className="homepage__info-box homepage__info-box--top-left">
            <FontAwesome className="homepage__info-box-icon homepage__info-box-icon--top-left"
              name="tablet"
            />
            <h4 className="homepage__info-box-heading">Browse Anywhere</h4>
            <p className="homepage__info-box-description">
              Browse and view over a thousand piano scores on any device! Alternatively, download
              and print the PDF file.
            </p>
          </div>
          <div className="homepage__info-box homepage__info-box--top-right">
            <FontAwesome className="homepage__info-box-icon homepage__info-box-icon--top-right"
              name="upload"
            />
            <h4 className="homepage__info-box-heading">Upload Sheet Music</h4>
            <p className="homepage__info-box-description">
              PianoShelf makes it quick and easy to publish and share your sheet music. Sign up to
              upload sheet music within minutes.
            </p>
          </div>
          <div className="homepage__info-box homepage__info-box--bottom-left">
            <FontAwesome className="homepage__info-box-icon homepage__info-box-icon--bottom-left"
              name="globe"
            />
            <h4 className="homepage__info-box-heading">Save Your Collection</h4>
            <p className="homepage__info-box-description">
              Have a repertoire or favourite sheetmusic? Add a score to your &rdquo;shelf&ldquo; to
              save it for later.
            </p>
          </div>
          <div className="homepage__info-box homepage__info-box--bottom-right">
            <FontAwesome className="homepage__info-box-icon homepage__info-box-icon--bottom-right"
              name="users"
            />
            <h4 className="homepage__info-box-heading">Create A Profile</h4>
            <p className="homepage__info-box-description">
              On PianoShelf, you can create a public personal profile, rate sheetmusic for
              difficulty and add video intepretations to a composition.
            </p>
          </div>
        </div>
        <div className="homepage__info-box-clear"></div>
      </ResponsiveContainer>
    );
  }

  renderPopularPanel() {
    const { popularSheetMusic } = this.props;
    return (
      <SheetMusicCarousel
        title="Our most popular sheet music"
        className="homepage__popular-panel"
        sheetMusic={popularSheetMusic}
      />
    );
  }

  render() {
    return (
      <div className="homepage">
        <Helmet title="PianoShelf - free piano sheet music" titleTemplate="%s" />
        <NavBar disappearing disappearingOffset={50} />
        {this.renderMainPanel.call(this)}
        {this.renderPopularPanel.call(this)}
        {this.renderInfoPanel.call(this)}
        <Footer />
      </div>
    );
  }
}
