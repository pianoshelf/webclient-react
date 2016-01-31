
import classNames from 'classnames';
import React from 'react';

function handleOnClick(options) {
  return function handleOnClickImpl(event) {
    event.preventDefault();
    options.onChange(options.value, !options.isSelected);
  };
}

export default function Filter(options) {
  const className = classNames({
    'search__filter-group-filter': true,
    'search__filter-group-filter--selected': options.isSelected,
    'search__filter-group-filter--half-space': options.isHalfSpace,
    'search__filter-group-filter--bottom-border': options.bottomBorder,
    'search__filter-group-filter--right-border': options.rightBorder,
  });

  return (
    <a href="" className={className} onClick={handleOnClick(options)}>
      {options.valueNode}
    </a>
  );
}

Filter.propTypes = {
  /**
   * Whether this filter is selected or not.
   */
  isSelected: React.PropTypes.bool.isRequired,

  /**
   * Whether this filter should have a bottom border.
   */
  bottomBorder: React.PropTypes.bool.isRequired,

  /**
   * Whether this filter should have a bottom border.
   */
  rightBorder: React.PropTypes.bool.isRequired,

  /**
   * Whether this filter takes up half the space.
   */
  isHalfSpace: React.PropTypes.bool.isRequired,

  /**
   * The semantic value of this filter.
   */
  value: React.PropTypes.string.isRequired,

  /**
   * The text value of this filter.
   */
  valueNode: React.PropTypes.node.isRequired,

  /**
   * The event to call when this filter is clicked on.
   */
  onChange: React.PropTypes.func.isRequired,
};
