
import React from 'react';

import ContentTitle from './Utils/ContentTitle';

export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <ContentTitle title="Profile Settings" />
        <form className="settings__content-form">
        </form>
      </div>
    );
  }
}
