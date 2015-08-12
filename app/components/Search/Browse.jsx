
import classNames from 'classnames';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import includes from 'lodash/collection/includes';
import intersection from 'lodash/array/intersection';
import isEqual from 'lodash/lang/isEqual';
import React from 'react';
import debounce from 'lodash/function/debounce';
import { addons } from 'react/addons';

import FilterGroup from './utils/FilterGroup';
import SearchResult from './utils/SearchResult';

let { PureRenderMixin } = addons;

function retrieveInitialData(flux, query) {
  let sheetMusicActions = flux.getActions('sheetmusic');
  let { query: searchQuery, show, page } = query || {};

  // Default to the first page
  page = page || 1;

  // Default to the popular view
  show = show || 'popular';

  // Items to show per page
  let pageSize = 12;

  // We want trending sheet music over 7 days
  let trendingDays = 7;

  if (searchQuery) {
    return sheetMusicActions.search(searchQuery, flux);
  } else if (show === 'trending') {
    return sheetMusicActions.getTrendingSheetMusic(trendingDays, pageSize, flux);
  } else {
    let orderBy = includes(['popular', 'new', 'difficulty'], show) ? show : 'popular';
    return sheetMusicActions.getSheetMusicList({ orderBy, page, pageSize }, flux);
  }
}

