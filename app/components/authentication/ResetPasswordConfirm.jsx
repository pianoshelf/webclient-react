
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import includes from 'lodash/collection/includes';
import React from 'react';
import { addons } from 'react/addons';

import Button from './utils/Button';
import ErrorMessage from './utils/ErrorMessage';
import Input from './utils/Input';
import InfoText from './utils/InfoText';
import Title from './utils/Title';
import { errors } from '../../utils/constants';

let { LinkedStateMixin } = addons;

export default React.createClass({

  mixins: [
    LinkedStateMixin,
    fluxMixin({
      login: store => store.state,
      progress: store => store.state,
    }),
  ],

  propTypes: {
    params: React.PropTypes.object,
  },

  getInitialState() {
    return {
      password1: '',
      password2: '',
    };
  },

  render() {
    let inProgress = includes(this.state.inProgress, 'resetPasswordConfirm');

    return (
      <div>
        <Title>Reset your password</Title>
        <ErrorMessage errorCode={this.state.errorCode}
          dontDisplayIf={inProgress} />
        <InfoText>
          Enter a new password to reset your password.
        </InfoText>
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <Input placeholder="New Password"
              password={true}
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_PASSWORD, errors.NOT_STRONG_PASSWORD]}
              focusOnLoad={true}
              valueLink={this.linkState('password1')} />
            <Input placeholder="Confirm New Password"
              password={true}
              errorCode={this.state.errorCode}
              errorWhen={[errors.NOT_SAME_PASSWORD]}
              valueLink={this.linkState('password2')} />
          </div>
          <Button color="red" disableIf={inProgress} submittedIf={inProgress}>
            <FontAwesome className="authentication__button-icon" name="paper-plane" />
            Reset password
          </Button>
        </form>
      </div>
    );
  },

  handleSubmit_(event) {
    event.preventDefault();

    let { password1, password2 } = this.state;
    let { token, uid } = this.props.params;
    let user = { password1, password2 };

    // Trigger action
    let loginActions = this.flux.getActions('login');
    loginActions.resetPasswordConfirm(user, uid, token, this.flux);
  },

});

