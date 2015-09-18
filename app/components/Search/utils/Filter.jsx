
import classNames from 'classnames';
import React from 'react';

export default React.createClass({

  propTypes: {

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

  },

  handleOnClick_(event) {
    event.preventDefault();
    this.props.onChange(this.props.value, !this.props.isSelected);
  },

  render() {
    let className = classNames({
      'search__filter-group-filter': true,
      'search__filter-group-filter--selected': this.props.isSelected,
      'search__filter-group-filter--half-space': this.props.isHalfSpace,
      'search__filter-group-filter--bottom-border': this.props.bottomBorder,
      'search__filter-group-filter--right-border': this.props.rightBorder,
    });

    return (
      <a href="" className={className} onClick={this.handleOnClick_}>
        {this.props.valueNode}
      </a>
    );
  },

});
