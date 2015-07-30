
import Helmet from 'react-helmet';
import React from 'react';
import { addons } from 'react/addons';

import FilterGroup from './utils/FilterGroup';

let { LinkedStateMixin } = addons;

// Schema for filters
let filterGroups = [
  {
    groupName: 'order',
    groupTitle: 'Sort by views',
    multiSelect: true,
    isHalfSpace: true,
    filters: [
      {
        value: 'asc',
        valueNode: 'Lowest',
      }, {
        value: 'desc',
        valueNode: 'Highest',
      },
    ],
  },
];

export default React.createClass({

  mixins: [
    LinkedStateMixin,
  ],

  getInitialState() {
    return {
      query: '',
      filters: {},
    };
  },

  render() {
    return (
      <Helmet title="Browse Sheet Music">
        <div className="search__browse-search">
          <input type="text"
            className="search__browse-search-input"
            placeholder="Search for sheet music..."
            valueLink={this.linkState('query')} />
        </div>
        <div className="search__filters">
          {filterGroups.map(filterGroup => (
            <FilterGroup {...filterGroup}
              key={filterGroup.groupName}
              onChange={this.handleFilterChange_} />
          ))}
        </div>
      </Helmet>
    );
  },

  handleFilterChange_(groupName, filterState) {
    let { filters } = this.state;
    filters[groupName] = filterState;
    this.setState({ filterState });
  },

});

