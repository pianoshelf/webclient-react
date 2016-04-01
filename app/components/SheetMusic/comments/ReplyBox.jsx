import classNames from 'classnames';
import React from 'react';
import { reduxForm } from 'redux-form';

import TextArea from '../../Misc/TextArea';

export const FIELD_NAMES = ['reply'];

@reduxForm({
  form: 'commentReply',
  fields: FIELD_NAMES,
  initialValues: { reply: '' },
})
export default class ReplyBox extends React.Component {
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    recipient: React.PropTypes.number,
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.submitComment);
  };

  submitComment = (values, dispatch) => { // eslint-disable-line no-unused-vars
    // submit comment
  };

  render() {
    const { fields, values } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextArea
          className="comment__text-area"
          placeholder="Contribute to the discussion"
          name="reply"
          {...fields.reply}
        />
        <input
          type="submit"
          value="Reply"
          className={classNames('comment__send-button', {
            'comment__send-button--disabled': !values.reply,
          })}
        />
      </form>
    );
  }
}
