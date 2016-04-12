
import classNames from 'classnames';
import ReactDropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import React from 'react';
import ReactDOM from 'react-dom';
import withState from 'recompose/withState';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// Import other components
import TextArea from '../Misc/TextArea';
import NavBar from '../Fixtures/NavBar';
import NotFound from '../Error/NotFound';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';
import {
  getProfile,
  makeDescriptionEditable,
  updateProfileDescription,
  updateProfilePicture,
} from '../../actions/profile';

const NAVBAR_DISAPPEARING_OFFSET = 50;

@asyncConnect({
  promise: (params, { store, request }) => {
    const { username } = params;
    return store.dispatch(getProfile(username, request));
  },
})

@connect(
  state => ({
    isUser: state.login.loggedIn &&
      state.login.user.username === state.profile.profile.user.username,
    profile: state.profile.profile.user,
    errorCode: state.profile.profile.errorCode,
    editableDescription: state.profile.profile.editableDescription,
  }),
  {
    makeDescriptionEditable,
    updateProfileDescription,
    updateProfilePicture,
  }
)

@reduxForm({
  form: 'profileDescription',
  fields: ['description'],
})

@withState('transparentNavBar', 'setNavBarTransparency', true)

export default class Profile extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    transparentNavBar: React.PropTypes.bool.isRequired,
    errorCode: React.PropTypes.number.isRequired,
    isUser: React.PropTypes.bool.isRequired,
    profile: React.PropTypes.object,
    setNavBarTransparency: React.PropTypes.func.isRequired,
    makeDescriptionEditable: React.PropTypes.func.isRequired,
    updateProfileDescription: React.PropTypes.func.isRequired,
    updateProfilePicture: React.PropTypes.func.isRequired,
    editableDescription: React.PropTypes.bool.isRequired,
    fields: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.handleScrollChange();
    window.addEventListener('load', this.handleScrollChange);
    window.addEventListener('scroll', this.handleScrollChange);
    window.addEventListener('resize', this.handleScrollChange);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleScrollChange);
    window.removeEventListener('scroll', this.handleScrollChange);
    window.removeEventListener('resize', this.handleScrollChange);
  }

  handleScrollChange = () => {
    this.props.setNavBarTransparency(() => (
      window.pageYOffset < NAVBAR_DISAPPEARING_OFFSET
    ));
  };

  handleEditDescription = event => {
    const { fields, profile } = this.props;
    const { description } = profile;
    event.preventDefault();
    this.props.makeDescriptionEditable();
    fields.description.onChange(description);
  };

  handleUpdateDescription = () => {
    const { fields } = this.props;
    const { description } = fields;
    this.props.updateProfileDescription(description.value);
  };

  handleProfilePictureDrop = files => {
    console.log(files[0]);
    this.props.updateProfilePicture(files[0]);
  };

  renderUserName() {
    const { profile } = this.props;
    const { fullName = '', username } = profile;
    const displayName = fullName.trim();

    if (displayName) {
      return (
        <div className="profile__main-name-container">
          {displayName}
        </div>
      );
    }

    return (
      <div className="profile__main-name-container">
        {username}
      </div>
    );
  }

  renderAvatar() {
    const { isUser, profile } = this.props;
    const { largeProfilePicture } = profile;
    const userAvatar = `${largeProfilePicture}?d=identicon&s=300`;

    if (isUser) {
      return (
        <ReactDropzone
          className="profile__main-avatar-container"
          activeClassName="profile__main-avatar-container--active"
          multiple={false}
          accept="image/jpeg,image/png,image/gif"
          onDrop={this.handleProfilePictureDrop}
        >
          <a href="#" className="profile__main-avatar-link profile__main-avatar-link--current-user">
            <img src={userAvatar} className="profile__main-avatar" />
            <div className="profile__main-avatar-change-avatar">
              <div className="profile__main-avatar-change-avatar-message">
                <FontAwesome name="picture-o" className="profile__main-avatar-change-avatar-icon" />
                Change Picture
              </div>
            </div>
          </a>
        </ReactDropzone>
      );
    }

    return (
      <div className="profile__main-avatar-container">
        <div className="profile__main-avatar-link">
          <img src={userAvatar} className="profile__main-avatar" />
        </div>
      </div>
    );
  }

  renderDescription() {
    const { isUser, profile, editableDescription, fields } = this.props;
    const { description } = profile;

    if (isUser) {
      const descriptionClassName = classNames('profile__content-user-info', {
        'profile__content-user-info--empty': !description,
      });

      return (
        <div className={descriptionClassName}>
          <FontAwesome name="info-circle" className="profile__content-user-info-icon" />
          <If condition={editableDescription}>
            <div>
              <TextArea
                {...fields.description}
                placeholder="Description"
                className="profile__content-user-info-edit-input"
              />
              <button
                className="profile__content-user-info-edit-submit"
                onClick={this.handleUpdateDescription}
              >
                Save
              </button>
            </div>
          <Else />
            <div>
              <If condition={description}>
                {description}
              <Else />
                no description
              </If>
              <a
                href="#"
                className="profile__content-user-info-edit"
                onClick={this.handleEditDescription}
              >
                <FontAwesome name="pencil" className="profile__content-user-info-edit-icon" />
                Edit
              </a>
            </div>
          </If>
        </div>
      );
    } else if (description) {
      return (
        <div className="profile__content-user-info">
          <FontAwesome name="info-circle" className="profile__content-user-info-icon" />
          {description}
        </div>
      );
    }

    return null;
  }

  renderUserInfo() {
    return (
      <div className="profile__content-panel-user-info">
        {this.renderDescription()}
      </div>
    );
  }

  renderMainPanel() {
    return (
      <ResponsiveContainer className="profile__main-panel">
        <div className="profile__main-panel-shifter">
          {this.renderAvatar()}
          {this.renderUserName()}
        </div>
      </ResponsiveContainer>
    );
  }

  renderContentPanel() {
    return (
      <ResponsiveContainer className="profile__content-panel">
        {this.renderUserInfo()}
        <div className="profile__content-panel-content">
          {this.props.children}
        </div>
      </ResponsiveContainer>
    );
  }

  render() {
    const { errorCode, transparentNavBar } = this.props;
    const title = 'Profile';

    if (errorCode !== 0) {
      return (
        <NotFound>
          The user at this address does not exist.
        </NotFound>
      );
    }

    return (
      <div className="profile">
        <Helmet title={title} />
        <NavBar transparent={transparentNavBar} />
        <div className="profile__container">
          {this.renderMainPanel()}
          {this.renderContentPanel()}
        </div>
        <Footer />
      </div>
    );
  }
}
