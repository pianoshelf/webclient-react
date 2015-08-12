
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React from 'react';

import { sheetMusicPropType } from '../../../utils/sheetMusicUtils';

export default React.createClass({
  propTypes: {
    /**
     * Make sure a valid sheet music was inputted.
     */
    sheetMusic: sheetMusicPropType().isRequired,

    /**
     * Whether this search result is the first one in the list.
     */
    firstItem: React.PropTypes.bool,

    /**
     * Whether this search result is the last one in the list.
     */
    lastItem: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      sheetMusic: {},
      lastItem: false,
    };
  },

  getDifficultyText_(difficultyLevel) {
    switch (difficultyLevel) {
      case 1: return (
        <span>Beginner</span>
      );
      case 2: return (
        <span>Novice</span>
      );
      case 3: return (
        <span>Intermediate</span>
      );
      case 4: return (
        <span>Advanced</span>
      );
      case 5: return (
        <span>Expert</span>
      );
      default: return (
        <span>Not Rated</span>
      );
    }
  },

  renderViewsTag_(viewCount) {
    if (!viewCount) return null;
    let className = "search__result-property search__result-property--dark";
    return (
      <div className={className} key="views">
        <FontAwesome name="eye" className="search__result-property-icon" />
        {viewCount}
      </div>
    );
  },

  renderDifficultyTag_(difficultyLevel) {
    let className = classNames({
      'search__result-property': true,
      'search__result-property--blue': difficultyLevel === 1,
      'search__result-property--green': difficultyLevel === 2 || difficultyLevel === 3,
      'search__result-property--orange': difficultyLevel === 4,
      'search__result-property--red': difficultyLevel === 5,
    });

    return (
      <div className={className} key="difficulty">
        {this.getDifficultyText_(difficultyLevel)}
      </div>
    );
  },

  render() {
    let className = classNames({
      'search__result': true,
      'search__result--last-item': this.props.lastItem,
      'search__result--first-item': this.props.firstItem,
    });

    let tags = [];

    let normalizedKey = this.normalizeKey_();
    if (normalizedKey) tags.push(normalizedKey);

    // TODO: use <Link>
    return (
      <a className={className} href="#">
        <div className="search__result-title">
          {this.props.sheetMusic.title}
        </div>
        <div className="search__result-details">
          <If condition={this.props.sheetMusic.musicStyle}>
            <span>
              <strong>{this.props.sheetMusic.musicStyle}</strong>
              &nbsp;by&nbsp;
              <strong>{this.props.sheetMusic.composer}</strong>
            </span>
          <Else />
            <span>
              By&nbsp;
              <strong>{this.props.sheetMusic.composer}</strong>
            </span>
          </If>
        </div>
        <div className="search__result-properties">
          {this.renderViewsTag_(this.props.sheetMusic.viewCount)}
          {this.renderDifficultyTag_(this.props.sheetMusic.difficulty)}
          {tags.map((tag, index) => (
            <div className="search__result-property" key={index}>{tag}</div>
          ))}
        </div>
        <FontAwesome name="angle-right" className="search__result-right-arrow" />
      </a>
    );
  },

  normalizeKey_() {
    let key = this.props.sheetMusic.musicKey;
    if (key) {

    }
    return key;
  },


});
