
import classNames from 'classnames';
import React from 'react';

export default class Button extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
  };

  render() {
    const { children, className } = this.props;
    const buttonClassNames = classNames('misc-button', className);
    return (
      <button
        {...this.props}
        className={buttonClassNames}
      >
        {children}
      </button>
    );
  }
}

