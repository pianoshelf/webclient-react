import classNames from 'classnames';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import React from 'react';

export default React.createClass({
  propTypes: {
    /**
     * The id of the sheet music this reply box belongs to.
     */
    id: React.PropTypes.number.isRequired,

    /**
     * The recipient to be receiving the reply from this reply box.
     */
    recipient: React.PropTypes.number,
  },

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {text: ''};
  },

  render() {
    let commentReplyBoxClasses = classNames({
      'comment__send-button': true,
      'comment__disabled': !this.state.text,
    });

    return (
      <div>
        <div className="comment__text-area">
          <textarea className="comment__text-area" rows="2" valueLink={this.linkState('text')}/>
        </div>
        <div className={commentReplyBoxClasses}>
          Reply
        </div>
      </div>
    );
  },
});