export default React.createClass({

  propTypes: {
    /**
     * An object containing location information
     */
    location: React.PropTypes.shape({
      /**
       * The current path name
       */
      pathname: React.PropTypes.string,

      /**
       * The query parameters for the search results
       */
      query: React.PropTypes.oneOfType([
        React.PropTypes.shape({
          // When there is a search query

          /**
           * The search query
           */
          query: React.PropTypes.string,
        }),
        React.PropTypes.shape({
          // When there is no search query

          /**
           * What to show when there are no results (popular, new, trending, difficulty)
           */
          show: React.PropTypes.oneOf(['popular', 'new', 'trending', 'difficulty']),

          /**
           * The page number
           */
          page: React.PropTypes.string,
        }),
      ]),
    }),
  },

  contextTypes: {
    /**
     * The router context, which we need if we want to make link changes.
     */
    router: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
    fluxMixin({
      sheetmusic: store => ({
        sheetMusicList: store.state.sheetMusicList,
        searchResults: store.state.searchResults,
      }),
      progress: store => store.state,
    }),
  ],

  // Define what should be fetched before route is renderred.
  statics: {
    routeWillRun({ flux, state }) {
      return retrieveInitialData(flux, state.location.query);
    },
  },

  componentDidMount() {
    let { query } = this.props.location.query || {};

    if ((query && !this.state.searchResults.free.length) ||
       (!query && !this.state.sheetMusicList.length)) {
      retrieveInitialData(this.flux, this.props.location.query || {});
    }
  },

  componentDidUpdate(prevProps) {
    // If query params change, reload the data
    if (!isEqual(prevProps.location.query, this.props.location.query)) {
      retrieveInitialData(this.flux, this.props.location.query || {});
    }
  },

  getFilters_() {
    let { show } = this.props.location.query || {};

    let sort = includes(['popular', 'new', 'trending', 'difficulty'], show) ? show : 'popular';

    return [
      {
        groupName: 'sort',
        groupTitle: 'Sort by',
        multiSelect: false,
        isHalfSpace: false,
        value: sort,
        filters: [
          {
            value: 'popular',
            valueNode: (
              <span>
                <FontAwesome name="thumbs-up" className="search__filter-group-filter-icon" />
                Popular
              </span>
            ),
          }, {
            value: 'new',
            valueNode: (
              <span>
                <FontAwesome name="star" className="search__filter-group-filter-icon" />
                New
              </span>
            ),
          }, {
            value: 'trending',
            valueNode: (
              <span>
                <FontAwesome name="line-chart" className="search__filter-group-filter-icon" />
                Trending
              </span>
            ),
          }, {
            value: 'difficulty',
            valueNode: (
              <span>
                <FontAwesome name="frown-o" className="search__filter-group-filter-icon" />
                Most Difficult
              </span>
            ),
          },
        ],
      },
    ];
  },

  renderSearchFilters_() {
    return (
      <div className="search__filters">
        {this.getFilters_().map(filterGroup => (
          <FilterGroup {...filterGroup}
            key={filterGroup.groupName}
            onChange={this.handleFilterChange_} />
        ))}
      </div>
    );
  },

  renderSpinner_() {
    return (
      <div className="search__spinner">
        <FontAwesome name="cog" spin={true} />
      </div>
    );
  },

  renderSearchResults_() {
    let { searchResults } = this.state;
    return (
      <div className="search__results-free">
        <If condition={searchResults.free.length > 0}>
          {searchResults.free.map((sheetMusic, index) => (
            <SearchResult sheetMusic={sheetMusic}
              key={sheetMusic.id}
              firstItem={index === 0}
              lastItem={index === searchResults.free.length - 1} />
          ))}
        <Else />
          <div className="search__results-not-found">
            Nothing to display!
          </div>
        </If>
      </div>
    );
  },

  renderBrowsePage_() {
    let { sheetMusicList } = this.state;
    return (
      <If condition={sheetMusicList.length > 0}>
        {sheetMusicList.map((sheetMusic, index) => (
          <SearchResult sheetMusic={sheetMusic}
            key={sheetMusic.id}
            firstItem={index === 0}
            lastItem={index === sheetMusicList.length - 1} />
        ))}
      <Else />
        <div className="search__results-not-found">
          Could not find anything.
        </div>
      </If>
    );
  },

  render() {
    let { query } = this.props.location.query || {};

    let inProgress = intersection(this.state.inProgress, [
      'search',
      'sheetMusicList',
      'trendingSheetMusic',
    ]).length > 0;

    // Condition to display filters
    let displayFilters = !query;

    let resultWrapperClassName = classNames({
      'search__result-wrapper': true,
      'search__result-wrapper--with-filters': displayFilters,
    });

    let resultsClassName = classNames({
      'search__results': true,
      'search__results--in-progress': inProgress,
    })

    return (
      <Helmet title="Browse Sheet Music">
        <div className="search__browse-search">
          <input type="text"
            className="search__browse-search-input"
            placeholder="Search for sheet music..."
            defaultValue={query || ''}
            onChange={this.handleSearchTextChange_}
            ref="searchBox" />
          <If condition={query}>
            <div className="search__browse-search-count">
              <If condition={this.state.searchResults.count === 1}>
                <span>1 result</span>
              <Else />
                <span>{this.state.searchResults.count} results</span>
              </If>
            </div>
          </If>
        </div>
        <div className="search__results-panel">
          <If condition={displayFilters}>
            <div className="search__filter-wrapper">
              {this.renderSearchFilters_()}
            </div>
          </If>
          <div className={resultWrapperClassName}>
            <div className={resultsClassName}>
              <If condition={query}>
                {this.renderSearchResults_()}
              <Else />
                {this.renderBrowsePage_()}
              </If>
            </div>
            <If condition={inProgress}>
              <div className="search__spinner">
                {this.renderSpinner_()}
              </div>
            </If>
          </div>
        </div>
      </Helmet>
    );
  },

  handleFilterChange_(groupName, nextValue) {
    if (groupName === 'sort') {
      this.context.router.transitionTo(this.props.location.pathname, {
        show: nextValue,
      });
    }
  },

  handleSearchTextChange_() {
    // HACK: As soon as the search text changes, manually update inProgress so that the UI changes.
    this.setState({
      inProgress: ['search'],
    });

    // Attach debounce function to this instance and cache it.
    this.searchQueryChangeFunction_ = this.searchQueryChangeFunction_ ||
      debounce(this.handleSearchQueryChange_, 500);

    // Call the retrieved property.
    this.searchQueryChangeFunction_();
  },

  handleSearchQueryChange_() {
    let value = React.findDOMNode(this.refs.searchBox).value;
    if (value === '') {
      this.context.router.transitionTo(this.props.location.pathname, {
        show: 'popular',
      });
    } else {
      this.context.router.transitionTo(this.props.location.pathname, {
        query: value,
      });
    }
  },

});

