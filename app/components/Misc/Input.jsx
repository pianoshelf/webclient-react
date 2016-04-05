
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import omit from 'lodash/omit';
import React from 'react';
import { findDOMNode } from 'react-dom';

export default class Input extends React.Component {
  static propTypes = {
    // The condition when we should display an error
    errorWhen: React.PropTypes.bool,

    // Whether to focus this textbox when the component mounts
    focusOnLoad: React.PropTypes.bool,

    // Placeholder to display in the input box
    placeholder: React.PropTypes.node.isRequired,

    // Font Awesome icon beside input placeholder
    icon: React.PropTypes.string,

    // Type of the textbox
    type: React.PropTypes.oneOf(['text', 'password']),

    // Class name of the input
    className: React.PropTypes.string,

    // Whether this field is required
    required: React.PropTypes.bool,
  };

  static defaultProps = {
    focusOnLoad: false,
    type: 'text',
  };

  componentDidMount() {
    if (this.props.focusOnLoad) {
      findDOMNode(this.refs.input).focus();
    }
  }

  render() {
    const { errorWhen, placeholder, className, icon, required } = this.props;
    const props = omit(
      this.props,
      ['errorWhen', 'focusOnLoad', 'placeholder', 'className', 'icon', 'required']
    );

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
        <label className={labelClassName}>
          <If condition={icon}>
            <FontAwesome name={icon} className="misc-input__icon" />
          </If>
          <span>
            {placeholder}
            <If condition={required}>
              <span className="misc-input__label-star">*</span>
            </If>
          </span>
        </label>
      </div>
    );
  }
}
