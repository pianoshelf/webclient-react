
import React from 'react';

import PaidSearchResult from './PaidSearchResult';
import SearchResult from './SearchResult';

export default function SearchResults({ searchResults }) {
  const { free, paid } = searchResults;

  const freeResultsElements = free.map((sheetMusic, index) => (
    <SearchResult
      sheetMusic={sheetMusic}
      key={index}
      firstItem={index === 0}
      lastItem={index === free.length - 1}
    />
  ));

  const paidResultsElements = paid.map((sheetMusic, index) => (
    <PaidSearchResult
      paidSheetMusic={sheetMusic}
      key={index}
      firstItem={index === 0}
      lastItem={index === free.length - 1}
    />
  ));

  return (
    <div>
      <div className="search__results-free">
        <If condition={free.length > 0}>
          {freeResultsElements}
        <Else />
          <div className="search__results-not-found">
            No results
          </div>
        </If>
      </div>
      <If condition={paid && paid.length > 0}>
        <div>
          <div className="search__results-other-sources">
            Other Sources
          </div>
          <div className="search__results-paid">
            {paidResultsElements}
          </div>
        </div>
      </If>
    </div>
  );
}
