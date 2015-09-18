
import fluxMixin from 'flummox/mixin';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import includes from 'lodash/collection/includes';
import React from 'react';
import { addons } from 'react/addons';
import { Link } from 'react-router';

import Button from './utils/Button';
import ErrorMessage from './utils/ErrorMessage';
import InfoText from './utils/InfoText';
import Input from './utils/Input';
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

  getInitialState() {
    return {
      email: '',
    };
  },

  handleSubmit_(event) {
    event.preventDefault();

    let { email } = this.state;

    // Trigger action
    let loginActions = this.flux.getActions('login');
    loginActions.resetPassword(email, this.flux);
  },

  render() {
    let inProgress = includes(this.state.inProgress, 'resetPassword');

    return (
      <Helmet title="Reset Password">
        <Title>Reset your password</Title>
        <ErrorMessage errorCode={this.state.errorCode}
          dontDisplayIf={this.state.loggedIn || inProgress} />
        <InfoText>
          Enter the email address you used to sign up for PianoShelf, and we will email you
          a link to reset your password.
        </InfoText>
        <form className="authentication__form" onSubmit={this.handleSubmit_}>
          <div className="authentication__inputs">
            <Input placeholder="Email"
              name="email"
              errorCode={this.state.errorCode}
              errorWhen={[errors.NO_EMAIL, errors.INVALID_EMAIL]}
              focusOnLoad
              valueLink={this.linkState('email')} />
          </div>
          <Button color="red" disableIf={inProgress} submittedIf={inProgress}>
            <FontAwesome className="authentication__button-icon" name="paper-plane" />
            Reset password
          </Button>
        </form>
        <Link to="/login" className="authentication__link">I want to log in</Link>
      </Helmet>
    );
  },

});

