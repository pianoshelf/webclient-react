
import React from 'react';

import SearchResult from './SearchResult';

export default function BrowseList({ sheetMusicList }) {
  const listElements = sheetMusicList.map((sheetMusic, index) => (
    <SearchResult sheetMusic={sheetMusic}
      key={sheetMusic.id}
      firstItem={index === 0}
      lastItem={index === sheetMusicList.length - 1}
    />
  ));

  return (
    <If condition={sheetMusicList.length > 0}>
      {listElements}
    <Else />
      <div className="search__results-not-found">
        Nothing to display!
      </div>
    </If>
  );
}
