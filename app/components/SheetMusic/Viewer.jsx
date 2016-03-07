
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import React from 'react';
import times from 'lodash/times';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';

import Detail from './utils/Detail';
import InfoBox from './utils/InfoBox';
import LoadingScreen from './utils/LoadingScreen';
import MainViewer from './MainViewer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';
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
  };

  handleShowMoreVideos = event => {
    event.preventDefault();
    this.setState({
      showVideos: this.state.showVideos + 5,
    });
  };

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
        <Comments id={this.props.result.id} comments={this.props.commentResult.list.comment} />
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
          <div>
            <MainViewer ref="mainViewer" images={this.props.result.images} />
            <ResponsiveContainer className="sheetmusic__details">
              <div className="sheetmusic__details-left">
                {this.renderDescription()}
                {/* this.renderVideos() */}
                {this.renderComments()}
              </div>
              <div className="sheetmusic__details-right">
                {this.renderInfo()}
              </div>
            </ResponsiveContainer>
          </div>
        </If>
      </div>
    );
  }
}
