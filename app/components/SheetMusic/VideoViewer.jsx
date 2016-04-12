
import React from 'react';
import withState from 'recompose/withState';

@withState('selected', 'setVideo', -1)
export default class VideoViewer extends React.Component {

  static propTypes = {
    videos: React.PropTypes.array.isRequired,
    setVideo: React.PropTypes.func.isRequired,
  };

  getEmbedVideoURL(youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
  }

  getThumbnailUrl(youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
  }

  selectVideo(index) {
    return () => {
      this.props.setVideo(() => index);
    };
  }

  render() {
    const videos = this.props.videos;

    const videoElements = videos.map((video, index) => (
      <span className="sheetmusic__video" key={index}>
        <img
          className="video__thumbnail"
          src={this.getThumbnailUrl(video.youtubeId)}
          onClick={this.selectVideo(index)}
          title={video.title}
        />
      </span>
    ));

    return (
      <span>
        <If condition={this.props.selected > -1}>
          <iframe
            className="video__player"
            src={this.getEmbedVideoURL(videos[this.props.selected].youtubeId)}
            frameBorder="0"
            allowFullScreen
          />
        </If>
        {videoElements}
      </span>
    );
  }
}
