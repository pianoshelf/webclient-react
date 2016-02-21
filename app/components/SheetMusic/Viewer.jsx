
import defer from 'lodash/function/defer';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import FullScreenMixin from 'react-fullscreen-component';
import Helmet from 'react-helmet';
import React from 'react';
import Carousel from 'nuka-carousel';
import times from 'lodash/utility/times';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';

import Detail from './utils/Detail';
import EmptyComponent from './utils/EmptyComponent';
import InfoBox from './utils/InfoBox';
import LeftButton from './utils/LeftButton';
import LoadingScreen from './utils/LoadingScreen';
import ResponsiveContainer from '../Misc/ResponsiveContainer';
import RightButton from './utils/RightButton';
import Comments from './comments/Comments';
import { dispatchAndPromiseAll } from '../../utils/reduxUtils';
import { getDifficultyText } from '../../utils/sheetMusicUtils';
import { getSheetMusic, getComments } from '../../actions/sheetmusic';

@asyncConnect({
  promise: ({ id }, { store }) => dispatchAndPromiseAll(store.dispatch, [
    getSheetMusic(parseInt(id, 10), store),
    getComments(parseInt(id, 10), store),
  ]),
})
@connect(
  state => ({
    errorCode: state.sheetmusic.results.errorCode,
    result: state.sheetmusic.results.result,
    inProgress: state.progress.inProgress,


  })
)
export default class Viewer extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
      slug: React.PropTypes.string,
    }),
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string,
      query: React.PropTypes.object,
    }),
  };

  componentDidMount() {
    // Add window listeners for left or right keys
    window.addEventListener('keydown', this.handleRightOrLeftKeyPress_);

    // Update carousel data, such as page state.
    defer(() => this.handleSetCarouselData_());
  }

  componentDidUpdate() {
    defer(() => this.handleSetCarouselData_());
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleRightOrLeftKeyPress_);
  }

  renderSheetMusicViewer() {
    const images = this.props.sheetMusicResult.images || [];

    const decorators = [
      { component: LeftButton, position: 'CenterLeft' },
      { component: RightButton, position: 'CenterRight' },
      { component: EmptyComponent }, // The dots at the bottom
    ];

    const imageElements = images.map((image, index) => (
      <div className="sheetmusic__viewer-page" key={index}>
        <img className="sheetmusic__viewer-page-image"
          src={image}
          onDragStart={this.handleNullify_}
          onClick={this.handleNullify_}
        />
      </div>
    ));

    return (
      <div className="sheetmusic__viewer-container">
        <Carousel
          className="sheetmusic__viewer"
          cellAlign="center"
          dragging
          slidesToShow={1}
          slidesToScroll={1}
          slideWidth={1}
          easing="easeOutQuad"
          edgeEasing="easeOutQuad"
          decorators={decorators}
          data={this.handleSetCarouselData_}
          ref="carousel"
        >
          {imageElements}
        </Carousel>
      </div>
    );
  }

  renderSheetMusicControls() {
    return (
      <ResponsiveContainer className="sheetmusic__controls-container">
        <If condition={this.props.pageCount}>
          <div className="sheetmusic__controls-page-number">
            Page {this.props.pageNumber} / {this.props.pageCount}
          </div>
        </If>
        <If condition={this.props.hasFullscreen}>
          <a className="sheetmusic__controls sheetmusic__controls--full-screen"
            onClick={this.handleFullscreen_}
            href="#"
          >
            <If condition={this.props.isFullscreen}>
              <span>
                <FontAwesome className="sheetmusic__controls-icon" name="times" />
                Exit
              </span>
            <Else />
              <span>
                <FontAwesome className="sheetmusic__controls-icon" name="arrows-alt" />
                Full Screen
              </span>
            </If>
          </a>
        </If>
        <If condition={!this.props.isFullscreen}>
          <a className="sheetmusic__controls sheetmusic__controls--download"
            onClick={this.handleDownload_}
            href="#"
          >
            <span>
              <FontAwesome className="sheetmusic__controls-icon" name="cloud-download" />
              Download PDF
            </span>
          </a>
        </If>
      </ResponsiveContainer>
    );
  }

  renderDescription() {
    const longDescription = this.props.sheetMusicResult.longDescription;
    return (
      <InfoBox className="sheetmusic__description" title="Description">
        <If condition={longDescription}>
          {longDescription}
        <Else />
          <span className="sheetmusic__description-none">
            no description
          </span>
        </If>
      </InfoBox>
    );
  }

  renderVideos() {
    const videos = this.props.sheetMusicResult.videos;
    if (!videos || !videos.length) return null;

    const videoElements = videos.slice(0, this.props.showVideos).map((video, index) => (
      <div className="sheetmusic__video" key={index}>
        {/* <Video videoId={video.youtubeId} /> */}
      </div>
    ));

    return (
      <InfoBox title="Videos" icon="video-camera">
        {videoElements}
        <If condition={this.props.showVideos < videos.length}>
          <a className="sheetmusic__video-show-more"
            href="#"
            onClick={this.handleShowMoreVideos_}
          >
            <FontAwesome className="sheetmusic__video-show-more-icon" name="angle-down" />
            See More Videos
          </a>
        </If>
      </InfoBox>
    );
  }

  renderComments() {
    return (
      <InfoBox title="Comments" icon="comment">
        <Comments id={this.props.sheetMusicResult.id} comments={this.props.commentResult.comment}/>
      </InfoBox>
    );
  }

  renderDifficultyNode() {
    const result = this.props.sheetMusicResult;

    if (!result.difficulty) return null;

    const fullStarCount = result.difficulty;
    const emptyStarCount = 5 - result.difficulty;

    return (
      <Detail title="Difficulty">
        <div className="sheetmusic__difficulty-stars">
          {times(fullStarCount, index => (
            <FontAwesome className="sheetmusic__difficulty-star" name="star" key={index} />
          ))}
          {times(emptyStarCount, index => (
            <FontAwesome className="sheetmusic__difficulty-star" name="star-o" key={index + 5} />
          ))}
        </div>
        <div className="sheetmusic__difficulty-text">
          {getDifficultyText(result.difficulty)}
        </div>
      </Detail>
    );
  }

  renderInfo() {
    const result = this.props.sheetMusicResult;

    return (
      <InfoBox title="Details">
        <If condition={result.composer}>
          <Detail title="Composed by">
            {result.composer}
          </Detail>
        </If>
        <If condition={result.submittedBy}>
          <Detail title="Submitted by">
            {result.submittedBy}
          </Detail>
        </If>
        <If condition={result.musicStyle}>
          <Detail title="Category">
            {result.musicStyle}
          </Detail>
        </If>
        <If condition={result.musicKey}>
          <Detail title="Key">
            {result.musicKey}
          </Detail>
        </If>
        <If condition={result.license}>
          <Detail title="License">
            {result.license}
          </Detail>
        </If>
        {this.renderDifficultyNode()}
      </InfoBox>
    );
  }

  render() {
    const title = this.props.sheetMusicResult ? this.props.sheetMusicResult.title : 'Loading...';
    const inProgress = (this.props.inProgress.indexOf('getSheetMusic') !== -1);

    if (inProgress) {
      return (
        <div>
          <Helmet title={title} />
          <LoadingScreen />
        </div>
      );
    }

    return (
      <div>
        <Helmet title={title} />
        <div className="sheetmusic__main" ref="mainViewer">
          {this.renderSheetMusicViewer()}
          {this.renderSheetMusicControls()}
        </div>
        <ResponsiveContainer className="sheetmusic__details">
          <div className="sheetmusic__details-left">
            {this.renderDescription()}
            {this.renderVideos()}
            {this.renderComments()}
          </div>
          <div className="sheetmusic__details-right">
            {this.renderInfo()}
          </div>
        </ResponsiveContainer>
      </div>
    );
  }

}

