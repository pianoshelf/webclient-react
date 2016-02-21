
import classNames from 'classnames';
import debounce from 'lodash/function/debounce';
import Helmet from 'react-helmet';
import intersection from 'lodash/array/intersection';
import isEqual from 'lodash/lang/isEqual';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import BrowseList from './utils/BrowseList';
import Pagination from './utils/Pagination';
import SearchFilters from './utils/SearchFilters';
import SearchResults from './utils/SearchResults';
import Spinner from './utils/Spinner';

import { dispatchAndPromise } from '../utils/reduxUtils';
import { search, getTrendingSheetMusic, getSheetMusicList } from '../../actions/sheetmusic';
import { addProgress, removeProgress } from '../../actions/progress';

// The number of items per search page
const PAGE_SIZE = 12;

@asyncConnect({
  promise: ({
    page = 1,
    show = 'popular',
    trending = '7days',
    query: searchQuery,
  }, { store }) => {
    if (searchQuery) {
      return dispatchAndPromise(store.dispatch, search(searchQuery, store));
    } else {
      switch (show) {
        case 'trending':
          if (trending === '90days') {
            return dispatchAndPromise(
              store.dispatch,
              getTrendingSheetMusic(90, PAGE_SIZE, store)
            );
          } else if (trending === '30days') {
            return dispatchAndPromise(
              store.dispatch,
              getTrendingSheetMusic(30, PAGE_SIZE, store)
            );
          }
          return dispatchAndPromise(
            store.dispatch,
            getTrendingSheetMusic(7, PAGE_SIZE, store)
          );
        case 'new':
          return dispatchAndPromise(
            store.dispatch,
            getSheetMusicList(
              { page, orderBy: 'new', sortBy: 'desc', pageSize: PAGE_SIZE },
              store
            )
          );
        case 'most_difficult':
          return dispatchAndPromise(
            store.dispatch,
            getSheetMusicList(
              { page, orderBy: 'difficulty', sortBy: 'desc', pageSize: PAGE_SIZE },
              store
            )
          );
        case 'least_difficult':
          return dispatchAndPromise(
            store.dispatch,
            getSheetMusicList(
              { page, orderBy: 'difficulty', sortBy: 'asc', pageSize: PAGE_SIZE },
              store
            )
          );
        default:
          return dispatchAndPromise(
            store.dispatch,
            getSheetMusicList(
              { page, orderBy: 'popular', sortBy: 'desc', pageSize: PAGE_SIZE },
              store
            )
          );
      }
    }
  },
})

@connect(
  state => ({
    sheetMusicList: state.sheetmusic.lists.list,
    searchResults: state.search,
    inProgress: state.progress.inProgress,
  })
)

export default class Browse extends React.Component {
  static propTypes = {
    // An object containing location information
    location: React.PropTypes.shape({
      // The current path name
      pathname: React.PropTypes.string,
      // The query parameters for the search results
      query: React.PropTypes.oneOfType([
        React.PropTypes.shape({
          // When there is a search query
          query: React.PropTypes.string,
        }),
        React.PropTypes.shape({
          // What to show when a query is not made
          show: React.PropTypes.oneOf([
            'popular',
            'new',
            'trending',
            'most_difficult',
            'least_difficult',
          ]),
          // The page number
          page: React.PropTypes.string,
          // How many days to calculate trending over
          trendingBy: React.PropTypes.string,
        }),
      ]),
    }),
    // List of sheet music obtained from filters
    sheetMusicList: React.PropTypes.object.isRequired,
    // List of search results
    searchResults: React.PropTypes.object.isRequired,
    // Progress array
    inProgress: React.PropTypes.array.isRequired,
    // Redux store
    store: React.PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  /**
   * Component lifecycle methods
   */

  componentDidMount() {
    const { query } = this.props.location.query || {};

    if ((query && !this.props.searchResults.free.length) ||
       (!query && !this.props.sheetMusicList.list.length)) {
      // retrieveInitialData(this.flux, this.props.location.query || {});
    }
  }

  componentDidUpdate(prevProps) {
    // If query params change, scroll to the top of the page
    if (!isEqual(prevProps.location.query, this.props.location.query)) {
      window.scrollTo(0, 0);
    }
  }

  /**
   * Handlers
   */

  handleFilterChange = (groupName, nextValue) => {
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
    this.context.router.push({
      pathname: this.props.location.pathname,
      query: nextParams,
    });
  };

  handleSearchTextChange = () => {
    this.props.store.dispatch(addProgress('searchQuery'));

    // Attach debounce function to this instance and cache it.
    this.searchQueryChangeFunction = this.searchQueryChangeFunction ||
      debounce(this.handleSearchQueryChange, 500);

    // Call the retrieved property.
    this.searchQueryChangeFunction();
  };

  handleSearchQueryChange = () => {
    this.props.store.dispatch(removeProgress('searchQuery'));
    const value = findDOMNode(this.refs.searchBox).value;
    if (value === '') {
      this.context.router.replace({
        pathname: this.props.location.pathname,
        query: { show: 'popular' },
      });
    } else {
      this.context.router.replace({
        pathname: this.props.location.pathname,
        query: { query: value },
      });
    }
  };

  /**
   * Render
   */

  render() {
    const { query } = this.props.location.query || {};

    const inProgress = intersection(this.props.inProgress, [
      'search',
      'searchQuery',
      'sheetMusicList',
      'trendingSheetMusic',
    ]).length > 0;

    // Condition to display filters
    const displayFilters = !query;

    const resultWrapperClassName = classNames('search__result-wrapper', {
      'search__result-wrapper--with-filters': displayFilters,
    });

    const resultsClassName = classNames('search__results', {
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
            onChange={this.handleSearchTextChange}
            ref="searchBox"
          />
          {/*
            Add this back once the API returns a proper search result count.
            <If condition={query}>
              <div className="search__browse-search-count">
                <If condition={this.props.searchResults.count === 1}>
                  <span>1 result</span>
                <Else />
                  <span>{this.props.searchResults.count} results</span>
                </If>
              </div>
            </If>
            */}
        </div>
        <div className="search__results-panel">
          <If condition={displayFilters}>
            <div className="search__filter-wrapper">
              <SearchFilters
                location={this.props.location}
                onFilterChange={this.handleFilterChange}
              />
            </div>
          </If>
          <div className={resultWrapperClassName}>
            <div className={resultsClassName}>
              <If condition={query}>
                <SearchResults
                  searchResults={this.props.searchResults}
                />
              <Else />
                <BrowseList
                  sheetMusicList={this.props.sheetMusicList}
                />
              </If>
            </div>
            <If condition={inProgress}>
              <Spinner />
            </If>
            <Pagination
              location={this.props.location}
              sheetMusicCount={this.props.sheetMusicList.count}
              pageSize={PAGE_SIZE}
            />
          </div>
        </div>
      </div>
    );
  }
}
