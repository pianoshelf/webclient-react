
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { Link } from 'react-router';

import ViewsTag from './ViewsTag';
import DifficultyLevelTag from './DifficultyLevelTag';
import SheetMusicTags from './SheetMusicTags';
import { createEventTracker } from '../../../utils/analytics';
import { sheetMusicPropType } from '../../../utils/sheetMusicUtils';

const trackEvent = createEventTracker('Browse');

function trackResultClick() {
  trackEvent('click', 'Sheet Music Result');
}

export default function SearchResult({ sheetMusic, isFirstItem = false, isLastItem = false }) {
  const className = classNames('search__result', {
    'search__result--last-item': isLastItem,
    'search__result--first-item': isFirstItem,
  });

  // TODO(ankit): Eventually link this with new tags API
  const tags = [];

  // TODO(ankit): Eventually turn this into a function that normalizes the music key.
  const normalizedKey = sheetMusic.musicKey;
  if (normalizedKey) tags.push(normalizedKey);

  return (
    <Link
      to={`/sheetmusic/${sheetMusic.id}/${sheetMusic.uniqueUrl}`}
      className={className}
      onClick={trackResultClick}
    >
      <If condition={sheetMusic.thumbnailUrl}>
        <img src={sheetMusic.thumbnailUrl}
          className="search__result-thumbnail"
        />
      </If>
      <div className="search__result-details">
        <div className="search__result-title">
          {sheetMusic.title}
        </div>
        <div className="search__result-info">
          <If condition={sheetMusic.musicStyle}>
            <span>
              <strong>{sheetMusic.musicStyle}</strong>
              &nbsp;by&nbsp;
              <strong>{sheetMusic.composer}</strong>
            </span>
          <Else />
            <span>
              By&nbsp;
              <strong>{sheetMusic.composer}</strong>
            </span>
          </If>
        </div>
        <ul className="search__result-properties">
          <ViewsTag viewCount={sheetMusic.viewCount} />
          <DifficultyLevelTag difficultyLevel={sheetMusic.difficultyLevel} />
          <SheetMusicTags tags={tags} />
        </ul>
      </div>
      <FontAwesome name="angle-right" className="search__result-right-arrow" />
    </Link>
  );
}

SearchResult.propTypes = {
  /**
   * Make sure a valid sheet music was inputted.
   */
  sheetMusic: sheetMusicPropType().isRequired,

  /**
   * Whether this search result is the first one in the list.
   */
  isFirstItem: React.PropTypes.bool,

  /**
   * Whether this search result is the last one in the list.
   */
  isLastItem: React.PropTypes.bool,
};
