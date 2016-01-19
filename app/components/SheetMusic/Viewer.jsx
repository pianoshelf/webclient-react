
import defer from 'lodash/function/defer';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import FullScreenMixin from 'react-fullscreen-component';
import Helmet from 'react-helmet';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import Carousel from 'nuka-carousel';
import times from 'lodash/utility/times';

import Detail from './utils/Detail';
import EmptyComponent from './utils/EmptyComponent';
import InfoBox from './utils/InfoBox';
import LeftButton from './utils/LeftButton';
import ResponsiveContainer from '../Misc/ResponsiveContainer';
import RightButton from './utils/RightButton';
import Comments from './comments/Comments';
import { getDifficultyText } from '../../utils/sheetMusicUtils';

function retrieveInitialData(flux, params) {
  let sheetMusicActions = flux.getActions('sheetmusic');

  return Promise.all([
    sheetMusicActions.getSheetMusic(parseInt(params.id, 10), flux),
    sheetMusicActions.getComments(parseInt(params.id, 10), flux),
  ]);
}

export default React.createClass({

  propTypes: {
    /**
     * The dynamic components of the URL
     */
    params: React.PropTypes.shape({

      /**
       * The id of the sheet music
       */
      id: React.PropTypes.string,

      /**
       * The slug of the sheet music
       */
      slug: React.PropTypes.string,

    }),

    /**
     * An object containing location information
     */
    location: React.PropTypes.shape({

      /**
       * The current path name
       */
      pathname: React.PropTypes.string,

      /**
       * The query parameters for the search results
       */
      query: React.PropTypes.object,
    }),
  },

  mixins: [
    PureRenderMixin,
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

  componentDidMount() {
    // Retrieve initial data when sheet music and params are out of sync.
    if (parseInt(this.props.params.id, 10) !== this.state.sheetMusicResult.id) {
      retrieveInitialData(this.flux, this.props.params);
    }

    // Add window listeners for left or right keys
    window.addEventListener('keydown', this.handleRightOrLeftKeyPress_);

    // Update carousel data, such as page state.
    defer(() => this.handleSetCarouselData_());
  },

  componentDidUpdate() {
    defer(() => this.handleSetCarouselData_());
  },

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleRightOrLeftKeyPress_);
  },

  componentWillReceiveNewProps() {
    retrieveInitialData(this.flux, this.props.params);
  },

  handleSetCarouselData_() {
    if (this.refs.carousel) {
      // HACK: Get carousel state properties
      let carouselState = this.refs.carousel.state;

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

  renderLoadingScreen_() {
    return (
      <div className="sheetmusic__spinner">
        <FontAwesome name="cog" spin />
      </div>
    );
  },

  renderSheetMusicViewer_() {
    let images = this.state.sheetMusicResult.images || [];

    let decorators = [
      { component: LeftButton, position: 'CenterLeft' },
      { component: RightButton, position: 'CenterRight' },
      { component: EmptyComponent }, // The dots at the bottom
    ];

    return (
      <div className="sheetmusic__viewer-container">
        <Carousel className="sheetmusic__viewer"
          cellAlign="center"
          dragging
          slidesToShow={1}
          slidesToScroll={1}
          slideWidth={1}
          easing="easeOutQuad"
          edgeEasing="easeOutQuad"
          decorators={decorators}
          data={this.handleSetCarouselData_}
          ref="carousel">
          {images.map((image, index) => (
            <div className="sheetmusic__viewer-page" key={index}>
              <img className="sheetmusic__viewer-page-image"
                src={image}
                onDragStart={this.handleNullify_}
                onClick={this.handleNullify_} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  },

  renderSheetMusicControls_() {
    return (
      <ResponsiveContainer className="sheetmusic__controls-container">
        <If condition={this.state.pageCount}>
          <div className="sheetmusic__controls-page-number">
            Page {this.state.pageNumber} / {this.state.pageCount}
          </div>
        </If>
        <If condition={this.state.hasFullscreen}>
          <a className="sheetmusic__controls sheetmusic__controls--full-screen"
            onClick={this.handleFullscreen_}
            href="#">
            <If condition={this.state.isFullscreen}>
              <span>
                <FontAwesome className="sheetmusic__controls-icon"
                  name="times" />
                Exit
              </span>
            <Else />
              <span>
                <FontAwesome className="sheetmusic__controls-icon"
                  name="arrows-alt" />
                Full Screen
              </span>
            </If>
          </a>
        </If>
        <If condition={!this.state.isFullscreen}>
          <a className="sheetmusic__controls sheetmusic__controls--download"
            onClick={this.handleDownload_}
            href="#">
            <span>
              <FontAwesome className="sheetmusic__controls-icon"
                name="cloud-download" />
              Download PDF
            </span>
          </a>
        </If>
      </ResponsiveContainer>
    );
  },

  renderDescription_() {
    let longDescription = this.state.sheetMusicResult.longDescription;
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
  },

  renderVideos_() {
    let videos = this.state.sheetMusicResult.videos;
    if (!videos || !videos.length) return null;

    return (
      <InfoBox title="Videos" icon="video-camera">
        {videos.slice(0, this.state.showVideos).map((video, index) => (
          <div className="sheetmusic__video" key={index}>
            {/* <Video videoId={video.youtubeId} /> */}
          </div>
        ))}
        <If condition={this.state.showVideos < videos.length}>
          <a className="sheetmusic__video-show-more"
            href="#"
            onClick={this.handleShowMoreVideos_}>
            <FontAwesome className="sheetmusic__video-show-more-icon"
              name="angle-down" />
            See More Videos
          </a>
        </If>
      </InfoBox>
    );
  },

  renderComments_() {
    return (
      <InfoBox title="Comments" icon="comment">
        <Comments id={this.state.sheetMusicResult.id} comments={this.state.commentResult.comment}/>
      </InfoBox>
    );
  },

  renderInfo_() {
    let result = this.state.sheetMusicResult;

    let difficultyNode = null;
    if (result.difficulty) {
      let fullStarCount = result.difficulty;
      let emptyStarCount = 5 - result.difficulty;

      difficultyNode = (
        <Detail title="Difficulty">
          <div className="sheetmusic__difficulty-stars">
            {times(fullStarCount, index => (
              <FontAwesome className="sheetmusic__difficulty-star"
                name="star" key={index} />
            ))}
            {times(emptyStarCount, index => (
              <FontAwesome className="sheetmusic__difficulty-star"
                name="star-o" key={index + 5} />
            ))}
          </div>
          <div className="sheetmusic__difficulty-text">
            {getDifficultyText(result.difficulty)}
          </div>
        </Detail>
      );
    }

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
        {difficultyNode}
      </InfoBox>
    );
  },

  render() {
    let title = this.state.sheetMusicResult ? this.state.sheetMusicResult.title : 'Loading...';
    let inProgress = (this.state.inProgress.indexOf('getSheetMusic') !== -1);

    if (inProgress) {
      return (
        <div>
          <Helmet title={title} />
          {this.renderLoadingScreen_()}
        </div>
      );
    }

    return (
      <div>
        <Helmet title={title} />
        <div className="sheetmusic__main" ref="mainViewer">
          {this.renderSheetMusicViewer_()}
          {this.renderSheetMusicControls_()}
        </div>
        <ResponsiveContainer className="sheetmusic__details">
          <div className="sheetmusic__details-left">
            {this.renderDescription_()}
            {this.renderVideos_()}
            {this.renderComments_()}
          </div>
          <div className="sheetmusic__details-right">
            {this.renderInfo_()}
          </div>
        </ResponsiveContainer>
      </div>
    );
  },

});

