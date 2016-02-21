
import FontAwesome from 'react-fontawesome';
import includes from 'lodash/collection/includes';
import React from 'react';

import FilterGroup from './FilterGroup';

function createFilterNode(text, icon) {
  return (
    <span>
      <If condition={icon}>
        <FontAwesome name={icon} className="search__filter-group-filter-icon" />
      </If>
      {text}
    </span>
  );
}

function getFilters(query = {}) {
  let { show, trending } = query;

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

  const sortByFilters = {
    groupName: 'sort',
    groupTitle: 'Sort by',
    multiSelect: false,
    isHalfSpace: false,
    value: show,
    filters: [
      {
        value: 'popular',
        valueNode: createFilterNode('Popular', 'thumbs-up'),
      }, {
        value: 'new',
        valueNode: createFilterNode('New', 'star'),
      }, {
        value: 'trending',
        valueNode: createFilterNode('Trending', 'line-chart'),
      }, {
        value: 'most_difficult',
        valueNode: createFilterNode('Most Difficult', 'frown-o'),
      }, {
        value: 'least_difficult',
        valueNode: createFilterNode('Least Difficult', 'smile-o'),
      },
    ],
  };

  const trendingFilters = {
    groupName: 'trending',
    groupTitle: 'Trending by',
    multiSelect: false,
    isHalfSpace: false,
    value: trending,
    filters: [
      {
        value: '7days',
        valueNode: createFilterNode('Last Week'),
      }, {
        value: '30days',
        valueNode: createFilterNode('Last Month'),
      }, {
        value: '90days',
        valueNode: createFilterNode('Last 3 Months'),
      },
    ],
  };

  return [
    sortByFilters,
    show === 'trending' ? trendingFilters : {},
  ];
}

export default function SearchFilters({ location, onFilterChange }) {
  const { query } = location;
  return (
    <div className="search__filters">
      {getFilters(query)
        .filter(filterGroup => filterGroup.groupName)
        .map(filterGroup => (
          <FilterGroup {...filterGroup}
            key={filterGroup.groupName}
            onChange={onFilterChange}
          />
        ))}
    </div>
  );
}
