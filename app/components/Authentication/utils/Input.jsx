
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
    placeholder: React.PropTypes.string.isRequired,

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
    const props = omit(this.props, ['errorWhen', 'focusOnLoad', 'placeholder']);

    const groupClassName = classNames('authentication__input-group', className, {
      'authentication__input-group--error': errorWhen,
    });

    return (
      <div className={groupClassName}>
        <input
          className="authentication__input"
          ref="input"
          required
          {...props}
        />
        <span className="authentication__input-bar" />
        <label className="authentication__input-label">{placeholder}</label>
      </div>
    );
  }
}
