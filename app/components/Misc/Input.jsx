
import classNames from 'classnames';
import omit from 'lodash/object/omit';
import React from 'react';
import { findDOMNode } from 'react-dom';

export default class Input extends React.Component {
  static propTypes = {
    // The error codes that cause this component to have the error class
    errorWhen: React.PropTypes.bool,

    // Whether to focus this textbox when the component mounts
    focusOnLoad: React.PropTypes.bool,

    // Placeholder to display in the input box
    placeholder: React.PropTypes.node.isRequired,

    // Type of the textbox
    type: React.PropTypes.oneOf(['text', 'password']),

    // Class name of the input
    className: React.PropTypes.string,
  };

  componentDidMount() {
    if (this.props.focusOnLoad) {
      findDOMNode(this.refs.input).focus();
    }
  }

  render() {
    const { errorWhen, placeholder, className } = this.props;
    const props = omit(this.props, ['errorWhen', 'focusOnLoad', 'placeholder', 'className']);

    const groupClassName = classNames('misc-input__group', className);

    const inputClassName = classNames('misc-input__input', {
      'misc-input__input--error': errorWhen,
    });

    const barClassName = classNames('misc-input__bar', {
      'misc-input__bar--error': errorWhen,
    });

    const labelClassName = classNames('misc-input__label', {
      'misc-input__label--error': errorWhen,
    });

    return (
      <div className={groupClassName}>
        <input className={inputClassName} ref="input" required {...props} />
        <span className={barClassName} />
        <label className={labelClassName}>{placeholder}</label>
      </div>
    );
  }
}
