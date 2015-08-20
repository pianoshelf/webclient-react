
// Import external modules
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

// Import components
import NavBar from './Fixtures/NavBar';
import Footer from './Fixtures/Footer';
import ResponsiveContainer from './Misc/ResponsiveContainer';
import SheetMusicCarousel from './Misc/SheetMusicCarousel';

let { PureRenderMixin } = addons;

function retrieveInitialData(flux) {
  const sheetMusicActions = flux.getActions('sheetmusic');
  return sheetMusicActions.getMostPopularSheetMusic(flux);
}

export default React.createClass({

  mixins: [
    PureRenderMixin,
    fluxMixin({
      sheetmusic: store => ({
        mostPopularSheetMusic: store.state.mostPopularSheetMusic,
      }),
    }),
  ],

  // Define what should be fetched before route is renderred.
  statics: {
    routeWillRun({ flux }) {
      return retrieveInitialData(flux);
    },
  },

  componentDidMount() {
    if (this.state.mostPopularSheetMusic.length === 0) {
      retrieveInitialData(this.flux);
    }
  },

  renderMainPanel_() {
    return (
      <ResponsiveContainer className="homepage__main-panel">
        <div ref="main" className="homepage__main">
          <h2 className="homepage__main-message">
            Explore, share, and download sheet music for free.
          </h2>
          <div className="homepage__main-search">
            <Link to="/browse" className="homepage__main-search-input">Browse Sheet Music</Link>
          </div>
          <div className="homepage__main-register">
            or <Link to="/register" className="homepage__main-register-link">sign up now</Link>.
          </div>
        </div>
      </ResponsiveContainer>
    );
  },

  renderInfoPanel_() {
    return (
      <ResponsiveContainer className="homepage__panel-information">
        <div>
          <div className="homepage__info-box homepage__info-box--top-left">
            <FontAwesome className="homepage__info-box-icon homepage__info-box-icon--top-left"
              name="tablet" />
            <h4 className="homepage__info-box-heading">Browse Anywhere</h4>
            <p className="homepage__info-box-description">
              Browse and view over a thousand piano scores on any device! Alternatively, download
              and print the PDF file.
            </p>
          </div>
          <div className="homepage__info-box homepage__info-box--top-right">
            <FontAwesome className="homepage__info-box-icon homepage__info-box-icon--top-right"
              name="upload" />
            <h4 className="homepage__info-box-heading">Upload Sheet Music</h4>
            <p className="homepage__info-box-description">
              PianoShelf makes it quick and easy to publish and share your sheet music. Sign up to
              upload sheet music within minutes.
            </p>
          </div>
          <div className="homepage__info-box homepage__info-box--bottom-left">
            <FontAwesome className="homepage__info-box-icon homepage__info-box-icon--bottom-left"
              name="globe" />
            <h4 className="homepage__info-box-heading">Save Your Collection</h4>
            <p className="homepage__info-box-description">
              Have a repertoire or favourite sheetmusic? Add a score to your &rdquo;shelf&ldquo; to
              save it for later.
            </p>
          </div>
          <div className="homepage__info-box homepage__info-box--bottom-right">
            <FontAwesome className="homepage__info-box-icon homepage__info-box-icon--bottom-right"
              name="users" />
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
  },

  renderPopularPanel_() {
    return (
      <SheetMusicCarousel
        title="Our most popular sheet music"
        className="homepage__popular-panel"
        sheetMusic={this.state.mostPopularSheetMusic} />
    );
  },

  render() {
    return (
      <Helmet title="PianoShelf - free piano sheet music" titleTemplate="%s">
        <div className="homepage">
          <NavBar homepage={true} yOffsetLimit={50} />
          {this.renderMainPanel_()}
          {this.renderPopularPanel_()}
          {this.renderInfoPanel_()}
          <Footer />
        </div>
      </Helmet>
    );
  },

});

