
import classNames from 'classnames';
import includes from 'lodash/collection/includes';
import React from 'react';
import { findDOMNode } from 'react-dom';

export default class Input extends React.Component {
  static propTypes = {
    // The current error code
    errorCode: React.PropTypes.number,

    // The error codes that cause this component to have the error class
    errorWhen: React.PropTypes.array.isRequired,

    // Whether to focus this textbox when the component mounts
    focusOnLoad: React.PropTypes.bool,

    // The name of the element. Useful for autofilling forms
    name: React.PropTypes.string,

    // Whether this is a password field or not
    password: React.PropTypes.bool,

    // Placeholder to display in the input box
    placeholder: React.PropTypes.string.isRequired,

    // Passes down the valueLink prop from the parent component
    field: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.focusOnLoad) {
      findDOMNode(this.refs.input).focus();
    }
  }

  render() {
    const isPassword = this.props.password === true;

    const className = classNames({
      authentication__input: true,
      'authentication__input--error': includes(this.props.errorWhen, this.props.errorCode),
    });

    return (
      <input
        type={isPassword ? 'password' : 'text'}
        ref="input"
        name={this.props.name}
        className={className}
        placeholder={this.props.placeholder}
        {...this.props.field}
      />
    );
  }
}
