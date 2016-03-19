
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

export default function SheetMusicResult({ sheetMusic }) {
  // TODO(ankit): Eventually link this with new tags API
  const tags = [];

  // TODO(ankit): Eventually turn this into a function that normalizes the music key.
  const normalizedKey = sheetMusic.musicKey;
  if (normalizedKey) tags.push(normalizedKey);

  return (
    <Link
      to={`/sheetmusic/${sheetMusic.id}/${sheetMusic.uniqueUrl}`}
      className="sheet-music-result"
      onClick={trackResultClick}
    >
      <If condition={sheetMusic.thumbnailUrl}>
        <img src={sheetMusic.thumbnailUrl}
          className="sheet-music-result__thumbnail"
        />
      </If>
      <div className="sheet-music-result__details">
        <div className="sheet-music-result__title">
          {sheetMusic.title}
        </div>
        <div className="sheet-music-result__info">
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
        <ul className="sheet-music-result__properties">
          <ViewsTag viewCount={sheetMusic.viewCount} />
          <DifficultyLevelTag difficulty={sheetMusic.difficulty} />
          <SheetMusicTags tags={tags} />
        </ul>
      </div>
      <FontAwesome name="angle-right" className="sheet-music-result__right-arrow" />
    </Link>
  );
}

SheetMusicResult.propTypes = {
  // Make sure a valid sheet music was inputted.
  sheetMusic: sheetMusicPropType().isRequired,
};
