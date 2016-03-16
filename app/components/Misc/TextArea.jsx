
import autosize from 'autosize';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import omit from 'lodash/omit';
import React from 'react';
import { findDOMNode } from 'react-dom';

export default class TextArea extends React.Component {
  static propTypes = {
    // The error codes that cause this component to have the error class
    errorWhen: React.PropTypes.bool,

    // Whether to focus this textbox when the component mounts
    focusOnLoad: React.PropTypes.bool,

    // Placeholder to display in the input box
    placeholder: React.PropTypes.node.isRequired,

    // Font Awesome icon beside input placeholder
    icon: React.PropTypes.string,

    // Class name of the input
    className: React.PropTypes.string,
  };

  static defaultProps = {
    focusOnLoad: false,
    rows: 1,
  };

  componentDidMount() {
    autosize(findDOMNode(this.refs.input));
    if (this.props.focusOnLoad) {
      findDOMNode(this.refs.input).focus();
    }
  }

  render() {
    const { errorWhen, placeholder, className, icon } = this.props;
    const props = omit(
      this.props,
      ['errorWhen', 'focusOnLoad', 'placeholder', 'className', 'icon']
    );

    const groupClassName = classNames('misc-textarea__group', className);

    const inputClassName = classNames('misc-textarea__input', {
      'misc-textarea__input--error': errorWhen,
    });

    const barClassName = classNames('misc-textarea__bar', {
      'misc-textarea__bar--error': errorWhen,
    });

    const labelClassName = classNames('misc-textarea__label', {
      'misc-textarea__label--error': errorWhen,
    });

    return (
      <div className={groupClassName}>
        <textarea className={inputClassName} ref="input" required {...props} />
        <span className={barClassName} />
        <label className={labelClassName}>
          <If condition={icon}>
            <FontAwesome name={icon} className="misc-textarea__icon" />
          </If>
          <span>
            {placeholder}
          </span>
        </label>
      </div>
    );
  }
}
