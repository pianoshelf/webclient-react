
import React from 'react';

export default function ContentTitle({ title }) {
  return (
    <div className="settings__content-title">
      {title}
    </div>
  );
}

ContentTitle.propTypes = {
  title: React.PropTypes.string.isRequired,
};
