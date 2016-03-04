
import Carousel from 'nuka-carousel';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import withState from 'recompose/withState';

import EmptyComponent from './utils/EmptyComponent';
import LeftButton from './utils/LeftButton';
import ResponsiveContainer from '../Misc/ResponsiveContainer';
import RightButton from './utils/RightButton';

@withState('slide', 'setSlide', 1)
@withState('fullscreen', 'setFullScreen', false)
@withState('screenfullModule', 'setScreenfullModule', {})
export default class MainViewer extends React.Component {
  static propTypes = {
    images: React.PropTypes.array.isRequired,
    slide: React.PropTypes.number.isRequired,
    fullscreen: React.PropTypes.bool.isRequired,
    screenfullModule: React.PropTypes.object.isRequired,
    setSlide: React.PropTypes.func.isRequired,
    setFullScreen: React.PropTypes.func.isRequired,
    setScreenfullModule: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    // Requiring screenfull here because it does not load on the server side.
    const screenfull = require('screenfull');
    this.props.setScreenfullModule(screenfull);

    // Add window listeners for left or right keys
    window.addEventListener('keydown', this.handleRightOrLeftKeyPress);

    // Add event listeners
    if (screenfull.enabled) {
      window.document.addEventListener(screenfull.raw.fullscreenchange, this.setFullScreen);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleRightOrLeftKeyPress);
    window.document.removeEventListener(this.props.screenfullModule.raw.fullscreenchange,
      this.setFullscreen);
  }

  setFullScreen = () => {
    this.props.setFullScreen(() => this.props.screenfullModule.isFullscreen);
  };

  handleSlideChange = nextSlide => {
    this.props.setSlide(() => nextSlide + 1);
  };

  handleRightOrLeftKeyPress = event => {
    if (event.keyCode === 39) {
      // Right key press
      this.props.setSlide(slide => Math.min(this.props.images.length, slide + 1));
    } else if (event.keyCode === 37) {
      // Left key press
      this.props.setSlide(slide => Math.max(1, slide - 1));
    }
  };

  toggleFullscreen = event => {
    event.preventDefault();
    this.props.screenfullModule.toggle(this.refs.mainViewer);
  };

  preventBehaviour = event => event.preventDefault();

  renderSheetMusicViewer() {
    const { images = [] } = this.props;

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
          onDragStart={this.preventBehaviour}
          onClick={this.preventBehaviour}
        />
      </div>
    ));

    return (
      <div className="sheetmusic__viewer-container">
        <Carousel
          afterSlide={this.handleSlideChange}
          className="sheetmusic__viewer"
          cellAlign="center"
          dragging
          slidesToShow={1}
          slidesToScroll={1}
          slideIndex={this.props.slide}
          slideWidth={1}
          easing="easeOutQuad"
          edgeEasing="easeOutQuad"
          decorators={decorators}
        >
          {imageElements}
        </Carousel>
      </div>
    );
  }

  renderSheetMusicControls() {
    return (
      <ResponsiveContainer className="sheetmusic__controls-container">
        <If condition={this.props.images.length}>
          <div className="sheetmusic__controls-page-number">
            Page {this.props.slide} / {this.props.images.length}
          </div>
        </If>
        <If condition={this.props.screenfullModule.enabled}>
          <a
            className="sheetmusic__controls sheetmusic__controls--full-screen"
            onClick={this.toggleFullscreen}
            href="#"
          >
            <If condition={this.props.fullscreen}>
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
        <If condition={!this.props.fullscreen}>
          <a className="sheetmusic__controls sheetmusic__controls--download"
            onClick={this.handleDownload}
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

  render() {
    return (
      <div className="sheetmusic__main" ref="mainViewer">
        {this.renderSheetMusicViewer()}
        {this.renderSheetMusicControls()}
      </div>
    );
  }
}
