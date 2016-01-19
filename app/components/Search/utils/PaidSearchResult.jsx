
import classNames from 'classnames';
import React from 'react';

import { paidSheetMusicPropType } from '../../../utils/sheetMusicUtils';

export default React.createClass({
  propTypes: {
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
  },

  getDefaultProps() {
    return {
      paidSheetMusic: {},
      firstItem: false,
      lastItem: false,
    };
  },

  render() {
    const className = classNames({
      search__result: true,
      'search__result--paid': true,
      'search__result--last-item': this.props.lastItem,
      'search__result--first-item': this.props.firstItem,
    });

    // TODO: use <Link>
    return (
      <a className={className} href={this.props.paidSheetMusic.pageUrl}>
        <If condition={this.props.paidSheetMusic.thumbnailUrl}>
          <img src={this.props.paidSheetMusic.thumbnailUrl}
            className="search__result-thumbnail search__result-thumbnail--paid"
          />
        </If>
        <div className="search__result-details search__result-details--paid">
          <div className="search__result-title">
            {this.props.paidSheetMusic.title}
          </div>
          <div className="search__result-description">
            {this.props.paidSheetMusic.shortDescription}
          </div>
          <ul className="search__result-properties">
            <li className="search__result-property search__result-property--orange">
              {this.props.paidSheetMusic.source}
            </li>
          </ul>
        </div>
      </a>
    );
  },
});
