
import classNames from 'classnames';
import includes from 'lodash/collection/includes';
import React from 'react';

export default React.createClass({


  propTypes: {
    /**
     * Placeholder to display in the input box
     */
    placeholder: React.PropTypes.string.isRequired,

    /**
     * Whether to focus this textbox on load
     */
    focusOnLoad: React.PropTypes.bool,

    /**
     * The current error code
     */
    errorCode: React.PropTypes.number,

    /**
     * The error codes that cause this component to have the error class
     */
    errorWhen: React.PropTypes.array.isRequired,

    /**
     * Passes down the valueLink prop from the parent component
     */
    valueLink: React.PropTypes.any.isRequired,

    /**
     * Whether this is a password field or not
     */
    password: React.PropTypes.bool,
  },

  componentDidMount() {
    if (this.props.focusOnLoad) {
      React.findDOMNode(this.refs.input).focus();
    }
  },

  render() {

    let isPassword = this.props.password === true;

    let className = classNames({
      'authentication__input': true,
      'authentication__input--error': includes(this.props.errorWhen, this.props.errorCode),
    });

    return (
      <input type={isPassword ? 'password' : 'text'} ref="input"
        className={className}
        placeholder={this.props.placeholder}
        valueLink={this.props.valueLink} />
    );
  }

});


