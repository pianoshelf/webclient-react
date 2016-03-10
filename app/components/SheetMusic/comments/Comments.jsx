import React from 'react';

import Comment from './Comment';
import ReplyBox from './ReplyBox';

export default function Comments({ id, comments = [] }) {
  const innerComments = comments.map(comment => <Comment comment={comment} />);

  return (
    <div className="comment__style">
      <If condition={comments.length}>
        {innerComments}
      <Else />
        <div>There are no comments for this sheet music.</div>
      </If>
      <ReplyBox id={id} />
    </div>
  );
}

Comments.propTypes = {
  id: React.PropTypes.number.isRequired,
  comments: React.PropTypes.arrayOf(React.PropTypes.shape({
    delta: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    replies: React.PropTypes.array,
    upvotes: React.PropTypes.number.isRequired,
  })),
};
