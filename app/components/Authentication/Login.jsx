
import FontAwesome from 'react-fontawesome';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import includes from 'lodash/collection/includes';
import Helmet from 'react-helmet';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Button from './utils/Button';
import canLogin from '../../decorators/canLogin';
import canFacebookLogin from '../../decorators/canFacebookLogin';
import ErrorMessage from './utils/ErrorMessage';
import Input from './utils/Input';
import Title from './utils/Title';
import { login, facebookLogin } from '../../actions/login';
import { errors } from '../../utils/constants';

@canFacebookLogin
@canLogin
@connect(
  state => ({
    login: state.login,
    progress: state.progress,
  })
)
export default class Login extends React.Component {

  /**
   * PropTypes
   */
  static propTypes = {
    login: React.PropTypes.shape({
      errorCode: React.PropTypes.number.isRequired,
      loggedIn: React.PropTypes.bool.isRequired,
    }).isRequired,
    progress: React.PropTypes.shape({
      inProgress: React.PropTypes.bool.isRequired,
    }).isRequired,
    store: React.PropTypes.object.isRequired,
    username: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
  };

  /**
   * Handlers
   */
  handleSubmit = event => {
    // Trigger login action
    event.preventDefault();
    const { username, password } = this.props;
    this.props.store.dispatch(login(username, password, this.props.store));
  };

  handleFacebook = event => {
    // Trigger Facebook login process
    event.preventDefault();
    this.facebookLogin();
  };

  facebookLoginHandler = response => {
    // Trigger action if Facebook login was successful
    if (response.status === 'connected') {
      this.props.store.dispatch(facebookLogin({
        accessToken: response,
      }, this.props.store));
    }
  };

  /**
   * Render method
   */
  render() {
    const {
      progress: inProgress,
      login: { errorCode, loggedIn },
    } = this.props;
    const loginInProgress = includes(inProgress, 'login');
    const facebookInProgress = includes(inProgress, 'facebookLogin');

    return (
      <div>
        <Helmet title="Log in" />
        <Title>Log in to PianoShelf</Title>
        <ErrorMessage errorCode={errorCode}
          dontDisplayIf={loggedIn || loginInProgress || facebookInProgress}
        />
        <form className="authentication__form" onSubmit={this.handleSubmit}>
          <div className="authentication__inputs">
            <Input placeholder="Username"
              name="username"
              errorCode={errorCode}
              errorWhen={[errors.NO_USERNAME]}
              focusOnLoad
              valueLink={this.linkState('username')}
            />
            <Input placeholder="Password"
              name="password"
              password
              errorCode={errorCode}
              errorWhen={[errors.NO_PASSWORD]}
              valueLink={this.linkState('password')}
            />
          </div>
          <Button color="orange" submittedIf={loginInProgress}
            disableIf={loginInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="sign-in" />
            Log in
          </Button>
        </form>
        <Link to="/login/forgot" className="authentication__link">I forgot my password</Link>
        <hr className="authentication__hr" />
        <form onSubmit={this.handleFacebook}>
          <Button color="facebook" submittedIf={facebookInProgress}
            disableIf={loginInProgress || facebookInProgress}
          >
            <FontAwesome className="authentication__button-icon" name="facebook-square" />
            Sign in using Facebook
          </Button>
        </form>
      </div>
    );
  }
}

// export default React.createClass({

  // mixins: [
    // LinkedStateMixin,
    // CanLoginMixin,
    // FacebookLoginMixin,
    // fluxMixin({
      // login: store => store.state,
      // progress: store => store.state,
    // }),
  // ],

  // getInitialState() {
    // return {
      // username: '',
      // password: '',
    // };
  // },

// });
