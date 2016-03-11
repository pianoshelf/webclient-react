
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import intersection from 'lodash/intersection';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import BrowseList from './utils/BrowseList';
import Input from '../Misc/Input';
import Pagination from './utils/Pagination';
import SearchFilters from './utils/SearchFilters';
import SearchResults from './utils/SearchResults';
import Spinner from './utils/Spinner';

import { getTrendingSheetMusic, getSheetMusicList } from '../../actions/sheetmusic';
import { search } from '../../actions/search';

// The number of items per search page
const PAGE_SIZE = 12;

// The delay before we search for something
const SEARCH_DELAY = 500;

// Create a debounced search function
const debouncedSearch = debounce((query, store, request) => {
  store.dispatch(search(query, request));
}, SEARCH_DELAY);

@asyncConnect({
  promise: (params, { location, store, request }) => {
    const {
      page = 1,
      show = 'popular',
      trending = '7days',
      query: searchQuery,
    } = location.query;

    if (searchQuery) {
      return debouncedSearch(searchQuery, store, request);
    }

    switch (show) {
      case 'trending':
        if (trending === '90days') {
          return store.dispatch(getTrendingSheetMusic(90, PAGE_SIZE, request));
        } else if (trending === '30days') {
          return store.dispatch(getTrendingSheetMusic(30, PAGE_SIZE, request));
        }
        return store.dispatch(getTrendingSheetMusic(7, PAGE_SIZE, request));
      case 'new':
        return store.dispatch(
          getSheetMusicList(
            { page, orderBy: 'new', sortBy: 'desc', pageSize: PAGE_SIZE },
            store
          )
        );
      case 'most_difficult':
        return store.dispatch(
          getSheetMusicList(
            { page, orderBy: 'difficulty', sortBy: 'desc', pageSize: PAGE_SIZE },
            store
          )
        );
      case 'least_difficult':
        return store.dispatch(
          getSheetMusicList(
            { page, orderBy: 'difficulty', sortBy: 'asc', pageSize: PAGE_SIZE },
            store
          )
        );
      default:
        return store.dispatch(
          getSheetMusicList(
            { page, orderBy: 'popular', sortBy: 'desc', pageSize: PAGE_SIZE },
            store
          )
        );
    }
  },
})

@connect(
  state => ({
    sheetMusicList: state.sheetmusic.lists.list,
    searchResults: state.search,
    trendingResults: state.sheetmusic.lists.trending,
    inProgress: state.progress.inProgress,
  })
)

@reduxForm({
  form: 'search',
  fields: ['search'],
}, (state, props) => ({
  initialValues: {
    search: props.location.query.query || '',
  },
}))

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
    // List of trending results
    trendingResults: React.PropTypes.object.isRequired,
    // Progress array
    inProgress: React.PropTypes.array.isRequired,
    // Form fields
    fields: React.PropTypes.object,
    // Handle change from redux-form
    handleChange: React.PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

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

  handleSearchQueryChange = debounce(() => {
    const { value } = this.props.fields.search;
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
  }, SEARCH_DELAY);

  handleSearchQuerySubmit = event => {
    event.preventDefault();
    this.handleSearchQueryChange();
  };

  /**
   * Render
   */

  render() {
    const { location, fields, searchResults, trendingResults, sheetMusicList } = this.props;
    const { show, query } = location.query || {};

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

    let resultsToShow = [];
    if (show === 'trending') {
      resultsToShow = trendingResults;
    } else {
      resultsToShow = sheetMusicList;
    }

    return (
      <div>
        <Helmet title="Browse Sheet Music" />
        <form
          className="search__browse-search"
          onChange={this.handleSearchQueryChange}
          onSubmit={this.handleSearchQuerySubmit}
        >
          <Input
            placeholder={
              <span>
                <FontAwesome name="search" className="search__browse-search-input-icon" />
                Search for sheet music
              </span>
            }
            {...fields.search}
          />
          {/*
            Add this back once the API returns a proper search result count.
            <If condition={query}>
              <div className="search__browse-search-count">
                <If condition={searchResults.count === 1}>
                  <span>1 result</span>
                <Else />
                  <span>{searchResults.count} results</span>
                </If>
              </div>
            </If>
            */}
        </form>
        <div className="search__results-panel">
          <If condition={displayFilters}>
            <div className="search__filter-wrapper">
              <SearchFilters location={location} onFilterChange={this.handleFilterChange} />
            </div>
          </If>
          <div className={resultWrapperClassName}>
            <div className={resultsClassName}>
              <If condition={query}>
                <SearchResults searchResults={searchResults} />
              <Else />
                <BrowseList sheetMusicList={resultsToShow.results} />
              </If>
            </div>
            <If condition={inProgress}>
              <Spinner />
            </If>
            <Pagination
              location={location}
              sheetMusicCount={resultsToShow.count}
              pageSize={PAGE_SIZE}
            />
          </div>
        </div>
      </div>
    );
  }
}
