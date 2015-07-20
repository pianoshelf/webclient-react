
import classNames from 'classnames';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { errors } from '../../../utils/constants';

export default React.createClass({

  propTypes: {
    /**
     * Condition in which to display the cog instead of the text.
     */
    submittedIf: React.PropTypes.bool.isRequired,

    /**
     * Condition in which to disable the button.
     */
    disableIf: React.PropTypes.bool.isRequired,

    /**
     * Color of the button
     */
    color: React.PropTypes.oneOf([
      'orange',
      'blue-light',
      'red',
      'facebook',
    ]).isRequired,
  },

  render() {

    let className = classNames('authentication__button', `authentication__button--${this.props.color}`);

    return (
      <button className={className}
        type="submit"
        disabled={this.props.disableIf}>
        <If condition={this.props.submittedIf}>
          <FontAwesome name="cog" spin={true} />
        <Else />
          {this.props.children}
        </If>
      </button>
    );
  },

});


