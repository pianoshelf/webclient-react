
import FontAwesome from 'react-fontawesome';
import React from 'react';
import withState from 'recompose/withState';

import Carousel from './carousel/Carousel';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

// This will contain the dynamically loaded screenfull module.
let screenfull;

@withState('slide', 'setSlide', 1)
@withState('fullscreen', 'setFullScreen', false)
export default class MainViewer extends React.Component {
  static propTypes = {
    images: React.PropTypes.array.isRequired,
    slide: React.PropTypes.number.isRequired,
    fullscreen: React.PropTypes.bool.isRequired,
    setSlide: React.PropTypes.func.isRequired,
    setFullScreen: React.PropTypes.func.isRequired,
    onDownloadClick: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    // Requiring screenfull here because it does not load on the server side.
    screenfull = require('screenfull');

    // Add event listeners
    if (screenfull.enabled) {
      window.document.addEventListener(screenfull.raw.fullscreenchange, this.setFullScreen);
    }

    // Trigger re-render
    this.forceUpdate();
  }

  componentWillUnmount() {
    window.document.removeEventListener(screenfull.raw.fullscreenchange, this.setFullscreen);
  }

  setFullScreen = () => {
    this.props.setFullScreen(() => screenfull.isFullscreen);
  };

  handleDownload = event => {
    event.preventDefault();
    this.props.onDownloadClick();
  };

  handlePageChange = page => {
    this.props.setSlide(() => page);
  };

  toggleFullscreen = event => {
    event.preventDefault();
    screenfull.toggle(this.refs.mainViewer);
  };

  preventBehaviour = event => event.preventDefault();

  renderSheetMusicViewer() {
    const { images = [] } = this.props;

    const imageElements = images.map((image, index) => (
      <div className="sheetmusic__viewer-page" key={index}>
        {/* Lazy loading in `src` attribute -- We only load images near the
            current slide index */}
        <img
          className="sheetmusic__viewer-page-image"
          src={Math.abs(index - this.props.slide + 1) < 2 ? image : null}
          onDragStart={this.preventBehaviour}
          onClick={this.preventBehaviour}
        />
      </div>
    ));

    return (
      <div className="sheetmusic__viewer-container">
        <Carousel
          onChange={this.handlePageChange}
          className="sheetmusic__viewer"
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
          <div className="sheetmusic__controls-page-number-section">
            {'Page '}
            <span className="sheetmusic__controls-page-number">
              {this.props.slide}
            </span>
            {' / '}
            <span className="sheetmusic__controls-page-number">
              {this.props.images.length}
            </span>
          </div>
        </If>
        <If condition={screenfull && screenfull.enabled}>
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
