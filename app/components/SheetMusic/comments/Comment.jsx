import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React from 'react';

let Comment = React.createClass({
  propTypes: {
    /**
     * An object representing the comment object.
     */
    comment: React.PropTypes.shape({
      /**
       * Represents how long ago this comment was from. String contains the value and unit of time.
       */
      delta: React.PropTypes.string.isRequired,

      /**
       * The message of the comment.
       */
      message: React.PropTypes.string.isRequired,

      /**
       * The username of the comment writer.
       */
      name: React.PropTypes.string.isRequired,

      /**
       * Represents an array of comments objects which are replies to the current comment.
       */
      replies: React.PropTypes.array,

      /**
       * Represents how many upvotes this comment has received.
       */
      upvotes: React.PropTypes.number.isRequired,
    }),

    /**
     * A number representing the nested level of the comment.
     */
    level: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      comment: {},
      level: 0,
    };
  },

  renderReplies_() {
    let { replies } = this.props.comment;
    return (
      <div>
        <If condition={replies && replies.length}>
          {replies.map((reply) => (
            <div className="comment__reply">
              <Comment comment={reply} level={this.props.level + 1}/>
            </div>
          ))}
        </If>
      </div>
    );
  },

  render() {
    let { comment } = this.props;

    let commentBoxClasses = classNames('comment__box', {
      'comment__box--even': this.props.level % 2 === 0,
      'comment__box--odd': this.props.level % 2 !== 0,
    });

    return (
      <div className={commentBoxClasses}>

        <div className="comment__arrows">
          <div className="comment__vote-arrow"><FontAwesome name="arrow-up" /></div>
          <div className="comment__upvote-points">{comment.upvotes}</div>
        </div>

        <div className="comment__contents">
          <div>
            <span className="comment__name">{comment.name}</span> -
            <span className="comment__delta">{comment.delta}</span>
          </div>
          <div className="comment__message">{comment.message}</div>
          {this.renderReplies_()}
        </div>

      </div>
    );
  },
});

export default Comment;
