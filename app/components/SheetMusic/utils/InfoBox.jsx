
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
  },

  render() {
    let className = classNames({
      'sheetmusic__details-info-box-content': true,
      [this.props.className]: this.props.className,
    });

    return (
      <div className="sheetmusic__details-info-box">
        <div className="sheetmusic__details-info-box-title">
          <If condition={this.props.icon}>
            <FontAwesome name={this.props.icon} className="sheetmusic__details-info-box-icon" />
          </If>
          {this.props.title}
        </div>
        <div className={className}>
          {this.props.children}
        </div>
      </div>
    );
  },
});

