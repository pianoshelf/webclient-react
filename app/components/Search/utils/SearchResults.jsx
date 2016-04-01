
import React from 'react';

import SheetMusicResult from '../../Misc/SheetMusicResult';

export default function SearchResults({ searchResults }) {
  const resultElements = searchResults.free.map((sheetMusic, index) => (
    <SheetMusicResult sheetMusic={sheetMusic} key={index} />
  ));

  return (
    <div className="search__results-free">
      <If condition={resultElements.length > 0}>
        {resultElements}
      <Else />
        <div className="search__results-not-found">
          No results
        </div>
      </If>
    </div>
  );
}

SearchResults.propTypes = {
  searchResults: React.PropTypes.array.isRequired,
};
