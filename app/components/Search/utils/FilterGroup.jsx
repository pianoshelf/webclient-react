
import defer from 'lodash/function/defer';
import includes from 'lodash/collection/includes';
import intersection from 'lodash/array/intersection';
import pluck from 'lodash/collection/pluck';
import React from 'react';

import Filter from './Filter';

export default React.createClass({

  propTypes: {

    /**
     * An array representing each filter in this filter group.
     */
    filters: React.PropTypes.arrayOf(React.PropTypes.shape({

      /**
       * The option this filter corresponds to.
       */
      value: React.PropTypes.any.isRequired,

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
     * The event that will be called once a filter is changed
     */
    onChange: React.PropTypes.func,

  },

  getInitialState() {
    return {
      filterState: this.props.multiSelect ? [] : this.props.filters[0].value,
    };
  },

  componentWillReceiveProps(nextProps) {
    let { filterState } = this.state;

    if (nextProps.multiSelect) {

      // If we just turned into a multiSelect FilterGroup
      if (!this.props.multiSelect) filterState = [filterState];

      // Get an array of each value
      let values = pluck(nextProps.filters, 'value');

      // Eliminate items in filterState that are not in values
      filterState = intersection(filterState, values);
    } else {

      // If we just turned into a single-select FilterGroup
      if (this.props.multiSelect) filterState = filterState[0];
    }

    this.setState({ filterState });
  },

  render() {

    let filters = this.props.filters.map((filter, index) => {
      let isSelected = this.props.multiSelect ?
        includes(this.state.filterState, filter.value) :
        (this.state.filterState === filter.value);

      let bottomBorder = (index < this.props.filters.length -
        (this.props.isHalfSpace ? 2 : 1))

      let rightBorder = (index % 2 === 0);

      return (
        <Filter {...filter}
          isSelected={isSelected}
          isHalfSpace={this.props.isHalfSpace}
          bottomBorder={bottomBorder}
          rightBorder={rightBorder}
          key={filter.value}
          onChange={this.handleOnChange_} />
      );
    });

    return (
      <div className="search__filter-group">
        <div className="search__filter-group-title">{this.props.groupTitle}</div>
        <div className="search__filter-groups">
          {filters}
        </div>
      </div>
    );
  },

  handleOnChange_(value, willBeSelected) {
    let { filterState } = this.state;

    if (this.props.multiSelect) {
      if (willBeSelected) {
        filterState.push(value);
      } else {
        filterState.splice(filterState.indexOf(value), 1);
      }
    } else {
      if (willBeSelected) {
        filterState = value;
      }
    }

    // Defer onChange event
    defer(() => this.props.onChange(this.props.groupName, filterState));

    this.setState({ filterState });
  },

});


