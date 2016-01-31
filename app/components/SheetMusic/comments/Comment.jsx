import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default function Comment({ comment = {}, level = 0 }) {
  const { replies } = comment;

  const repliesElements = replies.map(reply => (
    <div className="comment__reply">
      <Comment comment={reply} level={level + 1} />
    </div>
  ));

  const commentBoxClasses = classNames('comment__box', {
    'comment__box--even': level % 2 === 0,
    'comment__box--odd': level % 2 !== 0,
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
        <div>
          <If condition={replies && replies.length}>
            {repliesElements}
          </If>
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
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
};
