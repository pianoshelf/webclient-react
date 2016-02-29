
import defer from 'lodash/function/defer';
import FontAwesome from 'react-fontawesome';
// import FullScreenMixin from 'react-fullscreen-component';
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
import { getDifficultyText } from '../../utils/sheetMusicUtils';
import { getSheetMusic, getComments } from '../../actions/sheetmusic';

@asyncConnect({
  promise: ({ id }, { store }) => Promise.all([
    store.dispatch(getSheetMusic(parseInt(id, 10), store)),
    store.dispatch(getComments(parseInt(id, 10), store)),
  ]),
})
@connect(
  state => ({
    errorCode: state.sheetmusic.results.errorCode,
    result: state.sheetmusic.results.result,
    commentResult: state.sheetmusic.comments,
    inProgress: state.progress.inProgress,
    loggedIn: state.login.loggedIn,
    user: state.login.user,
  }),
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
    errorCode: React.PropTypes.number.isRequired,
    result: React.PropTypes.object.isRequired,
    commentResult: React.PropTypes.object.isRequired,
    inProgress: React.PropTypes.array.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object.isRequired,
    hasFullscreen: React.PropTypes.bool,
    isFullscreen: React.PropTypes.bool,
  };

  // TODO: Don't use state for these values
  state = {
    showVideos: 1,
    pageNumber: null,
    pageCount: null,
  };

  componentDidMount() {
    // Add window listeners for left or right keys
    window.addEventListener('keydown', this.handleRightOrLeftKeyPress);

    // Update carousel data, such as page state.
    defer(() => this.handleSetCarouselData());
  }

  componentDidUpdate() {
    defer(() => this.handleSetCarouselData());
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleRightOrLeftKeyPress);
  }

  handleSetCarouselData = () => {
    if (this.refs.carousel) {
      // HACK: Get carousel state properties
      // TODO: Find a better way to do this
      const carouselState = this.refs.carousel.state;

      this.setState({
        pageNumber: carouselState.currentSlide + 1,
        pageCount: carouselState.slideCount,
      });
    }
  };

  handleShowMoreVideos = event => {
    event.preventDefault();
    this.setState({
      showVideos: this.state.showVideos + 5,
    });
  };

  handleNullify = event => {
    event.preventDefault();
  };

  handleRightOrLeftKeyPress = event => {
    if (!this.refs.carousel) return;
    if (event.keyCode === 39) { // Right key press
      this.refs.carousel.nextSlide();
    } else if (event.keyCode === 37) { // Left key press
      this.refs.carousel.previousSlide();
    }
  };

  // handleFullscreen = event => {
    // event.preventDefault();
    // if (this.state.isFullscreen) {
      // this.exitFullscreen();
    // } else {
      // this.requestFullscreen(this.refs.mainViewer);
    // }
  // };

  renderSheetMusicViewer() {
    const images = this.props.result.images || [];

    const decorators = [
      { component: LeftButton, position: 'CenterLeft' },
      { component: RightButton, position: 'CenterRight' },
      { component: EmptyComponent }, // The dots at the bottom
    ];

    const imageElements = images.map((image, index) => (
      <div className="sheetmusic__viewer-page" key={index}>
        <img
          className="sheetmusic__viewer-page-image"
          src={image}
          onDragStart={this.handleNullify}
          onClick={this.handleNullify}
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
          data={this.handleSetCarouselData}
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
        <If condition={this.state.pageCount}>
          <div className="sheetmusic__controls-page-number">
            Page {this.state.pageNumber} / {this.state.pageCount}
          </div>
        </If>
        <If condition={this.props.hasFullscreen}>
          <a className="sheetmusic__controls sheetmusic__controls--full-screen"
            onClick={this.handleFullscreen}
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
    const longDescription = this.props.result.longDescription;
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
    const videos = this.props.result.videos;
    if (!videos || !videos.length) return null;

    const videoElements = videos.slice(0, this.state.showVideos).map((video, index) => (
      <div className="sheetmusic__video" key={index}>
        {/* <Video videoId={video.youtubeId} /> */}
      </div>
    ));

    return (
      <InfoBox title="Videos" icon="video-camera">
        {videoElements}
        <If condition={this.state.showVideos < videos.length}>
          <a className="sheetmusic__video-show-more"
            href="#"
            onClick={this.handleShowMoreVideos}
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
        <Comments id={this.props.result.id} comments={this.props.commentResult.list.comment}/>
      </InfoBox>
    );
  }

  renderDifficultyNode() {
    const result = this.props.result;

    if (!result.difficulty) return null;

    const starCount = result.difficulty;

    return (
      <Detail title="Difficulty">
        <div className="sheetmusic__difficulty-stars">
          {times(starCount, index => (
            <FontAwesome className="sheetmusic__difficulty-star" name="star" key={index} />
          ))}
          {times(5 - starCount, index => (
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
    const result = this.props.result;

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
    const title = this.props.result ? this.props.result.title : 'Loading...';
    const inProgress = this.props.inProgress.indexOf('getSheetMusic') !== -1;

    return (
      <div>
        <Helmet title={title} />
        <If condition={inProgress}>
          <LoadingScreen />
        <Else />
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
        </If>
      </div>
    );
  }

}