export default React.createClass({

  mixins: [
    FullScreenMixin,
    fluxMixin({
      sheetmusic: store => ({
        errorCode: store.state.errorCode,
        sheetMusicResult: store.state.sheetMusicResult,
      }),
      comments: store => ({
        commentResult: store.state.commentResult,
      }),
      progress: store => store.state,
      login: store => ({
        loggedIn: store.state.loggedIn,
        user: store.state.user,
      }),
    }),
  ],

  statics: {
    routeWillRun({ flux, state }) {
      return retrieveInitialData(flux, state.params);
    },
  },

  getInitialState() {
    return {
      showVideos: 1,
      pageNumber: null,
      pageCount: null,
    };
  },


  componentWillReceiveNewProps() {
    retrieveInitialData(this.flux, this.props.params);
  },

  handleSetCarouselData_() {
    if (this.refs.carousel) {
      // HACK: Get carousel state properties
      const carouselState = this.refs.carousel.state;

      this.setState({
        pageNumber: carouselState.currentSlide + 1,
        pageCount: carouselState.slideCount,
      });
    }
  },

  handleShowMoreVideos_(event) {
    event.preventDefault();
    this.setState({
      showVideos: this.state.showVideos + 5,
    });
  },

  handleNullify_(event) {
    event.preventDefault();
  },

  handleRightOrLeftKeyPress_(event) {
    if (!this.refs.carousel) return;
    if (event.keyCode === 39) { // Right key press
      this.refs.carousel.nextSlide();
    } else if (event.keyCode === 37) { // Left key press
      this.refs.carousel.previousSlide();
    }
  },

  handleFullscreen_(event) {
    event.preventDefault();
    if (this.state.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.requestFullscreen(this.refs.mainViewer);
    }
  },

});
