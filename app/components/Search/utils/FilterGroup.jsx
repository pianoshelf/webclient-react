
import defer from 'lodash/defer';
import includes from 'lodash/includes';
import React from 'react';

import Filter from './Filter';

function handleOnChange(options) {
  return function handleOnChangeImpl(value, willBeSelected) {
    let nextValue = options.value;

    if (options.multiSelect) {
      if (willBeSelected) {
        nextValue.push(value);
      } else {
        nextValue.splice(nextValue.indexOf(value), 1);
      }
    } else {
      if (willBeSelected) {
        nextValue = value;
      }
    }

    // Defer onChange event
    defer(() => options.onChange(options.groupName, nextValue));
  };
}

function getFilters(options) {
  return options.filters.map((filter, index) => {
    const isSelected = options.multiSelect ?
      includes(options.value, filter.value) : (options.value === filter.value);

    const bottomBorder = (index < options.filters.length -
      (options.isHalfSpace ? 2 : 1));

    const rightBorder = (options.isHalfSpace && index % 2 === 0);

    return (
      <Filter {...filter}
        isSelected={isSelected}
        isHalfSpace={options.isHalfSpace}
        bottomBorder={bottomBorder}
        rightBorder={rightBorder}
        key={filter.value}
        onChange={handleOnChange(options)}
      />
    );
  });
}

export default function FilterGroup(options) {
  return (
    <div className="search__filter-group">
      <div className="search__filter-group-title">{options.groupTitle}</div>
      <div className="search__filter-groups">
        {getFilters(options)}
      </div>
    </div>
  );
}

FilterGroup.propTypes = {
  /**
   * An array representing each filter in this filter group.
   */
  filters: React.PropTypes.arrayOf(React.PropTypes.shape({
    /**
     * The option this filter corresponds to.
     */
    value: React.PropTypes.string.isRequired,

    /**
     * The text or node that corresponds to this filter.
     */
    valueNode: React.PropTypes.node.isRequired,
  })),

  /**
   * Name of the filter group.
   */
  groupName: React.PropTypes.string.isRequired,

  /**
   * The title of the filter group.
   */
  groupTitle: React.PropTypes.string.isRequired,

  /**
   * Whether multiSelect should be enabled.
   */
  multiSelect: React.PropTypes.bool,

  /**
   * Whether the resulting buttons should take up half the space.
   */
  isHalfSpace: React.PropTypes.bool,

  /**
   * The event that will be called once a filter is changed.
   */
  onChange: React.PropTypes.func.isRequired,

  /**
   * Initial value of the group.
   */
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
};
