import React from 'react';

import Comment from './Comment';
import ReplyBox from './ReplyBox';

export default React.createClass({
  propTypes: {
    /**
     * The id of the sheet music.
     */
    id: React.PropTypes.number.isRequired,

    /**
     * Array of Comment objects representing the data
     */
    comments: React.PropTypes.arrayOf(React.PropTypes.shape({
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
    })),
  },

  getDefaultProps() {
    return {
      comments: [],
    };
  },

  render() {
    const { comments } = this.props;
    return (
      <div className="comment__style">
        <If condition={comments.length}>
          {comments.map((comment) => (
              <Comment comment={comment}/>
          ))}
        <Else />
          <div>There are no comments for this sheet music.</div>
        </If>
        <div className="commment__text-box-prompt">Contribute to the discussion:</div>
        <ReplyBox id={this.props.id} />
      </div>
    );
  },
});
