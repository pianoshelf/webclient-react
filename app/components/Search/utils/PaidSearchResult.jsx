
import classNames from 'classnames';
import React from 'react';

import { paidSheetMusicPropType } from '../../../utils/sheetMusicUtils';

export default function PaidSearchResult({ paidSheetMusic, isFirstItem = false,
                                         isLastItem = false }) {

  const className = classNames('search__result', 'search__result--paid', {
    'search__result--last-item': isLastItem,
    'search__result--first-item': isFirstItem,
  });

  // TODO: use <Link>
  return (
    <a className={className} href={paidSheetMusic.pageUrl}>
      <If condition={paidSheetMusic.thumbnailUrl}>
        <img src={paidSheetMusic.thumbnailUrl}
          className="search__result-thumbnail search__result-thumbnail--paid"
        />
      </If>
      <div className="search__result-details search__result-details--paid">
        <div className="search__result-title">
          {paidSheetMusic.title}
        </div>
        <div className="search__result-description">
          {paidSheetMusic.shortDescription}
        </div>
        <ul className="search__result-properties">
          <li className="search__result-property search__result-property--orange">
            {paidSheetMusic.source}
          </li>
        </ul>
      </div>
    </a>
  );
}

PaidSearchResult.propTypes = {
  /**
   * Make sure valid paid sheet music is inputted.
   */
  paidSheetMusic: paidSheetMusicPropType().isRequired,

  /**
   * Whether this search result is the first one in the list.
   */
  firstItem: React.PropTypes.bool,

  /**
   * Whether this search result is the last one in the list.
   */
  lastItem: React.PropTypes.bool,
};
