
// Import external modules
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import React from 'react';
import withState from 'recompose/withState';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Import internal modules
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';
import SheetMusicCarousel from './SheetMusicCarousel';
import { createEventTracker } from '../../utils/analytics';
import { getMostPopularSheetMusic } from '../../actions/sheetmusic';

const trackEvent = createEventTracker('Homepage');

const NAVBAR_DISAPPEARING_OFFSET = 50;

@asyncConnect({
  promise: (params, { store, request }) => store.dispatch(getMostPopularSheetMusic(request)),
})
@connect(
  state => ({
    loggedIn: state.login.loggedIn,
    popularSheetMusic: state.sheetmusic.lists.popular.results,
  }),
)
@withState('transparentNavBar', 'setNavBarTransparency', true)
export default class Homepage extends React.Component {
  static propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    popularSheetMusic: React.PropTypes.array.isRequired,
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

  trackBrowseLink = () => {
    trackEvent('click', 'Browse Sheet Music');
  };

  trackSignUpLink = () => {
    trackEvent('click', 'Sign Up Now');
  };

  handleScrollChange = () => {
    this.props.setNavBarTransparency(() => (
      window.pageYOffset < NAVBAR_DISAPPEARING_OFFSET
    ));
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
            <Link
              to="/browse"
              className="homepage__main-search-input"
            >
              Browse Sheet Music
            </Link>
          </div>
          <If condition={!loggedIn}>
            <div className="homepage__main-register">
              or
              {' '}
              <Link
                to="/register"
                className="homepage__main-register-link"
              >
                sign up now
              </Link>
              .
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
              Pianoshelf makes it quick and easy to publish and share your sheet music. Sign up to
              upload sheet music within minutes.
            </p>
          </div>
          <div className="homepage__info-box homepage__info-box--bottom-left">
            <FontAwesome className="homepage__info-box-icon homepage__info-box-icon--bottom-left"
              name="globe"
            />
            <h4 className="homepage__info-box-heading">Save Your Collection</h4>
            <p className="homepage__info-box-description">
              Have a repertoire or favourite sheetmusic? Add a score to your &ldquo;shelf&rdquo; to
              save it for later.
            </p>
          </div>
          <div className="homepage__info-box homepage__info-box--bottom-right">
            <FontAwesome className="homepage__info-box-icon homepage__info-box-icon--bottom-right"
              name="users"
            />
            <h4 className="homepage__info-box-heading">Create A Profile</h4>
            <p className="homepage__info-box-description">
              On Pianoshelf, you can create a public personal profile, rate sheetmusic for
              difficulty and add video intepretations to a composition.
            </p>
          </div>
        </div>
        <div className="homepage__info-box-clear"></div>
      </ResponsiveContainer>
    );
  }

  renderPopularPanel() {
    // TODO: Send inProgress state into carousel
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
    const { transparentNavBar } = this.props;
    return (
      <div className="homepage">
        <Helmet title="Pianoshelf - free piano sheet music" titleTemplate="%s" />
        <NavBar transparent={transparentNavBar} />
        {this.renderMainPanel()}
        {this.renderPopularPanel()}
        {this.renderInfoPanel()}
        <Footer />
      </div>
    );
  }
}
