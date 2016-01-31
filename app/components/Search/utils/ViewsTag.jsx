
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default function ViewsTag({ viewCount }) {
  if (!viewCount) return '';
  return (
    <div className="search__result-property search__result-property--dark" key="views">
      <FontAwesome name="eye" className="search__result-property-icon" />
      {viewCount}
    </div>
  );
}

ViewsTag.propTypes = {
  viewCount: React.PropTypes.string.isRequired,
};