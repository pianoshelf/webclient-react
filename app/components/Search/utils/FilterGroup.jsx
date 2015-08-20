
import defer from 'lodash/function/defer';
import includes from 'lodash/collection/includes';
import React from 'react';
import { addons } from 'react/addons';

import Filter from './Filter';

let { PureRenderMixin } = addons;

export default React.createClass({

  propTypes: {
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
  },

  mixins: [
    PureRenderMixin,
  ],

  render() {
    return (
      <div className="search__filter-group">
        <div className="search__filter-group-title">{this.props.groupTitle}</div>
        <div className="search__filter-groups">
          {this.props.filters.map((filter, index) => {
            let isSelected = this.props.multiSelect ?
              includes(this.props.value, filter.value) : (this.props.value === filter.value);

            let bottomBorder = (index < this.props.filters.length -
              (this.props.isHalfSpace ? 2 : 1));

            let rightBorder = (this.props.isHalfSpace && index % 2 === 0);

            return (
              <Filter {...filter}
                isSelected={isSelected}
                isHalfSpace={this.props.isHalfSpace}
                bottomBorder={bottomBorder}
                rightBorder={rightBorder}
                key={filter.value}
                onChange={this.handleOnChange_} />
            );
          })}
        </div>
      </div>
    );
  },

  handleOnChange_(value, willBeSelected) {
    let nextValue = this.props.value;

    if (this.props.multiSelect) {
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
    defer(() => this.props.onChange(this.props.groupName, nextValue));
  },

});


