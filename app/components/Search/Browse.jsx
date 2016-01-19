
import classNames from 'classnames';
import debounce from 'lodash/function/debounce';
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import includes from 'lodash/collection/includes';
import intersection from 'lodash/array/intersection';
import isEqual from 'lodash/lang/isEqual';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { History, Link } from 'react-router';

import FilterGroup from './utils/FilterGroup';
import PaidSearchResult from './utils/PaidSearchResult';
import SearchResult from './utils/SearchResult';

// The number of items per search page
const PAGE_SIZE = 12;

function retrieveInitialData(flux, query) {
  let sheetMusicActions = flux.getActions('sheetmusic');
  let {
    show,
    page,
    trending,
    query: searchQuery,
  } = query || {};

  // Default to the first page
  page = page || 1;

  // Default to the popular view
  show = show || 'popular';

  // Default to seven days
  trending = trending || '7days';

  if (searchQuery) {
    return sheetMusicActions.search(searchQuery, flux);
  } else if (show === 'trending') {
    if (trending === '90days') {
      return sheetMusicActions.getTrendingSheetMusic(90, PAGE_SIZE, flux);
    } else if (trending === '30days') {
      return sheetMusicActions.getTrendingSheetMusic(30, PAGE_SIZE, flux);
    } else {
      return sheetMusicActions.getTrendingSheetMusic(7, PAGE_SIZE, flux);
    }
  } else if (show === 'new') {
    return sheetMusicActions.getSheetMusicList({
      page,
      orderBy: 'new',
      sortBy: 'desc',
      pageSize: PAGE_SIZE,
    }, flux);
  } else if (show === 'most_difficult') {
    return sheetMusicActions.getSheetMusicList({
      page,
      orderBy: 'difficulty',
      sortBy: 'desc',
      pageSize: PAGE_SIZE,
    }, flux);
  } else if (show === 'least_difficult') {
    return sheetMusicActions.getSheetMusicList({
      page,
      orderBy: 'difficulty',
      sortBy: 'asc',
      pageSize: PAGE_SIZE,
    }, flux);
  } else { // Popular
    return sheetMusicActions.getSheetMusicList({
      page,
      orderBy: 'popular',
      sortBy: 'desc',
      pageSize: PAGE_SIZE,
    }, flux);
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
           * What to show when a query is not made
           */
          show: React.PropTypes.oneOf([
            'popular',
            'new',
            'trending',
            'most_difficult',
            'least_difficult',
          ]),

          /**
           * The page number
           */
          page: React.PropTypes.string,

          /**
           * How many days to calculate trending over
           */
          trendingBy: React.PropTypes.string,
        }),
      ]),
    }),
  },

  mixins: [
    History,
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
       (!query && !this.state.sheetMusicList.list.length)) {
      retrieveInitialData(this.flux, this.props.location.query || {});
    }
  },

  componentDidUpdate(prevProps) {
    // If query params change, reload the data.
    if (!isEqual(prevProps.location.query, this.props.location.query)) {
      // Scroll to the top of the page.
      window.scrollTo(0, 0);

      // Update state given the query.
      retrieveInitialData(this.flux, this.props.location.query || {});
    }
  },

  getFilter_(text, icon) {
    return (
      <span>
        <If condition={icon}>
          <FontAwesome name={icon} className="search__filter-group-filter-icon" />
        </If>
        {text}
      </span>
    );
  },

  getFilters_() {
    let { show, trending } = this.props.location.query || {};

    show = includes([
      'popular',
      'new',
      'trending',
      'most_difficult',
      'least_difficult',
    ], show) ? show : 'popular';

    trending = includes([
      '7days',
      '30days',
      '90days',
    ], trending) ? trending : '7days';

    let sortByFilters = {
      groupName: 'sort',
      groupTitle: 'Sort by',
      multiSelect: false,
      isHalfSpace: false,
      value: show,
      filters: [
        {
          value: 'popular',
          valueNode: this.getFilter_('Popular', 'thumbs-up'),
        }, {
          value: 'new',
          valueNode: this.getFilter_('New', 'star'),
        }, {
          value: 'trending',
          valueNode: this.getFilter_('Trending', 'line-chart'),
        }, {
          value: 'most_difficult',
          valueNode: this.getFilter_('Most Difficult', 'frown-o'),
        }, {
          value: 'least_difficult',
          valueNode: this.getFilter_('Least Difficult', 'smile-o'),
        },
      ],
    };

    let trendingFilters = {
      groupName: 'trending',
      groupTitle: 'Trending by',
      multiSelect: false,
      isHalfSpace: false,
      value: trending,
      filters: [
        {
          value: '7days',
          valueNode: this.getFilter_('Last Week'),
        }, {
          value: '30days',
          valueNode: this.getFilter_('Last Month'),
        }, {
          value: '90days',
          valueNode: this.getFilter_('Last 3 Months'),
        },
      ],
    };

    return [
      sortByFilters,
      show === 'trending' ? trendingFilters : {},
    ];
  },

  handleFilterChange_(groupName, nextValue) {
    let nextParams = {};
    if (groupName === 'sort') {
      if (nextValue === 'trending') {
        nextParams = { show: 'trending', trending: '7days' };
      } else {
        nextParams = { show: nextValue };
      }
    } else if (groupName === 'trending') {
      nextParams = { show: 'trending', trending: nextValue };
    }
    this.history.pushState(null, this.props.location.pathname, nextParams);
  },

  handleSearchTextChange_() {
    this.flux.getActions('progress').addProgress('searchQuery');

    // Attach debounce function to this instance and cache it.
    this.searchQueryChangeFunction_ = this.searchQueryChangeFunction_ ||
      debounce(this.handleSearchQueryChange_, 500);

    // Call the retrieved property.
    this.searchQueryChangeFunction_();
  },

  handleSearchQueryChange_() {
    this.flux.getActions('progress').removeProgress('searchQuery');
    let value = findDOMNode(this.refs.searchBox).value;
    if (value === '') {
      this.history.replaceState(null, this.props.location.pathname, {
        show: 'popular',
      });
    } else {
      this.history.replaceState(null, this.props.location.pathname, {
        query: value,
      });
    }
  },

  renderSearchFilters_() {
    return (
      <div className="search__filters">
        {this.getFilters_()
          .filter(filterGroup => filterGroup.groupName)
          .map(filterGroup => (
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
        <FontAwesome name="cog" spin />
      </div>
    );
  },

  renderSearchResults_() {
    let { free, paid } = this.state.searchResults;
    return (
      <div>
        <div className="search__results-free">
          <If condition={free.length > 0}>
            {free.map((sheetMusic, index) => (
              <SearchResult sheetMusic={sheetMusic}
                key={index}
                firstItem={index === 0}
                lastItem={index === free.length - 1} />
            ))}
          <Else />
            <div className="search__results-not-found">
              Could not find anything.
            </div>
          </If>
        </div>
        <If condition={paid && paid.length > 0}>
          <div>
            <div className="search__results-other-sources">
              Other Sources
            </div>
            <div className="search__results-paid">
              {paid.map((sheetMusic, index) => (
                <PaidSearchResult paidSheetMusic={sheetMusic}
                  key={index}
                  firstItem={index === 0}
                  lastItem={index === free.length - 1} />
              ))}
            </div>
          </div>
        </If>
      </div>
    );
  },

  renderBrowsePage_() {
    let { list } = this.state.sheetMusicList;
    return (
      <If condition={list.length > 0}>
        {list.map((sheetMusic, index) => (
          <SearchResult sheetMusic={sheetMusic}
            key={sheetMusic.id}
            firstItem={index === 0}
            lastItem={index === list.length - 1} />
        ))}
      <Else />
        <div className="search__results-not-found">
          Nothing to display!
        </div>
      </If>
    );
  },

  renderPagination_() {
    let { count } = this.state.sheetMusicList;
    let { page, query } = this.props.location.query || {};

    // Don't display pagination if we have a search query.
    // TODO(ankit): Remove this once pagination is implemented on search page.
    if (count === 0 || query) return null;

    let numberOfPages = Math.ceil(count / PAGE_SIZE);
    let currentPage = parseInt(page || 1, 10);

    // Don't display pagination buttons if we have less than 2 pages
    if (numberOfPages < 2) return null;

    return (
      <div className="search__pagination">
        <If condition={currentPage > 1}>
          <Link to={this.props.location.pathname}
            query={{
              ...this.props.location.query,
              page: currentPage - 1,
            }}
            className="search__pagination-button">
            <FontAwesome name="angle-left" />
          </Link>
        <Else />
          <div className="search__pagination-button" />
        </If>
        <div className="search__pagination-current-page">
          {`Page ${currentPage}`}
        </div>
        <If condition={currentPage < numberOfPages}>
          <Link to={this.props.location.pathname}
            query={{
              ...this.props.location.query,
              page: currentPage + 1,
            }}
            className="search__pagination-button">
            <FontAwesome name="angle-right" />
          </Link>
        <Else />
          <div className="search__pagination-button" />
        </If>
        <div className="search__pagination-clearfix" />
      </div>
    );
  },

  render() {
    let { query } = this.props.location.query || {};

    let inProgress = intersection(this.state.inProgress, [
      'search',
      'searchQuery',
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
    });

    return (
      <div>
        <Helmet title="Browse Sheet Music" />
        <div className="search__browse-search">
          <input type="text"
            className="search__browse-search-input"
            placeholder="Search for sheet music..."
            defaultValue={query || ''}
            onChange={this.handleSearchTextChange_}
            ref="searchBox" />
          {/*
            Add this back once the API returns a proper search result count.
            <If condition={query}>
              <div className="search__browse-search-count">
                <If condition={this.state.searchResults.count === 1}>
                  <span>1 result</span>
                <Else />
                  <span>{this.state.searchResults.count} results</span>
                </If>
              </div>
            </If>
            */}
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
            {this.renderPagination_()}
          </div>
        </div>
      </div>
    );
  },

});

