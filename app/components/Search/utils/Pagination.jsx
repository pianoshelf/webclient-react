
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { Link } from 'react-router';

export default function Pagination({ sheetMusicCount, pageSize, location }) {
  const { page, query } = location.query || {};

  // Don't display pagination if we have a search query.
  // TODO(ankit): Remove this once pagination is implemented on search page.
  if (sheetMusicCount === 0 || query) return <div />;

  const numberOfPages = Math.ceil(sheetMusicCount / pageSize);
  const currentPage = parseInt(page || 1, 10);

  // Don't display pagination buttons if we have less than 2 pages
  if (numberOfPages < 2) return <div />;

  return (
    <div className="search__pagination">
      <If condition={currentPage > 1}>
        <Link
          to={{
            pathname: location.pathname,
            query: { ...location.query, page: currentPage - 1 },
          }}
          className="search__pagination-button"
        >
          <FontAwesome name="angle-left" />
        </Link>
      <Else />
        <div className="search__pagination-button" />
      </If>
      <div className="search__pagination-current-page">
        {`Page ${currentPage}`}
      </div>
      <If condition={currentPage < numberOfPages}>
        <Link
          to={{
            pathname: location.pathname,
            query: { ...location.query, page: currentPage + 1 },
          }}
          className="search__pagination-button"
        >
          <FontAwesome name="angle-right" />
        </Link>
      <Else />
        <div className="search__pagination-button" />
      </If>
      <div className="search__pagination-clearfix" />
    </div>
  );
}
