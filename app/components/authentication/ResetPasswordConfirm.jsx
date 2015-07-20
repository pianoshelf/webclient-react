
import fluxMixin from 'flummox/mixin';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

import ErrorMessage from './utils/ErrorMessage';
import InfoText from './utils/InfoText';
import Title from './utils/Title';
import { errors, success } from '../../utils/constants';
import { AuthMessagesMixin } from '../../utils/authUtils';

let { LinkedStateMixin } = addons;

export default React.createClass({

  mixins: [
    LinkedStateMixin,
    AuthMessagesMixin,
    fluxMixin({
      login: store => store.state,
      progress: store => store.state,
    }),
  ],

  getInitialState() {
    return {
      password1: '',
      password2: '',
    };
  },

  componentDidMount() {
    this.refs.initFocus.getDOMNode().focus();
  },

  render() {
    let inProgress = includes(this.state.inProgress, 'resetPasswordConfirm');

    return (
      <div>
        <Title>Reset your password</Title>
        <ErrorMessage errorCode={this.state.errorCode}
          dontDisplayIf={this.state.errorCode === success.LOGGED_IN || inProgress} />
        <InfoText>
          Enter a new password to reset your password.
        </InfoText>
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <input className="authentication__input"
              type="text"
              ref="initFocus"
              placeholder="Email"
              valueLink={this.linkState('email')} />
          </div>
          <Button color="red" disableIf={inProgress} submittedIf={inProgress}>
            <FontAwesome className="authentication__button-icon" name="paper-plane" />
            Reset password
          </Button>
        </form>
        <Link to="/login" className="authentication__link">I want to log in</Link>
      </div>
    );
  }

});

