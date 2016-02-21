
import React from 'react';

import SearchResult from './utils/SearchResult';

export default function BrowseList({ sheetMusicList }) {
  const { list } = sheetMusicList;

  const listElements = list.map((sheetMusic, index) => (
    <SearchResult sheetMusic={sheetMusic}
      key={sheetMusic.id}
      firstItem={index === 0}
      lastItem={index === list.length - 1}
    />
  ));

  return (
    <If condition={list.length > 0}>
      {listElements}
    <Else />
      <div className="search__results-not-found">
        Nothing to display!
      </div>
    </If>
  );
}
