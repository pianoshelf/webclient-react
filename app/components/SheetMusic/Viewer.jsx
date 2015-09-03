
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import React from 'react';
import Carousel from 'nuka-carousel';
import times from 'lodash/utility/times';
import { addons } from 'react/addons';

import Detail from './utils/Detail';
import InfoBox from './utils/InfoBox';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

let { PureRenderMixin } = addons;

function retrieveInitialData(flux, params) {
  let sheetMusicActions = flux.getActions('sheetmusic');
  let loginActions = flux.getActions('login');

  return Promise.all([
    sheetMusicActions.getSheetMusic(parseInt(params.id, 10), flux),
  ]);
}

let LeftButton = React.createClass({
  render() {
    if (this.props.currentSlide === 0) return null;
    return (
      <a href="#" onClick={this.props.previousSlide}
        className="sheetmusic-viewer-arrow sheetmusic-viewer-arrow--left">
        <FontAwesome name="angle-left" />
      </a>
    );
  },
});

let RightButton = React.createClass({
  render() {
    if (this.props.currentSlide + 1 === this.props.slideCount) return null;
    return (
      <a href="#" onClick={this.props.nextSlide}
        className="sheetmusic-viewer-arrow sheetmusic-viewer-arrow--right">
        <FontAwesome name="angle-right" />
      </a>
    );
  },
});

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
    fluxMixin({
      sheetmusic: store => ({
        errorCode: store.state.errorCode,
        sheetMusicResult: store.state.sheetMusicResult,
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
    retrieveInitialData(this.flux, this.props.params);
    window.addEventListener('keydown', this.handleRightOrLeftKeyPress_);
    this.handleSetCarouselData_()
  },

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleRightOrLeftKeyPress_);
  },

  renderLoadingScreen_() {
    return (
      <div className="sheetmusic__spinner">
        <FontAwesome name="cog" spin={true} />
      </div>
    );
  },

  renderSheetMusicViewer_() {
    let images = this.state.sheetMusicResult.images || [];

    let decorators = [
      { component: LeftButton, position: 'CenterLeft' },
      { component: RightButton, position: 'CenterRight' },
    ];

    return (
      <div className="sheetmusic__viewer-container">
        <Carousel className="sheetmusic__viewer"
          cellAlign="center"
          dragging={true}
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
              <img src={image}
                className="sheetmusic__viewer-page-image"
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
      </ResponsiveContainer>
    );
  },

  renderDescription_() {
    let longDescription = this.state.sheetMusicResult.longDescription;
    return (
      <InfoBox title="Description" className="sheetmusic__description">
        <If condition={longDescription}>
          {longDescription}
        <Else />
          <span className="sheetmusic__description-none">no description</span>
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
          <a href="#"
            className="sheetmusic__video-show-more"
            onClick={this.handleShowMoreVideos_}>
            <FontAwesome name="angle-down"
              className="sheetmusic__video-show-more-icon" />
            See More Videos
          </a>
        </If>
      </InfoBox>
    );
  },

  renderComments_() {
    return (
      <InfoBox title="Comments" icon="comment" />
    );
  },

  renderInfo_() {
    let result = this.state.sheetMusicResult;

    let difficulty = null;
    if (result.difficulty) {
      let fullStarCount = result.difficulty;
      let emptyStarCount = 5 - result.difficulty;

      difficulty = (
        <Detail title="Difficulty">
          <div className="sheetmusic__difficulty-stars">
            {times(fullStarCount, index => (
              <FontAwesome name="star" key={index}
                className="sheetmusic__difficulty-star" />
            ))}
            {times(emptyStarCount, index => (
              <FontAwesome name="star-o" key={index + 5}
                className="sheetmusic__difficulty-star" />
            ))}
          </div>
          <div className="sheetmusic__difficulty-text">
            Oh So Difficult
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
        {difficulty}
      </InfoBox>
    );
  },

  render() {
    let title = this.state.sheetMusicResult ? this.state.sheetMusicResult.title : 'Loading...';
    let inProgress = (this.state.inProgress.indexOf('getSheetMusic') !== -1);

    if (inProgress) {
      return (
        <Helmet title={title}>
          {this.renderLoadingScreen_()}
        </Helmet>
      );
    }

    return (
      <Helmet title={title}>
        {this.renderSheetMusicViewer_()}
        {this.renderSheetMusicControls_()}
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
      </Helmet>
    );
  },

  componentWillReceiveNewProps() {
    retrieveInitialData(this.flux, this.props.params);
  },

  handleSetCarouselData_() {
    if (this.refs.carousel) {
      // HACK: Get carousel state properties
      let carouselState = this.refs.carousel.state;

      console.log('in viewer');
      console.log(carouselState.slideCount);

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

});

